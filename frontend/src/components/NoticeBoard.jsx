import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext"; // 1. Import AppContext
import { 
  Bell, FileText, Megaphone, Pin 
} from "lucide-react";

// Helper to get icon based on category
const getIcon = (category) => {
  switch(category) {
    case 'Exams': return <FileText size={20} className="text-red-500" />;
    case 'Events': return <Megaphone size={20} className="text-orange-500" />;
    case 'Admissions': return <Pin size={20} className="text-purple-500" />;
    default: return <Bell size={20} className="text-blue-500" />;
  }
};

const NoticeBoard = () => { 
  // 2. Get axios from Context
  const { axios } = useAppContext();

  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  // 3. Fetch data using Context Axios
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // Use relative path; baseURL is handled by AppContext
        const response = await axios.get('/api/notices');
        setNotices(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notices:", error);
        setLoading(false);
      }
    };

    fetchNotices();
  }, [axios]); // Add axios to dependency array

  // Helper to format MongoDB Date
  const formatDate = (dateString) => {
    if (!dateString) return { month: '---', day: '--', full: 'No Date' };

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return { month: 'ERR', day: '!!', full: 'Invalid Format' };
    }

    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate().toString().padStart(2, '0'),
      full: date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    };
  };

  const filteredNotices = activeTab === "All" 
    ? notices 
    : notices.filter(n => n.category === activeTab);

  return (
    <section className="py-20 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Notice <span className="text-blue-600">Board</span>
            </h2>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
           
           {/* Tabs */}
           <div className="flex items-center gap-2 p-2 bg-gray-50 border-b border-gray-100 overflow-x-auto">
             {["All", "Exams", "Events", "News", "Admissions"].map((tab) => (
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

           {/* List */}
           <div className="overflow-y-auto p-4 space-y-3 custom-scrollbar flex-grow">
             {loading ? (
                <p className="text-center py-10 text-gray-400">Loading notices...</p>
             ) : filteredNotices.length > 0 ? (
               filteredNotices.map((notice) => {
                 const dateObj = formatDate(notice.date);
                 
                 return (
                   <div 
                     key={notice._id} 
                     className="group flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all cursor-pointer bg-white"
                   >
                     {/* Date Box */}
                     <div className="hidden sm:flex flex-col items-center justify-center min-w-[70px] bg-gray-50 rounded-lg p-2 border border-gray-100 group-hover:bg-white group-hover:border-blue-100 transition-colors">
                        <span className="text-xs font-bold text-gray-400 uppercase">
                           {dateObj.month}
                        </span>
                        <span className="text-xl font-bold text-gray-800">
                           {dateObj.day}
                        </span>
                     </div>

                     <div className="flex-grow">
                       <div className="flex items-center gap-2 mb-1">
                         <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                           notice.category === 'Exams' ? 'bg-red-50 text-red-600 border-red-100' :
                           notice.category === 'Events' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                           'bg-blue-50 text-blue-600 border-blue-100'
                         }`}>
                           {notice.category}
                         </span>
                       </div>
                       
                       <h4 className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors line-clamp-1">
                         {notice.title}
                       </h4>
                       <p className="text-sm text-gray-500 mt-1 sm:hidden">{dateObj.full}</p>
                     </div>

                     <div className="h-full flex items-center">
                         <div className="p-2 text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-100 rounded-full transition-all">
                            {getIcon(notice.category)}
                         </div>
                     </div>
                   </div>
                 );
               })
             ) : (
               <div className="text-center py-20 text-gray-400">
                 <p>No notices found in this category.</p>
               </div>
             )}
           </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default NoticeBoard;