import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {
  GraduationCap,
  Megaphone,
  Image as ImageIcon,
  LogOut,
  Plus,
  TrendingUp,
  Users,
  Bell,
  ArrowRight,
  Activity,
  Calendar
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, setToken, navigate } = useAppContext();
  const [stats, setStats] = useState({
    results: 0,
    notices: 0,
    images: 0,
    students: 1200 // Static as per your code
  });
  const [recentNotices, setRecentNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DASHBOARD DATA ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resultsRes, noticesRes, imagesRes] = await Promise.all([
          axios.get('/api/results'),
          axios.get('/api/notices'),
          axios.get('/api/image/all')
        ]);

        setStats({
          results: resultsRes.data.length,
          notices: noticesRes.data.length,
          images: imagesRes.data.success ? imagesRes.data.images.length : 0,
          students: 1240 
        });

        const sortedNotices = noticesRes.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentNotices(sortedNotices.slice(0, 3)); // Increased to 4 for better UI fill
        
        setLoading(false);
      } catch (error) {
        console.error("Dashboard Error:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axios]);

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")){
        localStorage.removeItem('token');
        setToken(null);
        navigate('/'); 
        toast.success("Logged out successfully");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      
      {/* --- TOP HEADER --- */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
           <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                 A
               </div>
               <div>
                   <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Console</h1>
               </div>
           </div>
           
           <div className="flex items-center gap-4">
               {/* Logout Button */}
               <button 
                   onClick={handleLogout}
                   className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 border border-transparent hover:border-red-100"
                   title="Logout"
               >
                   <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                   <span className="hidden sm:inline">Sign Out</span>
               </button>

               <div className="h-8 w-px bg-slate-200 mx-1"></div>

               <div className="flex items-center gap-3">
                   <div className="text-right hidden sm:block">
                       <p className="text-sm font-bold text-slate-900">Administrator</p>
                       <p className="text-xs text-slate-500">Super User</p>
                   </div>
                   <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold ring-4 ring-white shadow-sm">
                       AD
                   </div>
               </div>
           </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-500">
           
           {/* Welcome Banner */}
           <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h2>
                <p className="text-indigo-100 max-w-xl">Here's what's happening at Success Degree College today. Check your stats and manage recent updates.</p>
              </div>
              <Activity className="absolute right-0 bottom-0 text-white/10 w-64 h-64 -mb-16 -mr-16 rotate-12" />
           </div>

           {/* 1. STATS GRID */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <StatCard 
                   title="Total Results" 
                   count={stats.results} 
                   icon={<GraduationCap size={24} />} 
                   color="text-blue-600 bg-blue-50 border-blue-100" 
                   trend="+12% vs last month"
               />
               <StatCard 
                   title="Active Notices" 
                   count={stats.notices} 
                   icon={<Megaphone size={24} />} 
                   color="text-orange-600 bg-orange-50 border-orange-100" 
                   trend="Updated just now"
               />
               <StatCard 
                   title="Gallery Images" 
                   count={stats.images} 
                   icon={<ImageIcon size={24} />} 
                   color="text-purple-600 bg-purple-50 border-purple-100" 
                   trend="5 added this week"
               />
               <StatCard 
                   title="Total Students" 
                   count={stats.students} 
                   icon={<Users size={24} />} 
                   color="text-emerald-600 bg-emerald-50 border-emerald-100" 
                   trend="Current Batch"
               />
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               
               {/* 2. QUICK ACTIONS */}
               <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                        <TrendingUp size={22} className="text-indigo-600"/> Management Center
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <ActionCard 
                          to="/admin/result"
                          title="Publish Result"
                          desc="Upload exam results for students"
                          icon={<GraduationCap size={24} />}
                          color="hover:border-blue-300 hover:shadow-blue-500/10 group-hover:bg-blue-600"
                          iconColor="text-blue-600 bg-blue-50"
                       />
                       <ActionCard 
                          to="/admin/notice"
                          title="Create Notice"
                          desc="Broadcast updates to the college"
                          icon={<Megaphone size={24} />}
                          color="hover:border-orange-300 hover:shadow-orange-500/10 group-hover:bg-orange-600"
                          iconColor="text-orange-600 bg-orange-50"
                       />
                       <ActionCard 
                          to="/admin/addImages"
                          title="Upload Media"
                          desc="Add photos to the gallery"
                          icon={<ImageIcon size={24} />}
                          color="hover:border-purple-300 hover:shadow-purple-500/10 group-hover:bg-purple-600"
                          iconColor="text-purple-600 bg-purple-50"
                       />
                       <ActionCard 
                          to="/admin/manage-admission"
                          title="Admissions"
                          desc="Review new student applications"
                          icon={<Users size={24} />}
                          color="hover:border-emerald-300 hover:shadow-emerald-500/10 group-hover:bg-emerald-600"
                          iconColor="text-emerald-600 bg-emerald-50"
                       />
                  </div>
               </div>

               {/* 3. RECENT ACTIVITY (NOTICES) */}
               <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                   <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                       <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                           <Bell size={20} className="text-orange-500"/> Recent Updates
                       </h3>
                       <Link to="/admin/notice" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1">
                          View All <ArrowRight size={12}/>
                       </Link>
                   </div>
                   
                   <div className="p-2 flex-1 overflow-y-auto">
                       {loading ? (
                           <div className="flex flex-col items-center justify-center h-40 text-slate-400 gap-2">
                              <div className="w-6 h-6 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin"></div>
                              <span className="text-sm">Syncing data...</span>
                           </div>
                       ) : recentNotices.length > 0 ? (
                           recentNotices.map((notice, index) => (
                               <div key={notice._id} className="group p-4 rounded-xl hover:bg-slate-50 transition-colors flex gap-4 mb-1">
                                   <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
                                        <span className="text-xs font-bold text-slate-500 uppercase">
                                            {new Date(notice.date).toLocaleString('default', { month: 'short' })}
                                        </span>
                                        <span className="text-lg font-bold text-slate-900 leading-none">
                                            {new Date(notice.date).getDate()}
                                        </span>
                                   </div>
                                   <div className="flex-1 min-w-0">
                                       <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                                                notice.category === 'Exams' ? 'bg-red-100 text-red-700' : 
                                                notice.category === 'Events' ? 'bg-orange-100 text-orange-700' : 
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {notice.category}
                                            </span>
                                       </div>
                                       <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                                           {notice.title}
                                       </h4>
                                       <p className="text-xs text-slate-500 mt-0.5 truncate">
                                           Posted by Admin
                                       </p>
                                   </div>
                               </div>
                           ))
                       ) : (
                           <div className="text-center py-10 text-slate-400 text-sm">
                               <Bell size={32} className="mx-auto mb-2 opacity-20"/>
                               No recent notices found.
                           </div>
                       )}
                   </div>
                   <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400">System updated today at 9:00 AM</p>
                   </div>
               </div>
           </div>
      </main>
    </div>
  );
};

// --- MODERN SUB-COMPONENTS ---

const StatCard = ({ title, count, icon, color, trend }) => {
    return (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${color}`}>
                    {icon}
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={12} /> +2.5%
                </span>
            </div>
            <div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{count}</h3>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-xs text-slate-400 mt-2">{trend}</p>
            </div>
        </div>
    );
};

const ActionCard = ({ to, title, desc, icon, color, iconColor }) => {
    return (
        <Link to={to} className={`group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 ${color} flex items-center gap-4`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:text-white group-hover:bg-white/20 ${iconColor}`}>
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{title}</h4>
                <p className="text-xs text-slate-500">{desc}</p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <Plus size={16} className="text-slate-600"/>
                </div>
            </div>
        </Link>
    )
}

export default Dashboard;