import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { assets, menuItems } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { token, setToken } = useAppContext();

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 p-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <img src={assets.logo2} alt="Logo" className="h-16 w-auto" />
          <div>
            <h3 className="text-xl font-bold text-blue-700">ಸಕ್ಸೆಸ್  ಡಿಗ್ರಿ  ಕಾಲೇಜು</h3>
            <h4 className="text-sm font-semibold text-blue-600">SUCCESS DEGREE COLLEGE</h4>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          <ul className="flex space-x-6 text-gray-800 font-medium">
            {menuItems.map((item, index) => (
              <li key={index} className="relative group">
                <HashLink
                  smooth
                  to={item.to}
                  className="hover:text-blue-600 transition flex items-center gap-1"
                >
                  {item.label}
                  {item.subLinks && <HiChevronDown className="text-sm" />}
                </HashLink>
                {item.subLinks && (
                  <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 min-w-[18rem] z-50">
                    {item.subLinks.map((subItem, subIdx) => (
                      <li key={subIdx} className="relative group/sub">
                        <HashLink
                          to={subItem.to}
                          className=" px-4 py-2 hover:bg-blue-100 text-sm flex justify-between items-center"
                        >
                          {subItem.label}
                          {subItem.subLinks && <HiChevronDown className="ml-1 text-xs" />}
                        </HashLink>
                        {subItem.subLinks && (
                          <ul className="absolute left-full top-0 bg-white shadow-lg rounded-lg opacity-0 group-hover/sub:opacity-100 invisible group-hover/sub:visible transition-all duration-300 min-w-[12rem] z-50">
                            {subItem.subLinks.map((deep, deepIdx) => (
                              <li key={deepIdx}>
                                <HashLink
                                  to={deep.to}
                                  className="block px-4 py-2 hover:bg-blue-100 text-sm"
                                >
                                  {deep.label}
                                </HashLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Login Button */}
          {token ? (
            <HashLink
              to="/"
              onClick={logout}
              className="ml-4 inline-flex items-center gap-2 px-2 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <FiUser className="text-lg" />
              Logout
            </HashLink>
          ) : (
            <HashLink
              to="/admin"
              className="ml-4 inline-flex items-center gap-2 px-3 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <FiUser className="text-lg" />
              Login
            </HashLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={handleToggle} className="lg:hidden text-gray-800 focus:outline-none">
          {isOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-3/4 bg-white shadow-md z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button onClick={handleClose} className="absolute top-4 right-4 text-2xl">
          <HiX />
        </button>

        <ul className="mt-20 px-6 text-base font-semibold text-gray-800 space-y-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <div
                onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <HashLink
                  smooth
                  to={item.to}
                  className="hover:text-blue-600"
                  onClick={handleClose}
                >
                  {item.label}
                </HashLink>
                {item.subLinks && (
                  <span className="text-xl">{openDropdown === index ? "−" : "+"}</span>
                )}
              </div>

              {item.subLinks && openDropdown === index && (
                <ul className="mt-2 ml-4 space-y-2 text-sm font-normal">
                  {item.subLinks.map((sub, idx) => (
                    <li key={idx}>
                      <HashLink
                        smooth
                        to={sub.to}
                        className="block text-gray-700 hover:text-blue-500"
                        onClick={handleClose}
                      >
                        {sub.label}
                      </HashLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {token ? (
            <HashLink
              to="/"
              onClick={logout}
              className="ml-4 inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <FiUser className="text-lg" />
              Logout
            </HashLink>
          ) : (
            <HashLink
              to="/admin"
              onClick={handleClose}
              className="ml-4 inline-flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <FiUser className="text-lg" />
              Login
            </HashLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
