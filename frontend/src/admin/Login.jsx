import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // Apne component ke top par baaki states ke sath isey add karein
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, "");
            const res = await axios.post(`${API_BASE}/auth/login`, { password });
            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin');
        } catch (err) {
            setError('Invalid Passkey. Verification Failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] p-6">
            <div className="relative w-full max-w-md">
                {/* Decorative background flair */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#5D3FF3]/10 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#5D3FF3]/5 rounded-full blur-[100px]"></div>

                <div className="relative bg-white/70 backdrop-blur-3xl border border-white p-12 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] text-center">
                    <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 
bg-[#5D3FF3] rounded-2xl flex items-center justify-center 
text-white font-black text-xs sm:text-sm md:text-base 
mb-6 sm:mb-8 md:mb-10 shadow-xl shadow-[#5D3FF3]/30 px-2 text-center">
                        Karan Negi
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-[#111827] mb-2">Welcome Back</h2>
                    <p className="text-sm text-gray-400 font-medium mb-10">Sign in to manage your professional brand.</p>

                    <form onSubmit={handleLogin} className="space-y-6 text-left">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-black tracking-[0.2em] text-[#5D3FF3] ml-1">
                                Admin Passkey
                            </label>
                            {/* Relative container zaroori hai absolute button ke liye */}
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    // Maine pr-12 add kiya hai taaki text icon ke piche na chhupe
                                    className="w-full bg-[#F8F9FC] border border-gray-100 pl-6 pr-12 py-5 rounded-2xl outline-none focus:border-[#5D3FF3] focus:ring-4 focus:ring-[#5D3FF3]/5 transition-all text-center tracking-widest placeholder:tracking-normal font-bold"
                                    placeholder="••••••••"
                                    required
                                />

                                {/* Eye Icon Button */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5D3FF3] transition-colors p-2"
                                >
                                    {showPassword ? (
                                        // Eye Open Icon
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        // Eye Close Icon (Crossed)
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-500 text-[11px] font-bold uppercase tracking-wider animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-5 bg-[#111827] text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] shadow-xl hover:bg-black transition-all active:scale-95 group"
                        >
                            Authorize Entry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
