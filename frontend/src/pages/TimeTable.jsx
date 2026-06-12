import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiBookmark, FiAward, FiBookOpen, FiAlertCircle, FiChevronDown, FiBook } from "react-icons/fi";

const Syllabus = () => {
  // Navigation States: Tracks expanded stream accordion and currently selected criteria combo
  const [expandedCourse, setExpandedCourse] = useState();
  const [selectedSelection, setSelectedSelection] = useState({ });
  const [isLoading, setIsLoading] = useState(true);

  // Structurally mapped database asset directory divided cleanly by Subjects under Semesters
  const syllabusData = {
    "Bacholar of Arts (B.A)": {
      "1st Semester": [
        { subject: "History", timeWindow: "Core Scheme Credits: 4 (NEP)", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1775548070.pdf" },
        { subject: "Political Science", timeWindow: "Core Scheme Credits: 4 (NEP)", fileUrl: "/docs/ba-sem1-polscience-syllabus.pdf" },
        { subject: "Basic English", timeWindow: "Language Credits: 3 (NEP)", fileUrl: "/docs/ba-sem1-english-syllabus.pdf" },
      ],
      "3rd Semester": [
        { subject: "History", timeWindow: "Core Scheme Credits: 4 (NEP)", fileUrl: "/docs/ba-sem3-history-syllabus.pdf" },
        { subject: "Sociology", timeWindow: "Core Scheme Credits: 4 (NEP)", fileUrl: "/docs/ba-sem3-sociology-syllabus.pdf" },
      ],
      "5th Semester": [
        { subject: "Political Science", timeWindow: "Discipline Specific Elective: 4", fileUrl: "/docs/ba-sem5-polscience-syllabus.pdf" },
      ]
    },
    "Bachelor of Science (B.Sc.)": {
      "1st Semester & 2nd Semester": [
        { subject: "Physics", timeWindow: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1723824882.pdf" },
        { subject: "Mathematics", timeWindow: "Core Scheme Credits: 6 (NEP)", fileUrl: "/docs/bsc-sem1-maths-syllabus.pdf" },
        { subject: "Chemistry", timeWindow: "Core Credits: 4 + Lab Credits: 2", fileUrl: "/docs/bsc-sem1-chemistry-syllabus.pdf" },
      ],
      "3rd Semester": [
        { subject: "Physics", timeWindow: "Core Credits: 4 + Lab Credits: 2", fileUrl: "/docs/bsc-sem3-physics-syllabus.pdf" },
      ],
      "5th Semester": [
        { subject: "Mathematics", timeWindow: "Advanced Stream Elective: 6", fileUrl: "/docs/bsc-sem5-maths-syllabus.pdf" },
      ]
    },
    "B.Com": {
      "1st Semester": [
        { subject: "Financial Accounting", timeWindow: "Core Scheme Credits: 4 (NEP)", fileUrl: "/docs/bcom-sem1-accounting-syllabus.pdf" },
        { subject: "Business Management", timeWindow: "Core Scheme Credits: 4 (NEP)", fileUrl: "/docs/bcom-sem1-management-syllabus.pdf" },
        ],
        "3st Semester": [
        { subject: "Sajid", timeWindow: "Core Scheme Credits: 4 (NEP)", fileUrl: "/docs/bcom-sem1-accounting-syllabus.pdf" },
        { subject: "Business Management", timeWindow: "Core Scheme Credits: 4 (NEP)", fileUrl: "/docs/bcom-sem1-management-syllabus.pdf" },
      ],
    },
    "Bachelor of Computer Application (BCA)": {
      "1st & 2nd Semester": [
        { subject: "Bachelor of Computer Application (BCA)", timeWindow: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1727193849.pdf" }
      ],
      "3rd & 4th Semester": [
        { subject: "Bachelor of Computer Application (BCA)", timeWindow: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1763349430.pdf" }
      ]
    }
  };

  // Simulate a fluid content fetch transition on switching selections
  useEffect(() => {
    setIsLoading(true);
    const mockFetchTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(mockFetchTimer);
  }, [selectedSelection]);

  // Extract subjects directly matching the chosen course and semester combination
  const activeSubjectsList = syllabusData[selectedSelection.course]?.[selectedSelection.semester] || [];

  return (
    <section
      id="syllabus-portal"
      className="w-full bg-slate-50 min-h-screen pt-[100px] md:pt-[100px] pb-16 px-4 sm:px-6 md:px-8 font-sans select-none text-slate-800"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* --- MASTER HEADER DASHBOARD PANEL --- */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-fuchsia-900 via-red-600 to-yellow-400" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-fuchsia-900 uppercase block mb-1">
                Curriculum & Regulations
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
                <FiBookOpen className="text-fuchsia-900 shrink-0" size={26} />
                Course Syllabus Structure
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                Toggle specific streams and drop down semesters to view official course regulations and unit descriptors.
              </p>
            </div>
            <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Academic Framework</span>
              <span className="text-xs font-extrabold text-red-700 uppercase tracking-wider block mt-0.5">State Education Policy (SEP)</span>
            </div>
          </div>
        </div>

        {/* --- DASHBOARD NESTED GRID HUB --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE ACCORDION DROP-DOWN RAIL */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-3">
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block px-1">
              Course Tracks & Terms
            </span>
            
            <div className="flex flex-col gap-2 w-full">
              {Object.keys(syllabusData).map((courseName) => {
                const isAccordionExpanded = expandedCourse === courseName;

                return (
                  <div key={courseName} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
                    {/* Stream Main Accordion Header Toggle */}
                    <button
                      onClick={() => setExpandedCourse(isAccordionExpanded ? "" : courseName)}
                      className={`w-full px-4 py-3.5 flex items-center justify-between font-black text-xs uppercase tracking-wider outline-none transition-colors ${
                        selectedSelection.course === courseName
                          ? "bg-pink-50/40 text-fuchsia-900"
                          : "bg-white text-slate-700 hover:bg-slate-50/60"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <FiBookmark className="text-fuchsia-900" size={14} />
                        {courseName}
                      </span>
                      <motion.div
                        animate={{ rotate: isAccordionExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400"
                      >
                        <FiChevronDown size={14} />
                      </motion.div>
                    </button>

                    {/* Dropdown Semester Container */}
                    <AnimatePresence initial={false}>
                      {isAccordionExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="border-t border-slate-100 bg-slate-50/40 overflow-hidden"
                        >
                          <div className="p-1.5 flex flex-col gap-1">
                            {Object.keys(syllabusData[courseName]).map((semName) => {
                              const isCurrentSemesterActive =
                                selectedSelection.course === courseName &&
                                selectedSelection.semester === semName;

                              return (
                                <button
                                  key={semName}
                                  onClick={() =>
                                    setSelectedSelection({ course: courseName, semester: semName })
                                  }
                                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold tracking-wide transition-all outline-none flex items-center justify-between ${
                                    isCurrentSemesterActive
                                      ? "bg-fuchsia-900 text-white shadow-2xs"
                                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                  }`}
                                >
                                  <span>{semName}</span>
                                  {isCurrentSemesterActive && <span className="h-1 w-1 bg-yellow-400 rounded-full" />}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: REPOSITORY TERMINAL MONITOR VIEW (Displays subjects mapping) */}
          <div className="lg:col-span-8 xl:col-span-9 min-h-[380px]">
            <AnimatePresence mode="wait">
              
              {/* Loading Condition State */}
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {[1, 2].map((n) => (
                    <div key={n} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
                      <div className="space-y-2 flex-1 w-full">
                        <div className="h-5 bg-slate-200 rounded w-1/3" />
                        <div className="h-3.5 bg-slate-100 rounded w-1/4" />
                      </div>
                      <div className="h-10 bg-slate-200 rounded-xl shrink-0 w-full sm:w-auto" />
                    </div>
                  ))}
                </motion.div>
              ) : activeSubjectsList.length === 0 ? (
                
                /* Fallback Prompt */
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-50/50 border border-slate-200 rounded-2xl p-12 text-center border-dashed flex flex-col items-center justify-center min-h-[300px]"
                >
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">No Syllabus Records Found</h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">The curriculum blueprint for this specific parameter is currently loading or unmapped.</p>
                </motion.div>
              ) : (
                
                /* Populated Subject Rows Asset Cards */
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-4"
                >
                  {/* Result Meta Counter Badge */}
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                    📋 Active Subjects for {selectedSelection.course} • {selectedSelection.semester}
                  </div>

                  {activeSubjectsList.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 hover:border-fuchsia-200 shadow-2xs transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="p-3 bg-pink-50 border border-pink-100 rounded-xl text-fuchsia-900 shrink-0 hidden md:block group-hover:scale-105 transition-transform">
                          <FiBook size={18} />
                        </div>
                        
                        <div className="space-y-1.5 min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase block">
                            {selectedSelection.course} Course Plan • {selectedSelection.semester}
                          </span>
                          
                          <h3 className="text-lg font-black text-slate-900 tracking-tight truncate pr-4 uppercase">
                            {item.subject}
                          </h3>
                          
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <FiAward className="text-fuchsia-800" size={14} />
                            <span>Structure Allocation: <strong className="text-slate-700 font-mono font-bold">{item.timeWindow}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* --- INTERACTIVE IN-BROWSER PDF VIEW LINK --- */}
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-fuchsia-900 hover:bg-fuchsia-950 text-white font-black text-xs uppercase tracking-widest px-5 py-3 rounded-xl shadow-2xs shrink-0 border border-fuchsia-950 flex items-center justify-center gap-2 group/btn transition-colors"
                        title={`Open syllabus roadmap for ${item.subject} in a new tab`}
                      >
                        <FiEye className="text-yellow-400 group-hover/btn:scale-110 transition-transform" size={14} />
                        <span>View</span>
                      </a>
                    </div>
                  ))}
                </motion.div>
              )}

            </AnimatePresence>

            {/* --- BASE ACCREDITATION NOTICE BOARD --- */}
            {!isLoading && (
              <div className="mt-8 bg-slate-50 border-l-4 border-fuchsia-900 p-5 rounded-r-xl flex items-start gap-3">
                <FiAlertCircle className="text-fuchsia-900 shrink-0 mt-0.5" size={16} />
                <div>
                  <h4 className="text-xs font-black tracking-widest text-fuchsia-955 uppercase mb-0.5">
                    Regulatory Syllabus Compliance
                  </h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    The above curricular models directly comply with regulations structured by Bidar University and the Higher Education Department of Karnataka. Unit metrics, assignment matrices, and course outlines reflect statutory frameworks updated for the current academic session.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Syllabus;