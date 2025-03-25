import React, { useState, useEffect } from 'react';
// Removed: import { Moon, Sun, Twitter } from 'lucide-react';  <-- No longer needed here

function TweetForm({ darkMode }) { // Receive darkMode as a prop
    const [tweetText, setTweetText] = useState('');
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // No need for local darkMode state or useEffects here

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction('');

        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: tweetText }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch prediction.');
            }

            const data = await response.json();
            setPrediction(data.prediction);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

            <main className="container mx-auto flex flex-col items-center justify-center py-12">
                <div className={`rounded-lg shadow-lg p-8 mb-8 w-full max-w-3xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-3 font-medium text-lg">Tweet Content</label>
                        <textarea
                            value={tweetText}
                            onChange={(e) => setTweetText(e.target.value)}
                            placeholder="Enter your tweet here..."
                            className={`w-full p-5 border rounded-lg mb-6 text-lg transition-colors ${darkMode
                                ? 'bg-gray-700 border-gray-600 placeholder-gray-400 focus:border-blue-500'
                                : 'bg-gray-50 border-gray-300 focus:border-blue-500'
                                }`}
                            rows="5"
                            required
                        />
                        <button
                            type="submit"
                            className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors ${loading
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                            disabled={loading}
                        >
                            {loading ? 'Analyzing...' : 'Analyze Tweet'}
                        </button>
                    </form>
                </div>

                {error && (
                    <div className={`rounded-lg p-5 mb-6 w-full max-w-3xl ${darkMode ? 'bg-red-900' : 'bg-red-100'}`}>
                        <p className={`font-medium text-lg ${darkMode ? 'text-red-300' : 'text-red-700'}`}>{error}</p>
                    </div>
                )}

                {prediction && (
                    <div className={`rounded-lg shadow-md p-8 w-full max-w-3xl transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
                        <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-3 ${prediction === 'Relevant'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                                }`}></div>
                            <p className="font-medium text-lg">
                                This tweet is classified as:
                                <span className={`ml-2 font-bold ${prediction === 'Relevant'
                                    ? darkMode ? 'text-green-400' : 'text-green-600'
                                    : darkMode ? 'text-red-400' : 'text-red-600'
                                    }`}>
                                    {prediction}
                                </span>
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default TweetForm;