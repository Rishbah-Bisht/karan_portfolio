import React from 'react';

const Footer = () => {
    return (
        <footer className="relative pt-32 pb-12 overflow-hidden border-t border-white/10 bg-white/90/70/5 backdrop-blur-md">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-20 items-center">
                    <div className="space-y-6 text-left reveal">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#5D3FF3] rounded-xl flex items-center justify-center text-white font-black text-sm shadow-[0_0_30px_rgba(93,63,243,0.3)]">KN</div>
                            <div className="font-bold text-2xl tracking-tighter uppercase">Karan <span className="text-[#5D3FF3]">Negi</span></div>
                        </div>
                        <p className="text-sm opacity-60 leading-relaxed max-w-xs">Blending Business Knowledge with Digital Skills.<br /><span className="text-[#5D3FF3] font-bold italic">Analyze. Automate. Scale.</span></p>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="relative w-48 h-32 flex items-end gap-2 group">
                            {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
                                <div key={i} className={`w-3 bg-[#5D3FF3] h-${8 + i * 4} rounded-t-sm animate-pulse`} style={{ animationDelay: `${delay}s`, opacity: 0.2 + i * 0.2 }}></div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-6 reveal">
                        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest">
                            <a href="#" className="hover:text-[#5D3FF3] transition-all hover:tracking-[0.3em]">LinkedIn</a>
                        </div>
                        <div className="text-[10px] font-mono opacity-40">Dehradun, IN // {new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[9px] uppercase tracking-[0.5em] opacity-40">© {new Date().getFullYear()} Karan Negi • Built with a Growth Mindset</p>
                    <div className="flex items-center gap-6">
                        <div className="text-[9px] font-bold uppercase tracking-widest opacity-40">Graduation: <span className="text-[#5D3FF3] font-black">BBA '26</span></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
