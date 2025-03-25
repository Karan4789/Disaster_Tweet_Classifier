from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import pymongo
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173', 'http://localhost:3000'])

# --- MongoDB Configuration ---
MONGO_URI = os.environ.get("MONGO_URI")
if not MONGO_URI:
    MONGO_URI = "mongodb://localhost:27017/"

DATABASE_NAME = "disaster_tweets"
COLLECTION_NAME = "predictions"
USERS_COLLECTION_NAME = "users"

try:
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]
    users_collection = db[USERS_COLLECTION_NAME]  # Keep, even if unused
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except pymongo.errors.ConnectionFailure as e:
    print(f"Could not connect to MongoDB: {e}")
    exit(1)
except Exception as e:
    print(f"An unexpected error occurred: {e}")
    exit(1)

# --- Model Loading ---
model_path = "models/bert_disaster_model.pth"
try:
    model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)


def predict_relevance(text):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
        predicted_class_id = torch.argmax(outputs.logits, dim=1).item()
    return "Relevant" if predicted_class_id == 1 else "Not Relevant"

# --- Predict Route (NO Authentication) ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data['text']
        prediction = predict_relevance(text)

        document = {
            "tweet": text,
            "prediction": prediction,
            "timestamp": datetime.now(),
            "user_id": "anonymous"
        }
        try:
            insert_result = collection.insert_one(document)
            print(f"Inserted document with ID: {insert_result.inserted_id}")
        except Exception as e:
            print(f"Error inserting prediction: {e}")

        return jsonify({'prediction': prediction})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# --- Routes to Fetch Tweets ---
@app.route('/relevant_tweets', methods=['GET'])
def get_relevant_tweets():
    relevant_tweets = list(collection.find({"prediction": "Relevant"}))
    # Convert ObjectId to string for JSON serialization
    for tweet in relevant_tweets:
        tweet['_id'] = str(tweet['_id'])
    return jsonify(relevant_tweets)

@app.route('/non_relevant_tweets', methods=['GET'])
def get_non_relevant_tweets():
    non_relevant_tweets = list(collection.find({"prediction": "Not Relevant"}))
    # Convert ObjectId to string
    for tweet in non_relevant_tweets:
        tweet['_id'] = str(tweet['_id'])
    return jsonify(non_relevant_tweets)


if __name__ == '__main__':
    app.run(debug=True, port=5000)