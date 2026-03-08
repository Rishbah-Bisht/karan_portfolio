import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Certs", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      id="navbar"
      className="fixed top-5 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[100]"
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 px-6 py-4 md:px-10 flex justify-between items-center shadow-lg transition-all duration-500 ${
          isOpen
            ? "h-auto pb-8 flex-col items-start gap-8"
            : "h-[70px]"
        }`}
      >
        {/* LOGO */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <div
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#5D3FF3] rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-500 shadow-md"></div>

              <span className="relative z-10 text-white font-black text-xs tracking-tight">
                K
              </span>
            </div>

            <span className="text-sm font-black tracking-widest text-[#111827] uppercase">
              Karan
            </span>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#111827]"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-all ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>

              <span
                className={`w-full h-0.5 bg-current transition-all ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>

              <span
                className={`w-full h-0.5 bg-current transition-all ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* NAV LINKS */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-4 md:gap-0`}
        >
          <ul className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full md:w-auto">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full md:w-auto">
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block md:px-5 py-3 md:py-2 text-[11px] uppercase tracking-[0.3em] font-black text-gray-500 hover:text-[#5D3FF3] hover:bg-[#F6F7FF] rounded-lg transition-all w-full md:w-auto"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* MOBILE DIVIDER */}
          <div className="md:hidden w-full h-[1px] bg-gray-200 my-2"></div>

          {/* BUTTON */}
          <div className="flex items-center gap-4 w-full md:w-auto mt-2 md:mt-0">
            <div className="hidden md:block h-6 w-[1px] bg-gray-200 mx-2"></div>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full md:w-auto px-6 py-3 bg-[#111827] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#5D3FF3] transition-all duration-300 shadow-md text-center"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;