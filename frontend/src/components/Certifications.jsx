import React from 'react';

const Certifications = ({ certifications }) => {
    return (
        <section id="certifications" className="py-24 px-6 md:px-20 lg:px-40 bg-[#F8F9FC] overflow-hidden scroll-mt-24">
            <div className="max-w-5xl mx-auto">
                <div className="reveal flex flex-col items-center text-center mb-16">
                    <h2 className="text-xs uppercase tracking-[0.4em] text-[#5D3FF3] font-black mb-4">Achievements</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#111827]">
                        Certifications & <span className="text-[#5D3FF3]">Training.</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
                    {certifications && certifications.length > 0 ? certifications.map((cert, index) => (
                        <div key={index} className="hover-card p-8 bg-white/90 rounded-[2rem] border border-gray-100 shadow-sm transition-all">
                            <div className="w-10 h-10 bg-[#5D3FF3]/10 rounded-xl flex items-center justify-center text-[#5D3FF3] mb-6">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h4 className="font-bold text-lg text-[#111827] mb-2">{cert.name}</h4>
                            <p className="text-sm text-[#5D3FF3] font-bold uppercase tracking-wider mb-1">{cert.issuer}</p>
                            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{cert.date}</p>
                        </div>
                    )) : (
                        <div className="text-center col-span-3 text-gray-400 font-medium">No certifications found.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
