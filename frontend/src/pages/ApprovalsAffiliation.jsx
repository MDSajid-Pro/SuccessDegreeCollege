import React, { useState, useEffect, useRef } from "react";
import { Eye, Download } from "lucide-react";

const ApprovalsAffiliation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef(null);

  // Simulation loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Track the absolute page scroll depth to perfectly complete the line through the 3rd point
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      // Total height the user can actually scroll through inside the browser window
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalScrollableHeight <= 0) return;

      // Current exact vertical scroll position of the user
      const currentScrollPosition = window.scrollY;

      // Calculate global scroll progress percentage (0 to 100)
      const globalProgress = Math.min(Math.max((currentScrollPosition / totalScrollableHeight) * 100, 0), 100);
      
      setLineHeight(globalProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run an initial execution check to instantly position the line if already scrolled down
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const accreditationList = [
    {
      title: "Government of Karnataka",
      authority: "Department of Collegiate Education",
      status: "Recognised Status",
      description: "Statutory state recognition authorizing our structured undergraduate tracks designed in direct alignment with regional advancement models.",
      fileUrl: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_daaafda9a7dc4924841dca003f5bc4bb.pdf",
    },
    {
      title: "Bidar University, Bidar",
      authority: "Affiliating University Body",
      status: "Affiliated Status",
      description: "Official administrative integration establishing verified curriculum standard compliance, centralized assessment metrics, and degree validation.",
      fileUrl: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_1dc8b26f8b8d4669b3b39291d84ce408.pdf",
    },
    {
      title: "AICTE, New Delhi",
      authority: "All India Council for Technical Education",
      status: "Approved Status",
      description: "National apex approval for implementing professional competencies and technical multi-disciplinary training pipelines across departments.",
      fileUrl: "https://6212f8e5-1d36-4b90-b89c-3951a43c5d4f.filesusr.com/ugd/e1ca7d_d57ab73115d84a4a844b721ed601c398.pdf",
    }
  ];

  return (
    <section
      id="regulatory-compliance"
      className="bg-white py-16 px-4 md:px-12 lg:px-24 pt-28 font-sans select-none text-slate-800 relative"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER TITLE SECTION --- */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-fuchsia-900 text-xs font-bold uppercase tracking-wider mb-3">
            ✨ Governance & Verification
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Approvals & Affiliations
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-2">
            Success Degree College, Basavakalyan • Validated Institutional Tracking Certificates
          </p>
        </div>

        {/* --- SKELETON LOADER PLATFORM --- */}
        {isLoading ? (
          <div className="space-y-6 max-w-2xl mx-auto animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-slate-100 rounded-2xl p-6 space-y-3 bg-slate-50/50">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-3 bg-slate-100 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          
          /* --- VERTICAL TIMELINE GRID COMPLYING WITH SCREENSHOT 2026-06-06 235454.png --- */
          <div ref={timelineRef} className="relative max-w-5xl mx-auto px-2">
            
            {/* 1. Underlying Base Passive Static Path Line (Light Gray Track) */}
            <div className="absolute left-4 md:left-1/2 top-8 bottom-8 w-[2px] bg-slate-100 -translate-x-1/2 hidden sm:block"></div>

            {/* 2. ACCURATE SCROLL ANIMATED SEED PATH TRACK (Fuchsia Flow Overlay) */}
            {/* Height limits extend fully down past the final index node boundary */}
            <div 
              className="absolute left-4 md:left-1/2 top-8 w-[2px] bg-fuchsia-900 -translate-x-1/2 hidden sm:block origin-top transition-all duration-150 ease-out"
              style={{ 
                height: "calc(100% - 48px)", 
                clipPath: `inset(0 0 ${100 - lineHeight}% 0)` 
              }}
            ></div>

            <div className="space-y-12 relative z-10">
              {accreditationList.map((item, idx) => {
                const isEven = idx % 2 === 0;
                
                // Calculate item position checkpoints uniformly across the total count scale
                const totalItems = accreditationList.length;
                const allocationPercentage = (idx / (totalItems - 1 || 1)) * 100;
                
                // Active node state switches exactly as line hits checkpoint percentage boundary
                const isCurrentNodeFilled = lineHeight >= allocationPercentage;

                return (
                  <div 
                    key={idx} 
                    className={`relative flex flex-col sm:flex-row items-stretch w-full ${
                      isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    
                    {/* --- ACCURATE CONNECTOR RINGS --- */}
                    <div 
                      className={`absolute left-4 md:left-1/2 top-7 w-4 h-4 rounded-full bg-white -translate-x-1/2 hidden sm:block z-20 transition-all duration-300 ease-in-out ${
                        isCurrentNodeFilled 
                          ? "border-fuchsia-900 bg-fuchsia-900 shadow-[0_0_10px_rgba(134,25,143,0.3)] scale-110" 
                          : "border-slate-300 border-2"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-white mx-auto mt-[3px] transition-transform duration-300 ${isCurrentNodeFilled ? "scale-100" : "scale-0"}`}></div>
                    </div>

                    {/* Content Side Blocks Layout */}
                    <div className="w-full sm:w-[45%] ml-8 sm:ml-0">
                      <div className="bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-fuchsia-200 p-6 rounded-2xl transition-all duration-300 relative group flex flex-col h-full justify-between">
                        
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                            <div>
                              <span className="text-[10px] font-mono font-black text-red-600 uppercase tracking-widest block mb-0.5">
                                {item.authority}
                              </span>
                              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                                {item.title}
                              </h3>
                            </div>
                            <span className="text-[9px] bg-pink-50 text-fuchsia-900 border border-pink-100 px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider shrink-0 self-start">
                              {item.status}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mt-2 border-l-2 border-slate-100 pl-3">
                            {item.description}
                          </p>
                        </div>

                        {/* Link Action Trigger Row */}
                        <div className="mt-6 pt-4 border-t border-dashed border-slate-100 flex items-center gap-3 justify-start sm:justify-end">
                          
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-xl border border-slate-200 transition-colors"
                          >
                            <Eye size={13} className="text-fuchsia-900" />
                            <span>View Copy</span>
                          </a>

                        </div>

                      </div>
                    </div>

                    <div className="w-[45%] hidden sm:block"></div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default ApprovalsAffiliation;