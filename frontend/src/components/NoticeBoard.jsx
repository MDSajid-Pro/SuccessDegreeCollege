import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import {
  Bell,
  FileText,
  Megaphone,
  Pin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Helper to get icon based on category
const getIcon = (category) => {
  switch (category) {
    case "Exams":
      return <FileText size={20} className="text-red-500" />;
    case "Events":
      return <Megaphone size={20} className="text-orange-500" />;
    case "Admissions":
      return <Pin size={20} className="text-purple-500" />;
    default:
      return <Bell size={20} className="text-blue-500" />;
  }
};

const NoticeBoard = () => {
  const { axios } = useAppContext();

  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  
  // --- MODAL STATE ---
  // We store the specific notice object here. If null, modal is closed.
  const [selectedNotice, setSelectedNotice] = useState(null);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch data
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("/api/notices");
        setNotices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notices:", error);
        setLoading(false);
      }
    };

    fetchNotices();
  }, [axios]);

  // Reset to Page 1 when Tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Helper to format MongoDB Date
  const formatDate = (dateString) => {
    if (!dateString) return { month: "---", day: "--", full: "No Date" };
    const date = new Date(dateString);
    if (isNaN(date.getTime()))
      return { month: "ERR", day: "!!", full: "Invalid Format" };

    return {
      month: date.toLocaleString("default", { month: "short" }),
      day: date.getDate().toString().padStart(2, "0"),
      full: date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // 1. Filter Logic
  const filteredNotices =
    activeTab === "All"
      ? notices
      : notices.filter((n) => n.category === activeTab);

  // 2. Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // --- CLICK HANDLER ---
  const handleNoticeClick = (notice) => {
    // Check if link exists (checks for null, undefined, or empty string)
    if (notice.link) {
      window.open(notice.link, "_blank", "noopener,noreferrer");
    } else {
      // Set the specific notice that failed so the modal can display its title
      setSelectedNotice(notice);
    }
  };

  return (
    <section className="py-20 bg-gray-50 font-sans relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
              Stay Updated
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Notice <span className="text-blue-600">Board</span>
            </h2>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
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
              <p className="text-center py-10 text-gray-400">
                Loading notices...
              </p>
            ) : filteredNotices.length > 0 ? (
              currentNotices.map((notice) => {
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
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                            notice.category === "Exams"
                              ? "bg-red-50 text-red-600 border-red-100"
                              : notice.category === "Events"
                              ? "bg-orange-50 text-orange-600 border-orange-100"
                              : "bg-blue-50 text-blue-600 border-blue-100"
                          }`}
                        >
                          {notice.category}
                        </span>
                      </div>
                      
                      {/* --- The Trigger (Your Title) --- */}
                      <button
                        onClick={() => handleNoticeClick(notice)}
                        className="text-left w-full focus:outline-none"
                      >
                        <h4 className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors line-clamp-1">
                          {notice.title}
                        </h4>
                      </button>

                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {/* If you have description, put it here: {notice.description} */}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 sm:hidden">
                        {dateObj.full}
                      </p>
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

          {/* PAGINATION FOOTER */}
          {filteredNotices.length > itemsPerPage && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full border transition-all ${
                  currentPage === 1
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-600 border-gray-300 hover:bg-white hover:text-blue-600 shadow-sm"
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              <span className="text-sm font-semibold text-gray-500">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full border transition-all ${
                  currentPage === totalPages
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-600 border-gray-300 hover:bg-white hover:text-blue-600 shadow-sm"
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- THE GLOBAL MODAL (Rendered conditionally) --- */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 transform transition-all scale-100">
            {/* Modal Icon & Header */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Link Unavailable
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Sorry, the document or link for{" "}
                <span className="font-semibold text-gray-700">
                  "{selectedNotice.title}"
                </span>{" "}
                is currently missing or invalid.
              </p>
            </div>

            {/* Modal Action Button */}
            <button
              onClick={() => setSelectedNotice(null)} // Close modal
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default NoticeBoard;