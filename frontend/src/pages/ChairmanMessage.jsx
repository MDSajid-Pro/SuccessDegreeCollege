import React from "react";
import { Quote, Shield, Award, GraduationCap } from "lucide-react";

const ChairmanMessage = () => {
  return (
    <section
      id="chairman-editorial"
      className="bg-slate-50 py-20 px-4 sm:px-8 lg:px-24 pt-28 font-sans select-none text-slate-800 relative"
    >
      {/* Decorative High-End Editorial Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-fuchsia-50/40 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* --- PREMIUM MAGAZINE BLOCK OVERLAP --- */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white rounded-3xl border border-slate-200/60 shadow-xl overflow-visible mb-16">
          
          {/* LEFT: Pinned Executive Portrait Frame */}
          <div className="lg:col-span-5 bg-slate-100/40 p-6 sm:p-8 flex items-center justify-center rounded-t-3xl lg:rounded-t-none lg:rounded-l-3xl border-b lg:border-b-0 lg:border-r border-slate-100">
            <div className="w-full max-w-[280px] sm:max-w-[300px] aspect-[4/5] bg-white border border-slate-200 rounded-2xl p-3 shadow-md flex items-center justify-center overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1920&auto=format&fit=crop" 
                alt="Honorable Chairman"
                className="w-full h-full object-contain rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* RIGHT: Administrative Introduction Panel */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100/60 text-fuchsia-900 text-[10px] font-black uppercase tracking-widest">
                <span>Governing Council Chairman</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                Leadership <br className="hidden sm:inline" />Perspective
              </h2>
              <p className="text-xs font-bold text-red-700 uppercase tracking-widest">
                Success Degree College, Basavakalyan
              </p>
            </div>

            <div className="w-16 h-0.5 bg-gradient-to-r from-fuchsia-900 to-red-600"></div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              Steering our structural capital, financial deployment pathways, and institutional directives to secure a high-parity competitive advantage for the youth of the Kalyan Karnataka region.
            </p>
          </div>
        </div>

        {/* --- DUAL COLUMN CONTENT & CALLOUTS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Big Editorial Block Quote Column */}
          <div className="lg:col-span-5 bg-fuchsia-900 text-white p-8 rounded-2xl shadow-md relative overflow-hidden group">
            <Quote className="absolute -top-4 -right-4 h-24 w-24 text-fuchsia-800/30 stroke-[3] transform group-hover:rotate-6 transition-transform duration-500" />
            <p className="text-xl sm:text-2xl font-black tracking-tight leading-snug relative z-10">
              "We do not simply hand out degree certificates; we construct the functional real-world competencies required to engineer structural progress."
            </p>
            <div className="w-12 h-1 bg-yellow-400 rounded-full my-6"></div>
            <p className="text-xs text-fuchsia-100 font-medium leading-relaxed opacity-90">
              Adapting educational mechanics directly to practical execution outcomes.
            </p>
          </div>

          {/* Core Official Address Copy Column */}
          <div className="lg:col-span-7 text-slate-600 text-sm sm:text-base text-justify leading-relaxed font-normal space-y-6">
            <p className="first-letter:text-4xl first-letter:font-black first-letter:text-fuchsia-900 first-letter:mr-2 first-letter:float-left text-slate-900 font-medium">
              Welcome to Success Degree College. Our foundational mission is simple yet expansive: to bridge academic divides and design an environment where emerging regional talent matches global standards effortlessly.
            </p>
            
            <p>
              By aligning our entire campus curriculum with the multi-disciplinary requirements of the <strong>National Education Policy (NEP) 2020</strong>, we prioritize structural critical thinking and technology deployment over old-school rote memorization models.
            </p>

            <p>
              Backed by statutory developmental safeguards such as <strong>Article 371(J)</strong> of the Indian Constitution, we continually deploy physical infrastructure, high-performance laboratories, and expansive reference setups to support every student.
            </p>
          </div>
        </div>

        {/* --- BASE PILLARS GRID TILES --- */}
        <div className="border-t border-slate-200/80 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Shield size={16} />, title: "Commitment", text: "Infrastructural scaling frameworks" },
              { icon: <Award size={16} />, title: "Character", text: "Deep moral and ethical grounding" },
              { icon: <GraduationCap size={16} />, title: "Credibility", text: "Fully verified academic success outcomes" }
            ].map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200/60 p-5 rounded-xl hover:border-fuchsia-300 transition-colors duration-300 flex items-start gap-3 shadow-2xs"
              >
                <div className="p-2 bg-pink-50 text-fuchsia-900 rounded-lg border border-pink-100 shrink-0">
                  {pillar.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{pillar.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{pillar.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ChairmanMessage;