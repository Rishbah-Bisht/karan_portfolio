import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            let API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
            if (!API_BASE.endsWith('/api') && !API_BASE.endsWith('/api/')) {
                API_BASE = API_BASE.replace(/\/$/, "") + '/api';
            }
            API_BASE = API_BASE.replace(/\/$/, "");

            const endpoint = isSignup ? '/auth/register' : '/auth/login';
            const res = await axios.post(`${API_BASE}${endpoint}`, { username, password });

            if (isSignup) {
                setSuccess('Registration successful! Please sign in.');
                setIsSignup(false);
            } else {
                localStorage.setItem('adminToken', res.data.token);
                navigate('/admin');
            }
        } catch (err) {
            setError(err.response?.data?.message || (isSignup ? 'Registration failed.' : 'Invalid Credentials. Verification Failed.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] p-6">
            <div className="w-full max-w-md">
                <div className="bg-white border border-gray-100 p-10 rounded-3xl shadow-sm text-center">
                    <div className="mx-auto w-14 h-14 bg-[#5D3FF3] rounded-xl flex items-center justify-center text-white font-black text-sm mb-8">
                        KN
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-[#111827] mb-2">
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-sm text-gray-400 font-medium mb-10">
                        {isSignup ? 'Register to manage your brand.' : 'Sign in to manage your professional brand.'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-[#5D3FF3] ml-1">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#F8F9FC] border border-gray-100 px-6 py-5 rounded-2xl outline-none focus:border-[#5D3FF3] focus:ring-4 focus:ring-[#5D3FF3]/5 transition-all font-bold"
                                placeholder="Admin"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-[#5D3FF3] ml-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#F8F9FC] border border-gray-100 pl-6 pr-12 py-5 rounded-2xl outline-none focus:border-[#5D3FF3] focus:ring-4 focus:ring-[#5D3FF3]/5 transition-all tracking-widest placeholder:tracking-normal font-bold"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5D3FF3] transition-colors p-2"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-500 text-[11px] font-bold uppercase tracking-wider text-center">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl text-green-500 text-[11px] font-bold uppercase tracking-wider text-center">
                                {success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-[#111827] text-white rounded-xl font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-black transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : (isSignup ? 'Create Account' : 'Authorize Entry')}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-50">
                        <button
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError('');
                                setSuccess('');
                            }}
                            className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#5D3FF3]"
                        >
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
