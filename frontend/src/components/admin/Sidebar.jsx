
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
      <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
          <NavLink end={true} to='/admin' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-blue-100 border-r-4 border-blue-500 '}`}>
              <img src={assets.home_icon} alt="Logo" className="min-w-4 w-5" />
              <p className='hidden md:inline-block'>Dashboard</p>
          </NavLink>

          <NavLink to='/admin/addImages' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-blue-100 border-r-4 border-blue-500 '}`}>
              <img src={assets.add_icon} alt="Logo" className="min-w-4 w-5" />
              <p className='hidden md:inline-block'>Add Images</p>
          </NavLink>

          <NavLink to='/admin/imageList' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-blue-100 border-r-4 border-blue-500 '}`}>
              <img src={assets.list_icon} alt="Logo" className="min-w-4 w-5" />
              <p className='hidden md:inline-block'>Image list</p>
          </NavLink>

          <NavLink to='/admin/subscribers' className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && 'bg-blue-100 border-r-4 border-blue-500 '}`}>
              <img src={assets.comment_icon} alt="Logo" className="min-w-4 w-5" />
              <p className='hidden md:inline-block'>Subscribers</p>
          </NavLink>
    </div>
  )
}

export default Sidebar