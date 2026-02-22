import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { HiChevronDown, HiChevronRight, HiMenuAlt3, HiX } from "react-icons/hi";
import { assets, menuItems } from "../assets/assets";

// ==========================================
// 1. DESKTOP MENU (Recursive & Fixed)
// ==========================================

function DesktopMenu({ items, depthLevel = 0 }) {
  const isMainRow = depthLevel === 0;

  return (
    <ul className={isMainRow ? "flex items-center space-x-1" : "py-2"}>
      {items.map((item, index) => (
        <DesktopMenuItem key={index} item={item} depthLevel={depthLevel} />
      ))}
    </ul>
  );
}

function DesktopMenuItem({ item, depthLevel }) {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = item.subLinks && item.subLinks.length > 0;

  const dropdownPositionClass = depthLevel === 0 
    ? "top-full left-0 pt-4" // pt-4 bridges the gap so mouse doesn't disconnect
    : "top-0 left-full ml-[-2px]"; // Slight overlap to prevent gaps

  return (
    <li
      className={`relative ${depthLevel === 0 ? "h-full flex items-center" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- Link / Label --- */}
      <HashLink
        smooth
        to={item.to}
        target={item.newTab ? "_blank" : undefined}
        rel={item.newTab ? "noopener noreferrer" : undefined}
        className={`
          flex items-center justify-between whitespace-nowrap transition-colors duration-200
          ${depthLevel === 0 
            ? "px-4 py-2 text-sm font-bold text-gray-700 hover:text-blue-700" 
            : "px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 w-full" 
          }
        `}
      >
        <span>{item.label}</span>
        
        {/* Icons */}
        {hasChildren && (
          depthLevel === 0 
            ? <HiChevronDown className={`ml-1 text-xs transition-transform ${isHovered ? "rotate-180" : ""}`} />
            : <HiChevronRight className="ml-4 text-xs text-gray-400" />
        )}
      </HashLink>

      {/* --- Recursive Dropdown --- */}
      {hasChildren && (
        <div
          className={`
            absolute ${dropdownPositionClass} z-50
            transition-all duration-200 ease-in-out origin-top-left
            ${isHovered ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
        >
          {/* White Box Container */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-100 min-w-[220px]">
            <DesktopMenu items={item.subLinks} depthLevel={depthLevel + 1} />
          </div>
        </div>
      )}
    </li>
  );
}


// ==========================================
// 2. MOBILE MENU (Recursive Accordion)
// ==========================================

function MobileMenu({ items, closeMenu, depthLevel = 0 }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, index) => (
        <MobileMenuItem 
          key={index} 
          item={item} 
          closeMenu={closeMenu} 
          depthLevel={depthLevel} 
        />
      ))}
    </ul>
  );
}

function MobileMenuItem({ item, closeMenu, depthLevel }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.subLinks && item.subLinks.length > 0;

  const toggleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <li className="select-none border-b border-gray-50 last:border-none">
      <div 
        className={`
          flex justify-between items-center pr-4 py-3 cursor-pointer transition-colors
          ${depthLevel === 0 ? "pl-2 hover:bg-gray-50" : ""} 
          ${depthLevel > 0 ? "pl-4 hover:bg-blue-50/30" : ""}
          ${isOpen && hasChildren ? "text-blue-700 bg-blue-50" : "text-gray-700"}
        `}
        style={{ paddingLeft: `${(depthLevel * 16) + 12}px` }} 
        onClick={(e) => hasChildren ? toggleOpen(e) : closeMenu()}
      >
        {/* Label */}
        {hasChildren ? (
          <span className={`font-medium ${depthLevel === 0 ? "text-base" : "text-sm"}`}>
            {item.label}
          </span>
        ) : (
          <HashLink 
            smooth 
              to={item.to} 
              target={item.newTab ? "_blank" : undefined}
            rel={item.newTab ? "noopener noreferrer" : undefined}
            className={`w-full block font-medium ${depthLevel === 0 ? "text-base" : "text-sm"}`}
          >
            {item.label}
          </HashLink>
        )}

        {/* Arrow Icon */}
        {hasChildren && (
          <HiChevronDown 
            className={`text-lg transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
          />
        )}
      </div>

      {/* Expandable Content */}
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[1500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {hasChildren && (
          <MobileMenu items={item.subLinks} closeMenu={closeMenu} depthLevel={depthLevel + 1} />
        )}
      </div>
    </li>
  );
}


// ==========================================
// 3. MAIN NAVBAR (Fixed)
// ==========================================

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* --- Main Navigation Bar --- */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100"
            : "bg-white border-b border-transparent"
        }`}
      >
        <div className="max-w-full mx-auto flex justify-between items-center px-4 py-2 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <HashLink smooth to="/#top" className="flex items-center gap-3 sm:gap-4 group z-50">
            <img 
              src={assets.logo2} 
              alt="Logo" 
              className="h-10 w-auto sm:h-14 transition-transform group-hover:scale-105 duration-300" 
            />
            <div className="flex flex-col">
              <h3 className="text-base sm:text-xl font-bold text-blue-900 leading-tight">
                ಸಕ್ಸೆಸ್ ಡಿಗ್ರಿ ಕಾಲೇಜು
              </h3>
              <h4 className="text-[10px] sm:text-sm font-semibold text-blue-600 tracking-wide">
                SUCCESS DEGREE COLLEGE
              </h4>
            </div>
          </HashLink>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <DesktopMenu items={menuItems} />
          </div>

          {/* Mobile Button */}
          <button 
            onClick={handleToggle} 
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors z-50"
          >
            {isOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
          </button>
        </div>
      </nav>

      {/* MOVED OUTSIDE: 
         The sidebar components are now siblings to <nav>, not children.
         This prevents the 'backdrop-blur' on nav from breaking the sidebar's fixed position.
      */}

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/80">
          <span className="font-bold text-lg text-blue-900">Menu</span>
          <button onClick={handleClose} className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors">
            <HiX className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <MobileMenu target="_blank" items={menuItems} closeMenu={handleClose} />
        </div>
      </div>
    </>
  );
};

export default NavBar;