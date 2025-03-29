# Disaster Tweet Classifier - README

This project classifies tweets as either "Relevant" or "Not Relevant" to a flood disaster.  It uses a machine learning model (BERT) to analyze the text of the tweet.

## How to Run the Project

Here's how to get the project up and running on your computer:
Train Flood.ipynb to get the pth file and it might take you half a day so be prepared

**1. What You'll Need (Prerequisites):**

*   **Python:** (Version 3.6 or higher) - Download from [https://www.python.org/](https://www.python.org/)
*   **Node.js and npm:**  - Download from [https://nodejs.org/](https://nodejs.org/)
*   **MongoDB:** You can either:
    *   Install it on your computer: [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/)
    *   Use a free online MongoDB Atlas account: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) (This is easier)
*   **A Text Editor or IDE:** Like VS Code, Sublime Text, or PyCharm.

**2. Setting Up the Backend (Python/Flask):**

*   **Go to the `backend` folder:** Open a terminal or command prompt and navigate to the `backend` folder within the project.
    ```bash
    cd /path/to/your/project/backend
    ```
*   **Create a `.env` file:**
    *   Create a new file named `.env` inside the `backend` folder.
    *   Open the `.env` file in a text editor.
    *   Add these lines, replacing the placeholders with your *actual* information:

        ```
        MONGO_URI="your_mongodb_connection_string"
        SECRET_KEY="your_very_long_random_secret_key"
        ```
    *    Get your `MONGO_URI` from your MongoDB Atlas account (if you're using Atlas) or use `mongodb://localhost:27017/` if MongoDB is running locally on your computer.
    *   `SECRET_KEY`:  Make this a *very* long, random string.  You can generate one online (search for "random string generator") or use this Python command:
        ```bash
         python -c 'import secrets; print(secrets.token_hex(32))'
        ```
* **Create a virtual environment:**
   ```bash
   python3 -m venv venv


Activate the virtual environment:

Windows:
bash venv\Scripts\activate

macOS/Linux:
bash source venv/bin/activate

Install the required Python packages:
```bash
pip install -r requirements.txt

IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END

Put the Model File in the Right Place: Make sure your trained model file (bert_disaster_model.pth) is inside the backend/models folder.

3. Setting Up the Frontend (React/JavaScript):

Go to the frontend folder: In your terminal, navigate to the frontend folder.

cd ../frontend  # Or, if you're still in the 'backend' folder
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

Install the required JavaScript packages:

npm install
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

If postcss.config.js file is missing:

npx tailwindcss init -p
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

4. Running the Application:

Start the Backend:

Open a new terminal window (or tab).

Go to the backend folder.

Activate your virtual environment (see Step 2 above).

Run the Flask server:

python app.py
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

You should see output indicating that the server is running on http://127.0.0.1:5000.

Start the Frontend:

Open another terminal window (or tab).

Go to the frontend folder.

Run the React development server:

npm start
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
Bash
IGNORE_WHEN_COPYING_END

This will usually open your web browser automatically to http://localhost:5173.

5. Using the Application:

View History: Click the "Relevant" or "Non-Relevant" links in the navigation bar to see lists of previously analyzed tweets.

Important Notes:

Keep the .env file secret! Never share it or upload it to a public repository (like GitHub). It contains your database connection details.

Model Path: Make sure that the model file bert_disaster_model.pth is in backend/models folder.

This simplified README provides clear, concise instructions for setting up and running the application, focusing on the essential steps. It avoids technical jargon where possible and provides direct commands to execute. It also includes crucial reminders about security (the .env file) and prerequisites.
