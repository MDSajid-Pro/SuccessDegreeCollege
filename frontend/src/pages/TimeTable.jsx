import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiEye, 
  FiBookmark, 
  FiAward, 
  FiBookOpen, 
  FiAlertCircle, 
  FiChevronDown, 
  FiBook, 
  FiSearch,
  FiExternalLink
} from "react-icons/fi";

// Static syllabus registry
const SYLLABUS_DATA = {
  "Bachelor of Science (B.Sc.)": {
    "1st & 2nd Semester": [
    { subject: "Botany", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1723826061.pdf" },
      { subject: "Zoology", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1723825469.pdf" },
      { subject: "Chemistry", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1723825291.pdf" },
    ],
    "3rd & 4th Semester": [
      { subject: "Botany", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1758559512.pdf" },
      { subject: "Zoology", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1758559512.pdf" },
      { subject: "Chemistry", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1756193972.pdf" },
    ],
    "5th & 6th Semester": [
      { subject: "Botany", credits: "Core Scheme Credits: 4 (SEP)", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1788334273.pdf" },
      { subject: "Zoology", credits: "Core Scheme Credits: 4 (SEP)", fileUrl: "/uplods/B.Sc. V and VI Sem SEP Syllabus.pdf" },
      { subject: "Chemistry", credits: "Core Scheme Credits: 4 (SEP)", fileUrl: "/uplods/B.Sc. V and VI Sem SEP Chemistry Syllabus.pdf" },
      { subject: "Computer Science", credits: "Core Scheme Credits: 4 (SEP)", fileUrl: "/uplods/B.Sc. V and VI Sem SEP Syllabus2.pdf" }
    ]
  },
  "Bachelor of Arts (B.A)": {
    "1st Semester": [
      { subject: "History", credits: "Core Scheme Credits: 4 (NEP)", fileUrl: "#" },
      { subject: "Political Science", credits: "Core Scheme Credits: 4 (NEP)", fileUrl: "#" },
      { subject: "Basic English", credits: "Language Credits: 3 (NEP)", fileUrl: "#" },
    ],
    "3rd Semester": [
      { subject: "History", credits: "Core Scheme Credits: 4 (NEP)", fileUrl: "#" },
      { subject: "Sociology", credits: "Core Scheme Credits: 4 (NEP)", fileUrl: "#" },
    ],
    "5th Semester": [
      { subject: "Political Science", credits: "Discipline Specific Elective: 4", fileUrl: "#" },
    ]
  },
  "Bachelor of Commerce (B.Com)": {
    "1st Semester": [
      { subject: "Financial Accounting", credits: "Core Scheme Credits: 4 (SEP)", fileUrl: "#" },
      { subject: "Business Management", credits: "Core Scheme Credits: 4 (SEP)", fileUrl: "#" },
    ],
    "3rd Semester": [
      { subject: "Corporate Accounting", credits: "Core Scheme Credits: 4 (SEP)", fileUrl: "#" },
      { subject: "Business Management II", credits: "Core Scheme Credits: 4 (SEP)", fileUrl: "#" },
    ],
  },
  "Bachelor of Computer Application (BCA)": {
    "1st & 2nd Semester": [
      { subject: "Bachelor of Computer Application", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1727193849.pdf" }
    ],
    "3rd & 4th Semester": [
      { subject: "Bachelor of Computer Application", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "https://bidaruniversity.karnataka.gov.in/uploads/media_to_upload1763349430.pdf" }
    ],
    "5th & 6th Semester": [
      { subject: "Bachelor of Computer Application", credits: "Core Credits: 4 + Lab Credits: 2", fileUrl: "/uplods/BCA V and VI Sem SEP Syllabus2.pdf" }
    ]
  }
};

const courses = Object.keys(SYLLABUS_DATA);
const defaultCourse = courses[0];
const defaultSemester = Object.keys(SYLLABUS_DATA[defaultCourse])[0];

const Syllabus = () => {
  const [expandedCourse, setExpandedCourse] = useState(defaultCourse);
  const [selectedSelection, setSelectedSelection] = useState({
    course: defaultCourse,
    semester: defaultSemester
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleCourseToggle = (courseName) => {
    if (expandedCourse === courseName) {
      setExpandedCourse("");
    } else {
      setExpandedCourse(courseName);
      const firstSem = Object.keys(SYLLABUS_DATA[courseName])[0];
      setSelectedSelection({ course: courseName, semester: firstSem });
    }
  };

  const filteredSubjects = useMemo(() => {
    const rawList = SYLLABUS_DATA[selectedSelection.course]?.[selectedSelection.semester] || [];
    if (!searchQuery.trim()) return rawList;

    const term = searchQuery.toLowerCase();
    return rawList.filter(
      (item) =>
        item.subject.toLowerCase().includes(term) ||
        item.credits.toLowerCase().includes(term)
    );
  }, [selectedSelection, searchQuery]);

  return (
    <section id="syllabus-portal" className="w-full bg-slate-50 min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Dashboard Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-fuchsia-900 via-rose-600 to-amber-400" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-fuchsia-900 uppercase block mb-1">
                Curriculum & Academic Regulations
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
                <FiBookOpen className="text-fuchsia-900 shrink-0" size={28} />
                Course Syllabus Repository
              </h1>
              <p className="text-slate-500 text-sm mt-1 max-w-2xl">
                Browse official course structures, credit allocations, and unit descriptors aligned with university guidelines.
              </p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 shrink-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Policy Model</span>
              <span className="text-sm font-black text-rose-700 uppercase tracking-wide block mt-0.5">
                State Education Policy (SEP)
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation: Program Accordion Rail */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-3">
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block px-1">
              Select Stream & Term
            </span>
            
            <div className="space-y-2">
              {courses.map((courseName) => {
                const isExpanded = expandedCourse === courseName;
                const isCurrentCourseActive = selectedSelection.course === courseName;

                return (
                  <div key={courseName} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-colors">
                    <button
                      onClick={() => handleCourseToggle(courseName)}
                      className={`w-full px-4 py-3.5 flex items-center justify-between font-bold text-xs uppercase tracking-wider transition-colors ${
                        isCurrentCourseActive
                          ? "bg-fuchsia-50/70 text-fuchsia-950"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-left">
                        <FiBookmark className={isCurrentCourseActive ? "text-fuchsia-900" : "text-slate-400"} size={16} />
                        {courseName}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-slate-400 shrink-0 ml-2"
                      >
                        <FiChevronDown size={16} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="border-t border-slate-100 bg-slate-50/50"
                        >
                          <div className="p-2 space-y-1">
                            {Object.keys(SYLLABUS_DATA[courseName]).map((semName) => {
                              const isSemActive = isCurrentCourseActive && selectedSelection.semester === semName;

                              return (
                                <button
                                  key={semName}
                                  onClick={() => setSelectedSelection({ course: courseName, semester: semName })}
                                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-between ${
                                    isSemActive
                                      ? "bg-fuchsia-900 text-white shadow-sm"
                                      : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                                  }`}
                                >
                                  <span>{semName}</span>
                                  {isSemActive && <span className="h-1.5 w-1.5 bg-amber-400 rounded-full" />}
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

          {/* Right Content Area: Search + Subject Cards */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            
            {/* Search Bar & Active Context Tag */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter subjects or credit rules..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-900/20 focus:border-fuchsia-900 transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="text-xs font-bold text-slate-500 whitespace-nowrap px-1">
                {selectedSelection.course} &bull; <span className="text-fuchsia-900">{selectedSelection.semester}</span>
              </div>
            </div>

            {/* Subject List Display */}
            <div className="space-y-3">
              {filteredSubjects.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                  <FiAlertCircle className="text-slate-300 mb-2" size={32} />
                  <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide">No Matches Found</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {searchQuery
                      ? `No subject titles or credits matched "${searchQuery}". Try clearing the search bar.`
                      : "No curriculum papers are available under this selection."}
                  </p>
                </div>
              ) : (
                filteredSubjects.map((item, idx) => (
                  <motion.div
                    key={`${item.subject}-${idx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04 }}
                    className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-fuchsia-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0">
                      <div className="p-3 bg-fuchsia-50 border border-fuchsia-100 rounded-xl text-fuchsia-900 shrink-0 group-hover:scale-105 transition-transform">
                        <FiBook size={20} />
                      </div>
                      
                      <div className="min-w-0 space-y-1">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          {selectedSelection.semester}
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate uppercase">
                          {item.subject}
                        </h2>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <FiAward className="text-fuchsia-800 shrink-0" size={14} />
                          <span>Structure: <strong className="font-semibold text-slate-800">{item.credits}</strong></span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-fuchsia-900 hover:bg-fuchsia-950 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-sm shrink-0 transition-colors"
                      title={`Open ${item.subject} syllabus`}
                    >
                      <FiEye className="text-amber-400" size={15} />
                      <span>View PDF</span>
                      <FiExternalLink className="opacity-60" size={12} />
                    </a>
                  </motion.div>
                ))
              )}
            </div>

            {/* Regulatory Notice Banner */}
            <div className="mt-8 bg-white border border-slate-200 border-l-4 border-l-fuchsia-900 p-5 rounded-r-xl rounded-l-sm shadow-sm flex items-start gap-3">
              <FiAlertCircle className="text-fuchsia-900 shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-xs font-black tracking-widest text-fuchsia-950 uppercase mb-1">
                  Regulatory Syllabus Compliance
                </h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Curricular structures comply with statutory norms mandated by Bidar University and the Higher Education Department of Karnataka. Unit allocations, assignment schemes, and grading policies reflect standard guidelines issued for the academic calendar.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Syllabus;