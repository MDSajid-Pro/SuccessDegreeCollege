import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TeachingStaff = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  // Teaching Staff Data
  const teachingStaff = [
    { id: 1, name: "Dr. Afroz Jahan", qual: "M.Sc., M.Ed., M.Phil., Ph.D", desig: "Principal", dept: "Environmental Science" },
    { id: 2, name: "Mrs. Nayer Fatima", qual: "M.Sc., B.Ed., KSET", desig: "Vice - Principal, Associate professor", dept: "Department of Science" },
    { id: 3, name: "Shweta", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
    { id: 4, name: "Shaikh Zeba", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
    { id: 5, name: "Mehbooba Begum", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
    { id: 6, name: "Kaveri", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
    { id: 31, name: "Md Sajid", qual: "M.Sc., B.Ed.", desig: "Lecturer", dept: "Department of Science" },
    { id: 7, name: "Mehraj", qual: "M.Sc. Cs", desig: "Lecturer", dept: "Computer Applications" },
    { id: 8, name: "Taranum Begum", qual: "B.Tech. Cs", desig: "Lecturer", dept: "Computer Applications" },
    { id: 9, name: "Karan", qual: "MCA", desig: "Lecturer", dept: "Computer Applications" },
    { id: 10, name: "Md Rafeeq", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
    { id: 11, name: "Md Parvez", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
    { id: 12, name: "Sagar", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
    { id: 13, name: "Nand Kishore", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
    { id: 14, name: "Pallavi", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
    { id: 15, name: "Md Hafeez", qual: "MCA, B.Ed.", desig: "Lecturer", dept: "Computer Applications" },
    { id: 16, name: "Moin", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
    { id: 17, name: "Asif Khan", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
    { id: 18, name: "Md Shoeb Ahmed", qual: "MBA, B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
    { id: 19, name: "Khaja Moinuddin", qual: "MBA, B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
    { id: 20, name: "Bushra Tamkeen", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
    { id: 21, name: "Asif Ali", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
    { id: 22, name: "Khaja Bi", qual: "M.Com., B.Ed.", desig: "Lecturer", dept: "Department of Commerce" },
    { id: 23, name: "Mohammed Ibrahim", qual: "MA, B.Ed.", desig: "Lecturer", dept: "Department of Arts" },
    { id: 24, name: "Mohammed Altamash", qual: "MA, B.Ed.", desig: "Lecturer", dept: "Department of Arts" },
    { id: 25, name: "Narsing Datturao", qual: "MA, M.phil.", desig: "Lecturer", dept: "Department of Arts" },
    { id: 26, name: "Sarita", qual: "MA, BEd.", desig: "Lecturer", dept: "Department of Arts" },
    { id: 27, name: "Hidayatunnisa Begum", qual: "MA, B.Ed.", desig: "Lecturer", dept: "Department of Arts" },
    { id: 28, name: "Neha Khanam", qual: "MA, B.Ed.", desig: "Lecturer", dept: "Department of Arts" },
    { id: 29, name: "Dr. Md Mudassir", qual: "MA, B.Ed., Ph.D.", desig: "Lecturer", dept: "Department of Arts" },
    { id: 30, name: "Dr. Md Asad", qual: "MA, B.Ed., Ph.D., NET, SET, JRF, KSET.", desig: "Lecturer", dept: "Department of Arts" }
  ];

  // Clean data typos & format uniformly
  const sanitizedStaff = useMemo(() => {
    return teachingStaff.map(staff => ({
      ...staff,
      dept: staff.dept === "Department of Commrece" ? "Department of Commerce" : staff.dept
    }));
  }, []);

  // Extract unique departments for filters
  const departments = useMemo(() => {
    const sets = new Set(sanitizedStaff.map(s => s.dept));
    return ['All', ...Array.from(sets)];
  }, [sanitizedStaff]);

  // Handle live multi-filtering
  const filteredStaff = useMemo(() => {
    return sanitizedStaff.filter(staff => {
      const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            staff.qual.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            staff.desig.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || staff.dept === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept, sanitizedStaff]);

  // Mimic network load hook
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion configuration variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-24 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        <AnimatePresence mode="wait">
          {loading ? (
            /* Immersive Loading Screen */
            <motion.div 
              key="loader" 
              className="flex flex-col items-center justify-center py-48"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
            >
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-[3px] border-slate-200" />
                <div className="absolute inset-0 rounded-full border-[3px] border-blue-600 border-t-transparent animate-spin" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">
                Synchronizing Records
              </p>
            </motion.div>
          ) : (
            /* Main Dashboard Content Layout */
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Context Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight sm:text-4xl">
                    Faculty Roster
                  </h1>
                  <p className="mt-2 text-sm text-slate-500 max-w-xl">
                    Institutional registry detailing certified instructional personnel, administrative officers, and active departments.
                  </p>
                </div>
                
                {/* Real-time search bar */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="Search name, degree..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                  />
                  <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Dynamic Department Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border whitespace-nowrap transition-all duration-200 ${
                      selectedDept === dept
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm shadow-slate-900/10'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>

              {/* Interactive Data Table Shell */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/80">
                        <th className="px-6 py-7 text-[11px] font-bold uppercase tracking-wider text-yellow-700 w-20 text-center">Index</th>
                        <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-yellow-700">Academic Profile</th>
                        <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-yellow-700">Qualifications</th>
                        <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-yellow-700">Role</th>
                        <th className="px-6 py-4.5 text-[11px] font-bold uppercase tracking-wider text-yellow-700">Department Assignation</th>
                      </tr>
                    </thead>
                    <motion.tbody 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="divide-y divide-slate-100"
                    >
                      {filteredStaff.length > 0 ? (
                        filteredStaff.map((staff, idx) => (
                          <motion.tr
                            key={staff.id}
                            variants={rowVariants}
                            whileHover={{ 
                              y: -2,
                              scale: 1.005,
                              backgroundColor: "#ffffff",
                              boxShadow: "0 12px 24px -10px rgba(15, 23, 42, 0.08), 0 4px 12px -5px rgba(15, 23, 42, 0.03)",
                              zIndex: 1
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            className="relative bg-white transition-colors cursor-default"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-400 text-center">
                              {String(idx + 1).padStart(2, '0')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                              {staff.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title={staff.qual}>
                              {staff.qual}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-bold tracking-wide border ${
                                staff.desig.toLowerCase().includes('principal')
                                  ? 'bg-amber-50 text-amber-800 border-amber-200/60'
                                  : 'bg-indigo-50 text-indigo-700 border-indigo-100/80'
                              }`}>
                                {staff.desig}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold tracking-wider uppercase text-slate-400">
                              {staff.dept}
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        /* Empty State Container */
                        <tr>
                          <td colSpan="5" className="px-6 py-20 text-center">
                            <p className="text-sm font-medium text-slate-400">No faculty members match current filters.</p>
                          </td>
                        </tr>
                      )}
                    </motion.tbody>
                  </table>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default TeachingStaff;