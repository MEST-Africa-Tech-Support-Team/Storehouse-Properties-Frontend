import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { toast } from 'react-hot-toast';

import { RiDashboardLine } from "react-icons/ri";
import { RiCalendarCheckFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { TbProgressHelp } from "react-icons/tb";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import Logo from "../../images/storehouse-logo.png";


const getInitials = (user) => {
  if (!user) return 'U';
  const first = user.firstName?.charAt(0) || user.email?.charAt(0) || 'U';
  const last = user.lastName?.charAt(0) || user.email?.charAt(1) || 'U';
  return (first + last).toUpperCase();
};

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, loading, logout } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null); 

  const isActive = (path) => location.pathname === path;

  const linkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 no-underline transition-colors hover:bg-gray-100";
  const activeClasses = "bg-light-primary/20 text-primary font-semibold hover:bg-light-primary/20";

  const displayName = currentUser?.firstName && currentUser?.lastName
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : currentUser?.email?.split('@')[0] || 'Guest';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    setIsOpen(false);
    toast.success('You have been logged out successfully');
    navigate('/auth/login');
  };

  const handleSettingsClick = () => {
    setShowProfileMenu(false);
    setIsOpen(false);
    navigate('/dashboard/profile');
  };

  const initials = getInitials(currentUser);
  const userEmail = currentUser?.email || '';

  if (loading) return null;

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 p-2 bg-white rounded-md shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FaTimes className="text-gray-700" /> : <FaBars className="text-gray-700" />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between z-10 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          <Link
            to="/"
            className="flex items-center gap-2 mb-6 text-black font-bold text-xl no-underline hover:text-black transition-colors"
            aria-label="Go to homepage"
          >
            <img src={Logo} alt="Storehouse Logo" className="h-10 w-auto brightness-0" />
            Storehouse
          </Link>

          <nav className="space-y-1">
            <Link
              to="/dashboard"
              className={`${linkClasses} ${isActive('/dashboard') ? activeClasses : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <RiDashboardLine className="text-lg" />
              Overview
            </Link>
            <Link
              to="/dashboard/bookings"
              className={`${linkClasses} ${isActive('/dashboard/bookings') ? activeClasses : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <RiCalendarCheckFill className="text-lg" />
              My Bookings
            </Link>
            <Link
              to="/dashboard/favorites"
              className={`${linkClasses} ${isActive('/dashboard/favorites') ? activeClasses : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineHeart className="text-lg" />
              Favorites
            </Link>
            <Link
              to="/dashboard/profile"
              className={`${linkClasses} ${isActive('/dashboard/profile') ? activeClasses : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <FaRegUser className="text-lg" />
              Profile
            </Link>
            <Link
              to="/dashboard/support"
              className={`${linkClasses} ${isActive('/dashboard/support') ? activeClasses : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <TbProgressHelp className="text-lg" />
              Support / Help
            </Link>
          </nav>
        </div>

        <div className="relative" ref={profileMenuRef}>
          <button
            className="flex items-center gap-3 pt-5 border-t border-gray-200 w-full text-left hover:bg-gray-50 rounded-lg p-2 -mx-2 transition group"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Open profile menu"
          >
            {currentUser?.profilePhoto ? (
              <img
                src={currentUser.profilePhoto}
                alt={displayName}
                className="w-10 h-10 rounded-full object-cover group-hover:ring-2 group-hover:ring-primary/30 transition"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-light-primary/20 flex items-center justify-center text-primary font-semibold text-sm group-hover:bg-light-primary/30 transition">
                {initials}
              </div>
            )}
            <div className="flex-1">
              <div className="font-medium text-gray-900 group-hover:text-primary transition">
                {displayName}
              </div>
              <div className="text-xs text-gray-500">{userEmail}</div>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <button
                onClick={handleSettingsClick}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <IoSettingsOutline className="text-lg" />
                <span className="font-medium">Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left border-t border-gray-100"
              >
                <MdLogout className="text-lg" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-5 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default UserSidebar;
