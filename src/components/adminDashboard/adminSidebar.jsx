import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Icons
import { RiDashboardLine, RiBarChartBoxLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { RiCalendarCheckFill } from "react-icons/ri";
import { FaRegUser, FaHouse, FaRegBuilding } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const AdminSidebar = ({ userName, userEmail }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for mobile toggle

  const getInitials = (fullName) => {
    if (!fullName) return 'A';
    return fullName.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2);
  };

  const isActive = (path) => location.pathname === path;

  const linkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 no-underline transition-colors hover:bg-gray-100";
  const activeClasses = "bg-blue-50 text-blue-600 font-semibold";

  const adminNavLinks = [
    { to: '/admin', label: 'Overview', icon: <RiDashboardLine className="text-lg" /> },
    { to: '/admin/properties', label: 'Properties', icon: <FaRegBuilding className="text-lg" /> },
    { to: '/admin/bookings', label: 'Bookings', icon: <RiCalendarCheckFill className="text-lg" /> },
    { to: '/admin/users', label: 'Users', icon: <HiOutlineUsers className="text-lg" /> },
    { to: '/admin/analytics', label: 'Analytics', icon: <RiBarChartBoxLine className="text-lg" /> },
    { to: '/admin/settings', label: 'Settings', icon: <IoSettingsOutline className="text-lg" /> },
  ];

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON - Only visible on small screens */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-white border border-gray-200 rounded-md shadow-sm text-gray-600"
      >
        <RiMenuLine size={24} />
      </button>

      {/* MOBILE OVERLAY - Dims the background when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        <div>
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl no-underline">
              <FaHouse />
              Storehouse <span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded-full">Admin</span>
            </Link>
            
            {/* CLOSE BUTTON - Mobile only */}
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500">
              <RiCloseLine size={24} />
            </button>
          </div>

          <nav className="space-y-1">
            {adminNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)} // Close on click for mobile
                className={`${linkClasses} ${isActive(link.to) ? activeClasses : ''}`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 pt-5 border-t border-gray-200">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-semibold text-sm">
            {getInitials(userName)}
          </div>
          <div className="overflow-hidden">
            <div className="font-medium text-gray-900 truncate">{userName || 'Admin'}</div>
            <div className="text-xs text-gray-500 truncate">{userEmail}</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;