import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Image as ImageIcon, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  GraduationCap, 
  Bell, 
  Search,
  Settings
} from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className=" min-w-auto bg-slate-50  font-sans text-slate-900">
      {/* --- MAIN CONTENT AREA --- */}
      <div className=" flex-auto flex-col  overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800 hidden sm:block">Dashboard Overview</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar (Visual Only) */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-slate-700 placeholder:text-slate-400"
              />
            </div>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Administrator</p>
                <p className="text-xs text-slate-500">admin@college.edu</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-700 font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
            {/* THIS IS WHERE YOUR 'ListImages' or OTHER COMPONENTS WILL RENDER 
               If using Nested Routes, put <Outlet /> here.
               For now, I'll show a default "Home" view below.
            */}
            <DashboardHome /> 
        </main>

      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// --- SUB-COMPONENT: The Default Home View ---
const DashboardHome = () => {
  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Admin! 👋</h2>
          <p className="text-blue-100 mt-1">Here's what's happening at Success Degree College today.</p>
        </div>
        <button className="px-5 py-2.5 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition-colors text-sm">
          + Add New Notice
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="1,240" icon={<Users className="text-blue-600" />} change="+12% this month" />
        <StatCard title="Gallery Images" value="48" icon={<ImageIcon className="text-purple-600" />} change="Updated today" />
        <StatCard title="Applications" value="156" icon={<FileText className="text-orange-600" />} change="Pending review" />
        <StatCard title="Faculty" value="64" icon={<GraduationCap className="text-green-600" />} change="Active staff" />
      </div>

      {/* Recent Activity / Quick Links */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
             <Link to="/admin/addImages" className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors flex flex-col items-center gap-2 text-center border border-blue-100">
                <ImageIcon size={24} className="text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Upload Photos</span>
             </Link>
             <Link to="/admin/notice" className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors flex flex-col items-center gap-2 text-center border border-purple-100">
                <Bell size={24} className="text-purple-600" />
                <span className="text-sm font-semibold text-purple-800">Post Notice</span>
             </Link>
          </div>
        </div>

        {/* System Status (Visual Filler) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Server Status</span>
              <span className="text-green-600 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Online</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Database Connection</span>
              <span className="text-green-600 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Connected</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

// --- HELPER COMPONENT: Stat Card ---
const StatCard = ({ title, value, icon, change }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
        {icon}
      </div>
    </div>
    <div className="text-xs font-medium text-slate-500">
      {change}
    </div>
  </div>
);

export default AdminDashboard;