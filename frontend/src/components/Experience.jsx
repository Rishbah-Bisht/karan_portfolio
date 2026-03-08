import React from 'react';

const Experience = ({ experience }) => {
    return (
        <section id="experience" className="py-24 px-6 md:px-20 lg:px-40 bg-[#F8F9FC] text-[#111827] overflow-hidden scroll-mt-24">
            <div className="max-w-6xl mx-auto">
                <div className="reveal mb-16 space-y-4 text-center md:text-left">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-[#5D3FF3]/20 bg-[#5D3FF3]/5 shadow-sm">
                        <span className="text-xs uppercase tracking-[0.3em] text-[#5D3FF3] font-black">Experience</span>
                    </div>
                    <h3 className="text-5xl font-bold tracking-tight text-[#111827]">Professional <span className="text-[#5D3FF3]">Journey.</span></h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal">
                    {experience.length > 0 ? experience.map(exp => (
                        <div
  key={exp._id}
  className="hover-card group relative overflow-hidden p-6 sm:p-8 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] bg-white/90 border border-gray-100 transition-all duration-500 shadow-sm"
>
  <div className="absolute -right-10 -top-10 w-32 sm:w-40 h-32 sm:h-40 bg-[#5D3FF3]/5 blur-[80px] group-hover:bg-[#5D3FF3]/10 transition-all"></div>

  <div className="flex items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
    
    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#111827] rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </div>

    <div>
      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#111827]">
        {exp.role}
      </h4>

      <p className="text-[#5D3FF3] font-bold text-xs sm:text-sm tracking-wide">
        {exp.company}
      </p>

      <p className="text-[9px] sm:text-[10px] opacity-40 uppercase tracking-widest font-black mt-1">
        {exp.duration} | {exp.location}
      </p>
    </div>
  </div>

  <p className="text-sm sm:text-base lg:text-lg opacity-70 leading-relaxed font-medium">
    {exp.description}
  </p>

  <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
    {exp.tags?.map((tag) => (
      <span
        key={tag}
        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#F8F9FC] border border-gray-100 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#111827]/60"
      >
        {tag}
      </span>
    ))}
  </div>
</div>
                    )) : (
                        <div className="text-center col-span-2 text-gray-400 font-medium">No experience records found.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experience;
