import React from 'react';

const Projects = () => {
    return (
        <section id="projects" className="py-24 px-6 md:px-20 lg:px-40 bg-[#F8F9FC] overflow-hidden scroll-mt-24">
            <div className="max-w-5xl mx-auto">
                <div className="reveal flex flex-col items-center text-center mb-16">
                    <h2 className="text-xs uppercase tracking-[0.4em] text-[#5D3FF3] font-black mb-4">Featured Work</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#111827]">
                        Technical <span className="text-[#5D3FF3]">Showcase.</span>
                    </h3>
                </div>

                <div className="reveal group relative bg-white/90 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-500">
                    <div className="grid lg:grid-cols-5 gap-12 items-center">
                        <div className="lg:col-span-3 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#5D3FF3]/10 text-[#5D3FF3] text-[10px] font-bold uppercase tracking-widest rounded-lg">ERP System</span>
                                <span className="text-gray-300">|</span>
                                <span className="text-xs font-medium text-gray-500">ClassNexus</span>
                            </div>

                            <h4 className="text-3xl md:text-4xl font-bold text-[#111827]">ClassNexus: Multi-Role ERP</h4>

                            <p className="text-lg text-[#111827]/70 leading-relaxed font-medium">
                                A comprehensive multi-role ERP system for schools featuring robust role-based access control and streamlined data management,
                                built to handle complex educational workflows efficiently.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    'Engineered secure Role-Based Access Control (RBAC) ensuring data privacy across admin, teacher, and student portals.',
                                    'Architected a relational MongoDB schema to manage high-volume academic data with zero redundancy.',
                                    'Implemented a dynamic dashboard with EJS for real-time reporting and administrative oversight.'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#5D3FF3] flex-shrink-0"></div>
                                        <span className="text-sm font-medium text-[#111827]/80">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-3 pt-4">
                                {['Node.js', 'Express', 'MongoDB', 'EJS'].map(tech => (
                                    <span key={tech} className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2 relative">
                            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#5D3FF3]/10 to-transparent p-1">
                                <div className="h-full w-full bg-white/90 rounded-[calc(1.5rem-2px)] flex items-center justify-center p-8 overflow-hidden shadow-inner">
                                    <div className="w-full h-full bg-[#F8F9FC] rounded-2xl border border-gray-100 flex items-center justify-center text-[#5D3FF3] opacity-50 font-black text-4xl">
                                        CN
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white/90 p-4 rounded-2xl shadow-lg border border-gray-50 flex items-center gap-3 animate-bounce">
                                <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <div className="pr-4">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-gray-400">Status</p>
                                    <p className="text-xs font-bold text-[#111827]">Production Ready</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
