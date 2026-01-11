import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {

  return (
    <div className='flex flex-col bg-white border-r border-gray-200 min-h-screen pt-6'>
        
        {/* --- MENU ITEMS --- */}
        <div className='flex-1'>
            <NavLink end={true} to='/admin' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-100'}`}>
                <img src={assets.home_icon} alt="Logo" className="min-w-4 w-5" />
                <p className='hidden md:inline-block'>Dashboard</p>
            </NavLink>

            <NavLink to='/admin/addImages' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-100'}`}>
                <img src={assets.add_icon} alt="Logo" className="min-w-4 w-5" />
                <p className='hidden md:inline-block'>Add Images</p>
            </NavLink>

            <NavLink to='/admin/imageList' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-100'}`}>
                <img src={assets.list_icon} alt="Logo" className="min-w-4 w-5" />
                <p className='hidden md:inline-block'>Image List</p>
              </NavLink>
              
              <NavLink to='/admin/manage-faculty' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-100'}`}>
                <img src={assets.list_icon} alt="Logo" className="min-w-4 w-5" />
                <p className='hidden md:inline-block'>Add Faculty</p>
            </NavLink>

            <NavLink to='/admin/notice' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-100'}`}>
                <img src={assets.add_icon} alt="Logo" className="min-w-4 w-5" />
                <p className='hidden md:inline-block'>Add Notice</p>
            </NavLink>

            <NavLink to='/admin/result' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-100'}`}>
                <img src={assets.add_icon} alt="Logo" className="min-w-4 w-5" />
                <p className='hidden md:inline-block'>Add Result</p>
              </NavLink>
              
              <NavLink to='/admin/manage-admission' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-100'}`}>
                <img src={assets.list_icon} alt="Logo" className="min-w-4 w-5" />
                <p className='hidden md:inline-block'>Admission List</p>
              </NavLink>
              
            <NavLink to='/admin/subscribers' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer transition-colors ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : 'hover:bg-gray-100'}`}>
                <img src={assets.comment_icon} alt="Logo" className="min-w-4 w-5" />
                <p className='hidden md:inline-block'>Subscribers</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar