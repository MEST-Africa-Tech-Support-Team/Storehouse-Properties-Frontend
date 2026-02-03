import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

import { RiDashboardLine } from "react-icons/ri";
import { RiCalendarCheckFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { TbProgressHelp } from "react-icons/tb";
import { FaHouse } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";

const getInitials = (user) => {
  if (!user) return 'U';
  const first = user.firstName?.charAt(0) || user.email?.charAt(0) || 'U';
  const last = user.lastName?.charAt(0) || user.email?.charAt(1) || 'U';
  return (first + last).toUpperCase();
};

const UserSidebar = () => {
  const location = useLocation();
  const { currentUser, loading } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false); 

  const isActive = (path) => location.pathname === path;

  const linkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 no-underline transition-colors hover:bg-gray-100";
  const activeClasses = "bg-blue-50 text-blue-600 font-semibold hover:bg-blue-50";

  const displayName = currentUser?.firstName && currentUser?.lastName
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : currentUser?.email?.split('@')[0] || 'Guest';

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
            className="flex items-center gap-2 mb-6 text-blue-600 font-bold text-xl no-underline hover:text-blue-700 transition-colors"
            aria-label="Go to homepage"
          >
            <FaHouse className="text-blue-600" />
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

        <Link
          to="/dashboard/profile"
          className="flex items-center gap-3 pt-5 border-t border-gray-200 no-underline group"
          aria-label="Go to your profile"
          onClick={() => setIsOpen(false)}
        >
          {currentUser?.profilePhoto ? (
            <img
              src={currentUser.profilePhoto}
              alt={displayName}
              className="w-10 h-10 rounded-full object-cover group-hover:ring-2 group-hover:ring-blue-300 transition"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm group-hover:bg-blue-200 transition">
              {initials}
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900 group-hover:text-blue-600 transition">
              {displayName}
            </div>
            <div className="text-xs text-gray-500">{userEmail}</div>
          </div>
        </Link>
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
