import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });
        try {
            let API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
            if (!API_BASE.endsWith('/api') && !API_BASE.endsWith('/api/')) {
                API_BASE = API_BASE.replace(/\/$/, "") + '/api';
            }
            API_BASE = API_BASE.replace(/\/$/, "");
            await axios.post(`${API_BASE}/contact`, formData);
            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (err) {
            setStatus({
                loading: false,
                success: false,
                error: err.response?.data?.message || 'Something went wrong. Please try again later.'
            });
        }
    };

    return (
        <section
            id="contact"
            className="py-24 px-6 md:px-20 lg:px-40 bg-white/90 overflow-hidden scroll-mt-24 flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"
        >
            {/* LEFT SIDE TEXT */}
            <div className="w-full lg:w-1/3 space-y-6 sm:space-y-8 reveal">
                <div>
                    <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#5D3FF3] font-black mb-3 sm:mb-4">
                        Contact
                    </h2>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827]">
                        Let's <span className="text-[#5D3FF3]">Talk.</span>
                    </h3>
                </div>
                <p className="text-base sm:text-lg text-[#111827]/70 font-medium leading-relaxed">
                    I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                <div className="space-y-4 pt-2 sm:pt-4">
                    <div className="flex items-center gap-3 py-5 sm:gap-4 text-[#111827]">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5D3FF3]/10 rounded-xl flex items-center justify-center text-[#5D3FF3]">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <span className="font-bold text-sm sm:text-base break-all">
                            hkaran682@gmail.com
                        </span>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="w-full lg:w-2/3 reveal">
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 lg:p-12 bg-[#F8F9FC] rounded-2xl border border-gray-200 shadow-sm space-y-6">
                    {/* NAME + EMAIL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <div className="space-y-2">
                            <label className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-gray-400 pl-1 sm:pl-2">
                                Your Name
                            </label>
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Full Name"
                                className="w-full bg-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#5D3FF3] focus:ring-2 focus:ring-[#5D3FF3]/10 transition-all text-sm sm:text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-gray-400 pl-1 sm:pl-2">
                                Email Address
                            </label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="example@email.com"
                                className="w-full bg-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#5D3FF3] focus:ring-2 focus:ring-[#5D3FF3]/10 transition-all text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="space-y-2">
                        <label className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-gray-400 pl-1 sm:pl-2">
                            Message
                        </label>
                        <textarea
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows="5"
                            placeholder="How can I help you?"
                            className="w-full bg-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#5D3FF3] focus:ring-2 focus:ring-[#5D3FF3]/10 transition-all resize-none text-sm sm:text-base"
                        ></textarea>
                    </div>

                    {/* BUTTON */}
                    <button
                        disabled={status.loading}
                        className="w-full py-3.5 sm:py-4 bg-[#111827] text-white rounded-xl font-black uppercase text-[10px] sm:text-xs tracking-[0.18em] shadow-md hover:shadow-lg hover:bg-black transition-all disabled:opacity-50"
                    >
                        {status.loading ? "Sending..." : "Send Message"}
                    </button>

                    {/* SUCCESS */}
                    {status.success && (
                        <p className="text-center text-green-600 font-bold text-xs sm:text-sm bg-green-50 py-3 rounded-lg border border-green-100">
                            Message sent successfully! I'll get back to you soon.
                        </p>
                    )}

                    {/* ERROR */}
                    {status.error && (
                        <p className="text-center text-red-600 font-bold text-xs sm:text-sm bg-red-50 py-3 rounded-lg border border-red-100">
                            {status.error}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;