import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    useEffect(() => {
        gsap.fromTo(".hero-reveal",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );
    }, []);

    return (
        <section id="hero" className="relative min-h-[100svh] flex flex-col bg-white/90 justify-center items-center px-6 md:px-20 overflow-hidden pt-32 pb-20">
            <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
                <div className="hero-reveal inline-block px-4 py-1.5 rounded-full border border-[#5D3FF3]/20 bg-[#5D3FF3]/5 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#5D3FF3] font-black">Open for Opportunities</span>
                </div>

                <h1 className="hero-reveal text-5xl sm:text-7xl md:text-9xl font-bold tracking-tight text-[#111827] mb-8 leading-[0.9]">
                    Building digital <br />
                    <span className="text-[#5D3FF3]">products.</span>
                </h1>

                <p className="hero-reveal text-lg md:text-xl text-[#111827]/70 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                    Hi, I'm <span className="text-[#111827] font-bold">Karan</span>, an aspiring Business Administrator & Sales Specialist.
                </p>

                <div className="hero-reveal flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto p-2 bg-white/90 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
                    <div className="flex-1 w-full px-4 py-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-transparent border-none outline-none text-[#111827] placeholder:text-gray-400 font-medium"
                        />
                    </div>
                    <button className="w-full sm:w-auto px-8 py-4 bg-[#5D3FF3] text-white rounded-xl font-bold text-sm tracking-wide hover:bg-[#4A2ED1] transition-all duration-300 shadow-lg shadow-[#5D3FF3]/20 whitespace-nowrap">
                        Connect With Me
                    </button>
                </div>

                <div className="hero-reveal mt-10 md:mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-8 opacity-40 grayscale pointer-events-none text-center">
    
    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
        Sales
    </span>

    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
        CRM
    </span>

    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
        Management
    </span>

    <span className="text-xs sm:text-sm font-bold tracking-widest uppercase">
        Marketing
    </span>

</div>
            </div>
        </section>
    );
};

export default Hero;
