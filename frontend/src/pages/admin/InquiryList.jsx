import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext'; 
import { Toaster } from 'react-hot-toast'; // Assuming you are using this based on previous context

const InquiryList = () => {
  // Pulling everything from Context
  const { inquiries, fetchInquiries, updateInquiry, deleteInquiry } = useAppContext();

  // Load data on mount
  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to permanently delete this inquiry?")) {
      deleteInquiry(id);
    }
  }

  // Helper for Status Colors (Modern Palette)
  const getStatusStyle = (status) => {
    switch(status) {
        case 'Done': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
        case 'Contacted': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'Not Done': return 'bg-rose-100 text-rose-700 border-rose-200';
        default: return 'bg-amber-100 text-amber-700 border-amber-200'; // Pending
    }
  }

  // --- SUB-COMPONENTS ---

  // 1. Mobile Card Component (Visible < md)
  const InquiryCard = ({ item }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{item.fullName}</h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="bg-gray-100 p-1 rounded-full">
              <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </span>
            {item.phone}
          </p>
        </div>
        
        {/* Course Badge */}
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wide">
          {item.course}
        </span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-1">
        {/* Status Dropdown */}
        <div className="relative">
          <select 
            value={item.status || 'Pending'}
            onChange={(e) => updateInquiry(item._id, { status: e.target.value })}
            className={`appearance-none cursor-pointer pl-3 pr-8 py-1.5 text-xs font-bold rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-1 ${getStatusStyle(item.status)}`}
          >
             <option value="Pending">Pending</option>
             <option value="Contacted">Contacted</option>
             <option value="Done">Done</option>
             <option value="Not Done">Not Done</option>
          </select>
          {/* Custom Chevron */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Delete Button */}
        <button 
          onClick={() => handleDelete(item._id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <div className="w-screen bg-gray-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Inquiries Dashboard</h2>
            <p className="text-gray-500 text-sm mt-1">Manage your student leads and application status.</p>
          </div>
          <button 
            onClick={fetchInquiries} 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 hover:text-blue-600 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Refresh Data
          </button>
        </div>

        {/* Content Area */}
        {inquiries && inquiries.length > 0 ? (
          <>
            {/* 1. MOBILE VIEW (Grid of Cards) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {inquiries.map((item) => (
                <InquiryCard key={item._id} item={item} />
              ))}
            </div>

            {/* 2. DESKTOP VIEW (Table) */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inquiries.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50/80 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative inline-block">
                          <select 
                            value={item.status || 'Pending'}
                            onChange={(e) => updateInquiry(item._id, { status: e.target.value })}
                            className={`appearance-none cursor-pointer pl-3 pr-8 py-1 text-xs font-bold rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-1 ${getStatusStyle(item.status)}`}
                          >
                             <option value="Pending">Pending</option>
                             <option value="Contacted">Contacted</option>
                             <option value="Done">Done</option>
                             <option value="Not Done">Not Done</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{item.fullName}</div>
                        {/* Optional: Add Date here if available */}
                        {/* <div className="text-xs text-gray-400">Added today</div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {item.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
                           {item.course}
                         </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                          title="Delete Record"
                        >
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <h3 className="text-lg font-medium text-gray-900">No inquiries found</h3>
             <p className="text-gray-500 text-sm mt-1">Wait for students to submit the form.</p>
             <button onClick={fetchInquiries} className="mt-4 text-blue-600 hover:underline text-sm font-medium">Refresh again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryList;