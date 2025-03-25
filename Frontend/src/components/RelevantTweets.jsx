import React, { useState, useEffect } from 'react';

function RelevantTweets({ darkMode }) {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/relevant_tweets');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTweets(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTweets();
    }, []);

    if (loading) {
        return <div>Loading relevant tweets...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="container mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Relevant Tweets</h1>
                
                {tweets.length === 0 ? (
                    <p>No relevant tweets found.</p>
                ) : (
                    <ul>
                        {tweets.map((tweet) => (
                            <li key={tweet._id} className={`mb-4 p-4 rounded-lg shadow transition-colors 
                                    ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                                <p className="text-lg">{tweet.tweet}</p>
                                <p className="text-sm text-gray-400">
                                    Predicted at: {new Date().toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );}

export default RelevantTweets;