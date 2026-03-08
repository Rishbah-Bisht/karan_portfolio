import React from 'react';

const About = ({ profile }) => {
    return (
        <section id="about" className="relative py-24 px-6 md:px-20 lg:px-40 bg-white/90 overflow-hidden scroll-mt-24">
            <div className="max-w-4xl mx-auto">
                <div className="reveal flex flex-col items-center text-center mb-16">
                    <h2 className="text-xs uppercase tracking-[0.4em] text-[#5D3FF3] font-black mb-4">About Me</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-[#111827]">
                        Driving Success through <span className="text-[#5D3FF3]">Business & Sales.</span>
                    </h3>
                </div>

                <div className="reveal grid gap-10 text-lg leading-relaxed text-[#111827]/80 text-center md:text-left">
                    <p>
                        {profile?.about || "I am a proactive BBA student at Graphic Era Hill University with hands-on experience in Sales and CRM operations."}
                    </p>
                    <p>
                        {profile?.aboutExtended || "My professional journey is centered around optimizing sales operations and enhancing customer relationship management."}
                    </p>
                </div>

                <div className="reveal mt-16 flex flex-wrap justify-center gap-4">
                    {['Lead Generation', 'CRM Strategy', 'Sales Operations', 'Teamwork'].map(tag => (
                        <span key={tag} className="px-6 py-2.5 rounded-xl bg-[#F8F9FC] border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-[#5D3FF3] shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
