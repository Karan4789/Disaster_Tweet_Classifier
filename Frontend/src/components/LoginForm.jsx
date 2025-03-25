import React, { useState } from 'react';
import { Twitter, Eye, EyeOff, AlertCircle,Moon,Sun } from 'lucide-react';

function LoginForm({ onLogin, onRegisterClick, darkMode, toggleDarkMode }) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            setErrors({});
            try {
                const response = await fetch('http://127.0.0.1:5000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                    withCredentials: true,
                });
                if (response.ok) {
                    onLogin();
                } else {
                    const errorData = await response.json();
                    setErrors({ general: errorData.message || 'Invalid credentials' });
                }
            } catch (err) {
                setErrors({ general: 'An error occurred during login.' });
            } finally {
                setLoading(false);
            }
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Header */}
            <header className={`w-full py-4 px-6 shadow-md transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <Twitter size={40} className={`mr-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                        <h1 className="text-4xl font-bold">Disaster Tweet Classifier</h1>
                    </div>
                    <button
                        onClick={toggleDarkMode}
                        className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? <Sun size={28} /> : <Moon size={28} />}
                    </button>
                </div>
            </header>

            {/* Login Form */}
            <main className="container mx-auto flex flex-col items-center justify-center py-16">
                <div className={`rounded-lg shadow-lg p-8 w-full max-w-md transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">Sign In</h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Login to access the tweet analyzer</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}
                                className={`w-full p-4 text-lg rounded-lg border transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-gray-50 border-gray-300 focus:border-blue-500'} ${darkMode ? 'text-white' : ''}`}
                                placeholder="yourname@example.com" />
                            {errors.email && <div className="flex items-center mt-2 text-red-500"><AlertCircle size={16} className="mr-1" /><p className="text-sm">{errors.email}</p></div>}
                        </div>
                        <div className="mb-8">
                            <label htmlFor="password" className="block text-lg font-medium mb-2">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleChange}
                                    className={`w-full p-4 text-lg rounded-lg border pr-12 transition-colors ${errors.password ? 'border-red-500 focus:border-red-500' : darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-gray-50 border-gray-300 focus:border-blue-500'} ${darkMode ? 'text-white' : ''}`}
                                    placeholder="••••••••" />
                                <button type="button" onClick={togglePasswordVisibility}
                                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <div className="flex items-center mt-2 text-red-500"><AlertCircle size={16} className="mr-1" /><p className="text-sm">{errors.password}</p></div>}
                            <div className="flex justify-end mt-2"><a href="#" className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Forgot password?</a></div>
                        </div>
                        {errors.general && <div className="flex items-center mt-2 text-red-500"><AlertCircle size={16} className="mr-1" /><p className="text-sm">{errors.general}</p></div>}
                        <button type="submit" disabled={loading} className={`w-full py-4 px-6 rounded-lg font-medium text-lg transition-colors ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                            Don't have an account?{' '}
                            <button type="button" onClick={onRegisterClick} className={`font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Sign up</button>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginForm;