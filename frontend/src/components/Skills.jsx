import React from 'react';

const Skills = ({ skills }) => {
    const categories = [...new Set(skills.map(skill => skill.category))];

    return (
        <section id="skills" className="relative py-24 px-6 md:px-20 lg:px-40 bg-white/90 overflow-hidden text-[#111827]">
            <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(#5D3FF3_1px,transparent_1px),linear-gradient(90deg,#5D3FF3_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="reveal text-center mb-20">
                    <h2 className="text-xs uppercase tracking-[0.5em] text-[#5D3FF3] font-black mb-4">Core Competencies</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#111827]">Technical <span className="text-[#5D3FF3]">Expertise.</span></h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 reveal">
                    {categories.length > 0 ? categories.map(cat => (
                        <div key={cat} className="hover-card group relative p-8 rounded-[2rem] bg-[#F8F9FC] border border-gray-100 transition-all duration-500 shadow-sm">
                            <div className="w-12 h-12 bg-[#5D3FF3]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#5D3FF3]/20 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6 text-[#5D3FF3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            <h3 className="font-bold text-xl mb-6 tracking-tight text-[#111827]">{cat}</h3>
                            <ul className="space-y-4">
                                {skills.filter(s => s.category === cat).map(s => (
                                    <li key={s._id} className="flex items-center gap-3 text-sm font-medium text-[#111827]/60 group-hover:text-[#111827]/90 transition-colors">
                                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#5D3FF3] shadow-[0_0_8px_rgba(93,63,243,0.4)]"></span>
                                        {s.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )) : (
                        <div className="text-center col-span-3 text-gray-400 font-medium">No skills added yet.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Skills;
