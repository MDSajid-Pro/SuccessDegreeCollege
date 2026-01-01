import React, { useState } from "react";
import { 
  Bell, 
  Calendar, 
  FileText, 
  Megaphone, 
  ArrowRight, 
  Pin,
  Download
} from "lucide-react";

// --- 1. MOCK DATA ---
const notices = [
  {
    id: 1,
    category: "Exams",
    title: "Final Semester Examination Timetable 2026",
    date: "Jan 02, 2026",
    isNew: true,
    link: "#",
    icon: <FileText size={20} className="text-red-500" />
  },
  {
    id: 2,
    category: "Events",
    title: "Annual Cultural Fest 'Sanskriti 2026' Registration Open",
    date: "Dec 30, 2025",
    isNew: true,
    link: "#",
    icon: <Megaphone size={20} className="text-orange-500" />
  },
  {
    id: 3,
    category: "News",
    title: "Guest Lecture on AI by Dr. S. Rao (IIT Bombay)",
    date: "Dec 28, 2025",
    isNew: false,
    link: "#",
    icon: <Bell size={20} className="text-blue-500" />
  },
  {
    id: 4,
    category: "Admissions",
    title: "B.Sc & BCA Admissions Open for Batch 2026-27",
    date: "Dec 25, 2025",
    isNew: false,
    link: "#",
    icon: <Pin size={20} className="text-purple-500" />
  },
  {
    id: 5,
    category: "Exams",
    title: "Re-evaluation Results Declared (B.Com Sem 4)",
    date: "Dec 20, 2025",
    isNew: false,
    link: "#",
    icon: <FileText size={20} className="text-red-500" />
  },
];

const NoticeBoard = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Filter logic
  const filteredNotices = activeTab === "All" 
    ? notices 
    : notices.filter(n => n.category === activeTab);

  return (
    <section className="py-20 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- TITLE SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Notice <span className="text-blue-600">Board</span>
            </h2>
          </div>
          
          {/* Flash News Ticker (Horizontal) */}
          <div className="w-full  bg-red-50 border border-red-100 text-red-700 px-2 py-2 rounded-lg flex items-center gap-3 overflow-hidden">
            <span className="font-bold text-xs uppercase bg-red-600 text-white px-2 py-0.5 rounded animate-pulse shrink-0">
              Urgent
            </span>
            <div className="whitespace-nowrap overflow-hidden w-full">
              <p className="animate-marquee inline-block text-sm font-medium">
                College will remain closed on Jan 15th due to Pongal Holiday  •  Scholarship applications closing soon  •  Library hours extended for exam week.
              </p>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid lg:grid-cols-3 gap-8 h-auto lg:h-[500px]">

          {/* RIGHT: Interactive Tabbed Notice List */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-100 overflow-x-auto">
              {["All", "Exams", "Events", "News"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab 
                      ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-100" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Scrollable List */}
            <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar flex-grow">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <div 
                    key={notice.id} 
                    className="group flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer bg-white"
                  >
                    {/* Date Box */}
                    <div className="hidden sm:flex flex-col items-center justify-center min-w-[70px] bg-gray-50 rounded-lg p-2 border border-gray-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
                      <span className="text-xs font-bold text-gray-400 uppercase">{notice.date.split(' ')[0]}</span>
                      <span className="text-xl font-bold text-gray-800">{notice.date.split(' ')[1].replace(',','')}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                          notice.category === 'Exams' ? 'bg-red-50 text-red-600 border-red-100' :
                          notice.category === 'Events' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {notice.category}
                        </span>
                        {notice.isNew && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors line-clamp-1">
                        {notice.title}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 sm:hidden">{notice.date}</p>
                    </div>

                    {/* Action Icon */}
                    <div className="h-full flex items-center">
                       <div className="p-2 text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-100 rounded-full transition-all">
                          {notice.category === 'Exams' || notice.category === 'Admissions' ? <Download size={18} /> : <ArrowRight size={18} />}
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-gray-400">
                  <p>No notices found in this category.</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Tailwind Custom Animation for Marquee */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default NoticeBoard;