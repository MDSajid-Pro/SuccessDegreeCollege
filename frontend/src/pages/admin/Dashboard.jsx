import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import {
  GraduationCap,
  Megaphone,
  Image as ImageIcon,
  LogOut,
  TrendingUp,
  Users,
  Bell,
  ArrowRight,
  Activity,
  UserCheck,
  Calendar,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, setToken, navigate } = useAppContext();
  
  // State
  const [stats, setStats] = useState({
    results: 0,
    notices: 0,
    images: 0,
    faculty: 0,
  });
  const [recentNotices, setRecentNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Welcome back");

  // Time-based Greeting Logic
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resultsRes, noticesRes, imagesRes, facultyRes] = await Promise.all([
          axios.get('/api/results'),
          axios.get('/api/notices'),
          axios.get('/api/image/all'),
          axios.get('/api/faculty')
        ]);

        setStats({
          results: resultsRes.data.length || 0,
          notices: noticesRes.data.length || 0,
          images: imagesRes.data.success ? imagesRes.data.images.length : 0,
          faculty: facultyRes.data.success ? facultyRes.data.faculty.length : 0, 
        });

        const sortedNotices = noticesRes.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentNotices(sortedNotices.slice(0, 4)); 
        
        // Add a small artificial delay for the skeleton animation to look smooth
        setTimeout(() => setLoading(false), 600);
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
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-indigo-100 selection:text-indigo-700 pt-20">
      
      {/* --- GLASS HEADER --- */}
      <header className="bg-white/70 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
           <div className="flex items-center gap-3">
               <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                 <div className="relative w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                   A
                 </div>
               </div>
               <div>
                   <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin<span className="text-indigo-600">Console</span></h1>
               </div>
           </div>
           
           <div className="flex items-center gap-6">
               <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-full border border-slate-200/50">
                 <Calendar size={14} className="text-slate-400" />
                 <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
               </div>

               <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

               <button 
                   onClick={handleLogout}
                   className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200 border border-transparent hover:border-red-100"
                   title="Logout"
               >
                   <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                   <span className="hidden sm:inline">Sign Out</span>
               </button>
           </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
           
           {/* Welcome Banner */}
           <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl shadow-indigo-900/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div>
                 <div className="flex items-center gap-2 text-indigo-300 font-medium mb-2">
                   <Clock size={16} />
                   <span>{greeting}, Admin</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">Here's your daily <br/>college overview.</h2>
                 <p className="text-slate-300 max-w-xl text-lg">Manage results, notices, and faculty data all in one place. You have <span className="text-white font-bold border-b-2 border-indigo-500">{stats.notices} active notices</span> today.</p>
               </div>
               <div className="hidden lg:block relative">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                    <Activity size={40} className="text-indigo-400" />
                  </div>
               </div>
             </div>
             {/* Decorative Background Circles */}
             <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl"></div>
             <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
           </div>

           {/* 1. STATS GRID */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {loading ? (
                 // Loading Skeletons
                 [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
               ) : (
                 <>
                   <StatCard 
                       title="Exam Results" 
                       count={stats.results} 
                       icon={<GraduationCap size={24} />} 
                       color="text-blue-600 bg-blue-50 border-blue-100" 
                       trend="+12% vs last term"
                       trendUp={true}
                       delay="0"
                   />
                   <StatCard 
                       title="Active Notices" 
                       count={stats.notices} 
                       icon={<Megaphone size={24} />} 
                       color="text-orange-600 bg-orange-50 border-orange-100" 
                       trend="Updated just now"
                       trendUp={true}
                       delay="100"
                   />
                   <StatCard 
                       title="Gallery Media" 
                       count={stats.images} 
                       icon={<ImageIcon size={24} />} 
                       color="text-purple-600 bg-purple-50 border-purple-100" 
                       trend="5 added this week"
                       trendUp={true}
                       delay="200"
                   />
                   <StatCard 
                       title="Faculty Members" 
                       count={stats.faculty} /* FIXED: changed from stats.facultys */
                       icon={<UserCheck size={24} />} 
                       color="text-emerald-600 bg-emerald-50 border-emerald-100" 
                       trend="Full Strength"
                       trendUp={true}
                       delay="300"
                   />
                 </>
               )}
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               
               {/* 2. QUICK ACTIONS */}
               <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                 <div className="flex items-center justify-between">
                   <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                       <TrendingUp size={22} className="text-indigo-600"/> Management Center
                   </h3>
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <ActionCard 
                         to="/admin/result"
                         title="Publish Results"
                         desc="Upload and manage student exam scores."
                         icon={<GraduationCap size={28} />}
                         accent="blue"
                      />
                      <ActionCard 
                         to="/admin/notice"
                         title="Create Notice"
                         desc="Broadcast important updates to students."
                         icon={<Megaphone size={28} />}
                         accent="orange"
                      />
                      <ActionCard 
                         to="/admin/addImages"
                         title="Upload Media"
                         desc="Manage campus gallery and event photos."
                         icon={<ImageIcon size={28} />}
                         accent="purple"
                      />
                      <ActionCard 
                         to="/admin/manage-admission"
                         title="Admissions"
                         desc="Review new student applications."
                         icon={<Users size={28} />}
                         accent="emerald"
                      />
                 </div>
               </div>

               {/* 3. RECENT ACTIVITY (NOTICES) */}
               <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                   <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-gradient-to-b from-white to-slate-50/50">
                       <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                           <Bell size={20} className="text-orange-500 fill-orange-500/20"/> Recent Updates
                       </h3>
                       <Link to="/admin/notice" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 group">
                         View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
                       </Link>
                   </div>
                   
                   <div className="p-2 flex-1 overflow-y-auto custom-scrollbar">
                       {loading ? (
                           // Loading State for Notices
                           <div className="space-y-4 p-4">
                               {[1,2,3].map(i => (
                                   <div key={i} className="flex gap-4 animate-pulse">
                                       <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                                       <div className="flex-1 space-y-2">
                                           <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                           <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       ) : recentNotices.length > 0 ? (
                           <div className="space-y-1">
                               {recentNotices.map((notice, index) => (
                                   <div key={notice._id} className="group p-4 rounded-xl hover:bg-blue-50/50 transition-all duration-200 cursor-default border border-transparent hover:border-blue-100/50">
                                       <div className="flex gap-4">
                                           <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-2xl shadow-sm text-center group-hover:shadow-md transition-shadow">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                    {new Date(notice.date).toLocaleString('default', { month: 'short' })}
                                                </span>
                                                <span className="text-lg font-black text-slate-800 leading-none">
                                                    {new Date(notice.date).getDate()}
                                                </span>
                                           </div>
                                           <div className="flex-1 min-w-0 pt-0.5">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                     <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${
                                                         notice.category === 'Exams' ? 'bg-red-50 text-red-600 border-red-100' : 
                                                         notice.category === 'Events' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                                                         'bg-blue-50 text-blue-600 border-blue-100'
                                                     }`}>
                                                         {notice.category}
                                                     </span>
                                                </div>
                                                <h4 className="text-sm font-bold text-slate-700 truncate group-hover:text-indigo-600 transition-colors">
                                                    {notice.title}
                                                </h4>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    Posted by Admin
                                                </p>
                                           </div>
                                       </div>
                                   </div>
                               ))}
                           </div>
                       ) : (
                           <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-sm">
                               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                   <Bell size={24} className="opacity-40"/>
                               </div>
                               No recent notices found.
                           </div>
                       )}
                   </div>
               </div>
           </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

// --- MODERN SUB-COMPONENTS ---

// 1. Animated Stat Card with entry delay
const StatCard = ({ title, count, icon, color, trend, trendUp, delay }) => {
    return (
        <div 
            className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3.5 rounded-2xl ${color} shadow-sm`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border ${trendUp ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        <TrendingUp size={12} className={!trendUp && "rotate-180"} /> {trend}
                    </span>
                )}
            </div>
            <div>
                <h3 className="text-3xl font-black text-slate-800 mb-1 tracking-tight">{count}</h3>
                <p className="text-sm font-semibold text-slate-500">{title}</p>
            </div>
        </div>
    );
};

// 2. Action Card with Color Accents
const ActionCard = ({ to, title, desc, icon, accent }) => {
    const accents = {
        blue: "group-hover:bg-blue-600 text-blue-600 bg-blue-50",
        orange: "group-hover:bg-orange-600 text-orange-600 bg-orange-50",
        purple: "group-hover:bg-purple-600 text-purple-600 bg-purple-50",
        emerald: "group-hover:bg-emerald-600 text-emerald-600 bg-emerald-50",
    };
    
    const borders = {
        blue: "hover:border-blue-200 hover:shadow-blue-500/10",
        orange: "hover:border-orange-200 hover:shadow-orange-500/10",
        purple: "hover:border-purple-200 hover:shadow-purple-500/10",
        emerald: "hover:border-emerald-200 hover:shadow-emerald-500/10",
    };

    return (
        <Link to={to} className={`group relative overflow-hidden bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 ${borders[accent]}`}>
            <div className="flex items-start gap-5 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${accents[accent]} group-hover:text-white`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-indigo-900 transition-colors">{title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
                </div>
                <div className="self-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                     <ArrowRight size={20} className="text-slate-300" />
                </div>
            </div>
        </Link>
    )
}

// 3. Loading Skeleton Card
const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-100 animate-pulse">
        <div className="flex justify-between mb-4">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl"></div>
            <div className="w-16 h-6 bg-slate-100 rounded-full"></div>
        </div>
        <div className="space-y-2">
            <div className="h-8 bg-slate-100 rounded w-12"></div>
            <div className="h-4 bg-slate-100 rounded w-24"></div>
        </div>
    </div>
);

export default Dashboard;