import React from "react";

const Library = () => {
  // Mock Data for library stock distribution
  const resourceStats = [
    { label: "Total Books", count: "8,500+" },
    { label: "Reference Titles", count: "1,200+" },
    { label: "Journals & Magazines", count: "25+" },
    { label: "Digital E-Resources", count: "50,000+" },
  ];

  // Core stream distribution grid
  const streamSections = [
    { code: "B.Sc", category: "Basic & Applied Sciences", topics: "Physics, Chemistry, Botany, Zoology, Computer Science, Mathematics" },
    { code: "BCA", category: "Computer Applications", topics: "Software Engineering, Database Management, Data Structures, AI, Web Dev" },
    { code: "B.Com", category: "Commerce & Finance", topics: "Corporate Accounting, Financial Management, Banking, Taxation, Auditing" },
    { code: "B.A", category: "Humanities & Social Sci.", topics: "History, Political Science, Economics, Sociology, Optional Languages" },
  ];

  return (
    <section
      id="college-library"
      className="bg-slate-50 py-16 px-6 md:px-12 lg:px-24 pt-28 font-sans select-none text-slate-800"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- EXECUTIVE HEADER MATRIX --- */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            
            {/* Context Detail Presentation Card */}
            <div className="md:col-span-8 p-6 md:p-10 space-y-4">
              <div>
                <span className="text-xs font-bold tracking-widest text-fuchsia-900 uppercase block mb-1">
                  Learning Resource Centre
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
                  College Library
                </h2>
                <p className="text-sm font-semibold text-red-700 uppercase tracking-wider mt-1">
                  Success Degree College, Basavakalyan
                </p>
              </div>

              <div className="w-20 h-0.5 bg-slate-200"></div>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Welcome to the central information repository of Success Degree College. Our library serves as a cornerstone for academic exploration, supporting learning, teaching, and research across all undergraduate faculties. We offer a quiet, resourceful environment designed to empower students through knowledge access.
              </p>
            </div>

            {/* Quick Metrics Component Block */}
            <div className="md:col-span-4 bg-slate-50 p-6 md:p-8 border-t md:border-t-0 md:border-l border-slate-200 grid grid-cols-2 gap-4 h-full">
              {resourceStats.map((stat, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-2xs">
                  <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase block leading-tight">{stat.label}</span>
                  <span className="text-xl md:text-2xl font-black text-fuchsia-900 block mt-1">{stat.count}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* --- MAIN CONTENT & COLLECTION SPLIT ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Institutional Library Motto Panel */}
          <div className="lg:col-span-4 bg-fuchsia-900 text-white p-6 rounded-2xl shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 block mb-2">
              Library Objective
            </span>
            <p className="text-xl font-extrabold tracking-tight leading-snug">
              "A gateway to structured discovery, building research competence."
            </p>
            <div className="w-12 h-1 bg-yellow-400 rounded-full my-4"></div>
            
            {/* Timings Board */}
            <div className="space-y-2 pt-2 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 block">Working Hours</span>
              <div className="flex justify-between border-b border-fuchsia-800 pb-1">
                <span>Monday - Friday:</span>
                <span className="font-mono font-bold">09:00 AM - 04:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-mono font-bold">09:00 AM - 01:30 PM</span>
              </div>
            </div>
          </div>

          {/* Academic Collections Directory Matrix */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-lg font-black tracking-wider text-slate-900 uppercase">
              Course-Wise Learning Assets
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {streamSections.map((stream, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-2xs flex flex-col justify-between hover:border-fuchsia-300 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-pink-50 border border-pink-100 text-fuchsia-900 text-xs font-mono font-black px-2.5 py-1 rounded-md">
                        {stream.code}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reference Pool</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 mb-1">{stream.category}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">{stream.topics}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* --- LIBRARY CODE OF CONDUCT & RULES --- */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
            <div className="w-1 bg-red-600 h-5 rounded-full"></div>
            <h3 className="text-base md:text-lg font-black tracking-wide text-slate-900 uppercase">
              General Regulations & Borrowing Rules
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <ul className="space-y-3 font-medium text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">▪</span>
                <p>Every student must produce their valid **College Identity Card** to access the library premises and issue assets.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">▪</span>
                <p>Strict silence and academic decorum must be maintained inside the reading room zones at all times.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">▪</span>
                <p>Books are standardly issued for a maximum duration of **14 days**. Renewal is permitted if there is no active reserve queue.</p>
              </li>
            </ul>

            <ul className="space-y-3 font-medium text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">▪</span>
                <p>A late return administrative fine will apply if items are kept beyond the designated due date statement.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">▪</span>
                <p>Underlining, scribbling, or damaging pages of library books is strictly prohibited and will invite substitution fine liabilities.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">▪</span>
                <p>Digital library systems are reserved exclusively for browsing academic journals, project research work, and open-source catalogs.</p>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Library;