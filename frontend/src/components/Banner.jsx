import React from "react";
import { assets } from "../assets/assets";

const Banner = ({ 
  title, 
  subtitle, 
  heroStudent, 
  achievers, 
  stats, 
  statsTitle,
  admissionYear 
}) => {
  return (
    <div className="w-full bg-pink-50 overflow-hidden font-sans relative select-none">
      
      {/* Structural background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-100 rounded-bl-full pointer-events-none opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100/50 rounded-tr-full pointer-events-none"></div>

      {/* --- UPPER NAVIGATION BRAND BLOCK --- */}
      <header className="bg-fuchsia-900 text-white border-b-4 border-yellow-400 relative z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
          
          <div className="flex items-center gap-4 text-center md:text-left flex-col sm:flex-row">
            <div className="bg-white p-2 rounded-xl w-16 h-16 shadow-md shrink-0 flex items-center justify-center transform transition-transform hover:scale-105">
              <img src={assets.logo2} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                Success Degree College
              </h1>
              <p className="text-yellow-300 text-xs sm:text-sm font-bold tracking-wide uppercase mt-1">
                Basavakalyan, Dist. Bidar
              </p>
            </div>
          </div>

          <div className="bg-yellow-400 text-fuchsia-950 font-black text-[11px] sm:text-xs px-4 py-2 rounded-xl text-center shadow-sm max-w-md border border-yellow-300 leading-tight">
            Recognised by Govt. of Karnataka, Affiliated to Bidar University & Approved by AICTE
          </div>
        </div>
      </header>

      {/* --- CENTRAL HERO CONTAINER --- */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Announcements and Main Topper */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
          
          {/* Main Title Banner Block */}
          <div className="bg-white border-l-8 border-fuchsia-800 p-5 rounded-r-2xl shadow-sm flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-widest font-black text-fuchsia-700 block mb-1">Latest Update</span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="text-fuchsia-800 font-dancing-script text-lg md:text-xl font-bold mt-2">
              {subtitle}
            </p>
          </div>

          {/* Topper Card */}
          <div className="bg-gradient-to-b from-white to-pink-50/30 rounded-2xl shadow-md border border-fuchsia-100 p-5 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 bg-yellow-400 text-red-700 font-black px-4 py-1.5 rounded-bl-xl text-xs uppercase tracking-wider shadow-sm z-10">
              {heroStudent.rank} Rank
            </div>

            <div className="flex items-center gap-4">
              <div className="w-24 h-28 sm:w-28 sm:h-36 rounded-xl overflow-hidden bg-white border border-fuchsia-100 shrink-0 shadow-sm">
                <img src={heroStudent.img} alt={heroStudent.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-black text-red-600 truncate">{heroStudent.name}</h3>
                <p className="text-xs font-bold text-gray-700 mt-0.5 truncate">{heroStudent.fatherName}</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">{heroStudent.regNo}</p>
                <div className="mt-3.5 inline-flex items-center gap-1.5 bg-yellow-400 text-fuchsia-950 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-[0_2px_10px_rgba(250,204,21,0.2)] border border-yellow-300 transform transition-transform duration-300 hover:scale-105">
  <span className="opacity-80 font-bold">Score:</span>
  <span>{heroStudent.per}</span>
</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- STATIC, CLEAN GRID GALLERY (NO SCROLLING) --- */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-fuchsia-100 p-5 shadow-sm flex flex-col justify-start">
          <span className="text-[11px] uppercase tracking-widest font-black text-fuchsia-800 block mb-4 text-center border-b border-pink-100 pb-2">
            🏆 Roll of Honor - Star Performers
          </span>
          
          {/* Symmetrical 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[360px] pr-1">
            {achievers.map((student, idx) => (
              <div 
                key={idx} 
                className="bg-pink-50/40 border border-pink-100/70 p-3 rounded-xl flex flex-col justify-between hover:bg-white hover:border-fuchsia-300 hover:shadow-md transition-all duration-300 group transform hover:-translate-y-0.5"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-gray-900 group-hover:text-fuchsia-950 truncate tracking-wide">
                    {student.name}
                  </h4>
                  <p className="text-[10px] font-bold text-gray-400 group-hover:text-gray-500 truncate mt-0.5">
                    {student.fatherName || "D/o Shafiuddin"}
                  </p>
                </div>
                
                <div className="mt-2.5 pt-2 border-t border-dashed border-pink-200/60 flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold text-gray-400">PERCENTAGE:</span>
                  <span className="bg-fuchsia-800 text-yellow-300 text-[11px] font-black px-2 py-0.5 rounded-md shadow-2xs font-mono">
                    {student.per}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Statistics Matrix and Application Portal */}
        <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-4">
          
          <div className="bg-fuchsia-950 text-white rounded-2xl p-4 shadow-md flex-1 flex flex-col justify-between">
            <h3 className="text-yellow-400 text-center font-black text-xs tracking-wider uppercase border-b border-fuchsia-800 pb-2 mb-3">
              {statsTitle}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-fuchsia-900/60 rounded-xl p-2 border border-fuchsia-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-200 block">{stat.label}</span>
                  <span className="text-xl font-black text-white block mt-0.5">{stat.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-5 rounded-2xl shadow-md text-center flex flex-col items-center justify-center relative overflow-hidden group flex-1 min-h-[140px] border border-gray-700">
            <div className="absolute w-20 h-60 bg-white/5 rotate-45 -top-10 -left-16 group-hover:left-[125%] transition-all duration-1000 ease-in-out"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Online Entry portal</span>
            <h3 className="text-lg font-black uppercase tracking-wide text-white">Admissions</h3>
            
            <div className="my-2 transform group-hover:scale-105 transition-transform">
              <a 
                href="https://uucms.karnataka.gov.in/Login/OnlineStudentRegistrationForm" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black px-6 py-1.5 text-xs sm:text-sm rounded-xl shadow-md tracking-widest block transition-all animate-pulse"
              >
                APPLY NOW
              </a>
            </div>
            <p className="text-[11px] text-yellow-400/80 font-mono tracking-wider">Academic Term: {admissionYear}</p>
          </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="bg-fuchsia-900 text-white py-4 px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-3 text-xs sm:text-sm relative z-10 border-t-2 border-yellow-400">
        <div className="font-bold max-w-md opacity-95">
          Address: Gandhi Chowk, Behind Police Station, Basavakalyan
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 font-extrabold text-yellow-300 font-mono">
          <a href="tel:8549808439" className="hover:text-yellow-200 transition-colors">📞 85498 08439</a>
          <span className="hidden sm:inline opacity-30 text-white">|</span>
          <a href="tel:8095808439" className="hover:text-yellow-200 transition-colors">📞 80958 08439</a>
        </div>
      </footer>
    </div>
  );
};

export default Banner;