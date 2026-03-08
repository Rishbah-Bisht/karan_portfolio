import React from 'react';

const ResearchIcon = ({ className }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        {/* Magnifying Glass Circle */}
        <circle cx="45" cy="45" r="35" stroke="currentColor" strokeWidth="6" />
        {/* Handle */}
        <line x1="70" y1="70" x2="90" y2="90" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
        {/* Nodes inside */}
        <circle cx="35" cy="40" r="5" fill="currentColor" />
        <circle cx="55" cy="35" r="5" fill="currentColor" />
        <circle cx="50" cy="55" r="5" fill="currentColor" />
        {/* Connections */}
        <line x1="35" y1="40" x2="55" y2="35" stroke="currentColor" strokeWidth="2" />
        <line x1="55" y1="35" x2="50" y2="55" stroke="currentColor" strokeWidth="2" />
        <line x1="35" y1="40" x2="50" y2="55" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#F8F9FC]">
            {/* Soft animated blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5D3FF3]/5 rounded-full blur-[120px] animate-blob"></div>
            <div className="absolute top-[40%] right-[-10%] w-[45%] h-[45%] bg-[#5D3FF3]/3 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-[#5D3FF3]/4 rounded-full blur-[110px] animate-blob animation-delay-4000"></div>

            {/* Subtle floating research icons */}
            <div className="absolute top-[15%] left-[10%] w-32 h-32 text-[#5D3FF3]/3 animate-float">
                <ResearchIcon className="w-full h-full" />
            </div>
            <div className="absolute top-[60%] right-[15%] w-48 h-48 text-[#5D3FF3]/1.5 animate-float animation-delay-2000">
                <ResearchIcon className="w-full h-full rotate-12" />
            </div>
            <div className="absolute bottom-[10%] left-[30%] w-24 h-24 text-[#5D3FF3]/2 animate-float animation-delay-4000">
                <ResearchIcon className="w-full h-full -rotate-12" />
            </div>

            {/* Subtle mesh grid overlay */}
            <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#5D3FF3_1px,transparent_1px),linear-gradient(90deg,#5D3FF3_1px,transparent_1px)] [background-size:100px_100px]"></div>
        </div>
    );
};

export default AnimatedBackground;
