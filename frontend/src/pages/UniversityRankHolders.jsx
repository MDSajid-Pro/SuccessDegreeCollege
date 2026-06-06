import React from "react";
import { motion } from "framer-motion";

const UniversityRankHolders = () => {
  // Premium dataset for Gulbarga University (GUG) Rank Holders
  const rankHolders = [
    {
      name: "Shabeena Kashaf",
      fatherName: "D/o Shafiuddin",
      regNo: "U04FK22S0015",
      stream: "B.Sc (CBZ)",
      rank: "1st Rank",
      percentage: "92.8%",
      year: "2024 - 2025",
      achievement: "Gold Medalist & University Topper"
    },
    {
      name: "Aliya Anjum",
      fatherName: "D/o Abdul Rasheed",
      regNo: "U04FK21S0021",
      stream: "B.Sc (CBZ)",
      rank: "1st Rank",
      percentage: "88.0%",
      year: "2023 - 2024",
      achievement: "Gold Medalist & University Topper"
    },
  ];

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section
      id="university-ranks"
      className="bg-slate-50 py-16 px-6 md:px-12 lg:px-24 pt-28 font-sans select-none text-slate-800 relative overflow-hidden"
    >
      {/* Decorative Branding Background Blobs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-fuchsia-100 rounded-full blur-3xl pointer-events-none opacity-40"></div>
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-yellow-100 rounded-full blur-3xl pointer-events-none opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- MAIN HEADER BLOCK --- */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-10 mb-12 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-fuchsia-900 via-red-600 to-yellow-400"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-fuchsia-900 uppercase block mb-1">
                Academic Laurels & Achievements
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
                University Rank Holders
              </h2>
              <p className="text-sm font-semibold text-red-700 uppercase tracking-wider mt-1">
                Affiliated to Gulbarga University, Kalaburagi
                          </p>
                          <p className="text-sm font-semibold text-red-700 uppercase tracking-wider mt-1">
                Affiliated to Bidar University, Bidar
              </p>
            </div>

            <div className="bg-fuchsia-50 border border-fuchsia-100 px-4 py-3 rounded-xl text-center md:text-right shrink-0">
              <span className="text-[10px] font-black text-fuchsia-800 uppercase tracking-wider block">Institution Status</span>
              <span className="text-sm font-extrabold text-fuchsia-950 block mt-0.5">Kalyan Karnataka Pride</span>
            </div>
          </div>
        </div>

        {/* --- PERFORMANCE HIGHLIGHT PANELS GRID --- */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {rankHolders.map((holder, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-fuchsia-300 hover:shadow-md transition-colors"
            >
              {/* Top Linear Highlight Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-fuchsia-800 to-fuchsia-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>

              {/* Card Meta Row Header */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="bg-pink-50 border border-pink-100 text-fuchsia-900 text-xs font-mono font-black px-3 py-1 rounded-lg shadow-2xs tracking-wide">
                    {holder.year}
                  </span>
                  
                  {/* High Contrast Rank Stamp */}
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-fuchsia-950 text-xs font-black px-3 py-1.5 rounded-lg shadow-2xs tracking-wider uppercase border border-yellow-300">
                    🏆 {holder.rank}
                  </div>
                </div>

                {/* Identity Cluster */}
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-fuchsia-950 transition-colors tracking-tight">
                    {holder.name}
                  </h3>
                  <p className="text-sm font-bold text-slate-600">
                    {holder.fatherName}
                  </p>
                  <p className="text-xs font-mono text-slate-400 tracking-wide">
                    Reg No: {holder.regNo}
                  </p>
                </div>

                <div className="w-12 h-0.5 bg-slate-100 my-4"></div>

                {/* Stream / Department Details */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Academic Program</span>
                  <p className="text-sm font-extrabold text-slate-800 tracking-wide">{holder.stream}</p>
                </div>
              </div>

              {/* Score Matrix & Special Medals Row Footer */}
              <div className="mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[9px] font-black text-red-600 uppercase tracking-widest block">{holder.achievement}</span>
                  <span className="text-[11px] font-bold text-slate-400 block mt-0.5 truncate">Gulbarga University Convocation</span>
                </div>
                
                {/* Aggregate Percentage Token Badge */}
                <div className="bg-fuchsia-900 text-white px-3.5 py-2 rounded-xl text-center shrink-0 border border-fuchsia-950 shadow-sm">
                  <span className="text-[9px] text-fuchsia-300 font-bold uppercase tracking-wider block leading-none">Aggregate</span>
                  <span className="text-base font-black font-mono block mt-1 leading-none">{holder.percentage}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* --- FOOTER INSPIRATIONAL SUMMARY BLOCK --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-fuchsia-950 text-white p-6 rounded-2xl shadow-sm text-center relative overflow-hidden"
        >
          <p className="text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed text-fuchsia-100">
            "Our university rank holders stand as a testament to the dedication of our faculty members and the persistent academic drive nurtured at Success Degree College. They inspire generations to conquer heights."
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default UniversityRankHolders;