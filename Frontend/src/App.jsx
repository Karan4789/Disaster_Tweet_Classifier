// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Router components
import TweetForm from './components/TweetForm';
import RelevantTweets from './components/RelevantTweets';
import NonRelevantTweets from './components/NonRelevantTweets';
import { Moon, Sun, Twitter, CheckCircle, XCircle } from 'lucide-react';


function App() {
    const [darkMode, setDarkMode] = useState(false);

    // Check for user's preferred color scheme on initial load
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        }
    }, []);

    // Apply dark mode class to body
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    };

    return (
        <Router>
            <div className="App">
                <header className={`w-full py-4 px-6 shadow-md transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center">
                            <Twitter size={40} className={`mr-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Disaster Tweet Classifier</h1>
                        </div>
                        <div className='flex items-center'>
                            <nav className='mr-4'>
                                <ul className="flex space-x-4">
                                    <li>
                                        <Link to="/" className={`hover:text-blue-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/relevant" className={`hover:text-blue-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                            <CheckCircle className="inline-block mr-1" />
                                            Relevant
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/non-relevant" className={`hover:text-blue-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                          <XCircle className="inline-block mr-1"/>
                                            Non-Relevant
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <button
                                onClick={toggleDarkMode}
                                className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? <Sun size={28} /> : <Moon size={28} />}
                            </button>
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<TweetForm darkMode={darkMode} />} />
                    <Route path="/relevant" element={<RelevantTweets darkMode={darkMode} />} />
                    <Route path="/non-relevant" element={<NonRelevantTweets darkMode={darkMode} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;