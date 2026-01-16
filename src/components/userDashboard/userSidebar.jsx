import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { RiDashboardLine } from "react-icons/ri";
import { RiCalendarCheckFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { TbProgressHelp } from "react-icons/tb";
import { FaHouse } from "react-icons/fa6";

const UserSidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState({ name: '', email: '', avatar: null });

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || 'Guest';
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedAvatar = localStorage.getItem('userAvatar');

    setUser({
      name: storedName,
      email: storedEmail,
      avatar: storedAvatar || null,
    });
  }, []);

  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const isActive = (path) => location.pathname === path;

  const linkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 no-underline transition-colors hover:bg-gray-100";
  const activeClasses = "bg-blue-50 text-blue-600 font-semibold hover:bg-blue-50";

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 p-5 flex flex-col justify-between z-10">
      <div>
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-6 text-blue-600 font-bold text-xl no-underline hover:text-blue-700 transition-colors"
          aria-label="Go to homepage"
        >
          <FaHouse className="text-blue-600" />
          Storehouse
        </Link>

        {/* Navigation */}
        <nav className="space-y-1">
          <Link
            to="/dashboard"
            className={`${linkClasses} ${isActive('/dashboard') ? activeClasses : ''}`}
          >
            <RiDashboardLine className="text-lg" />
            Overview
          </Link>
          <Link
            to="/dashboard/bookings"
            className={`${linkClasses} ${isActive('/dashboard/bookings') ? activeClasses : ''}`}
          >
            <RiCalendarCheckFill className="text-lg" />
            My Bookings
          </Link>
          <Link
            to="/dashboard/favorites"
            className={`${linkClasses} ${isActive('/dashboard/favorites') ? activeClasses : ''}`}
          >
            <AiOutlineHeart className="text-lg" />
            Favorites
          </Link>
          <Link
            to="/dashboard/profile"
            className={`${linkClasses} ${isActive('/dashboard/profile') ? activeClasses : ''}`}
          >
            <FaRegUser className="text-lg" />
            Profile
          </Link>
          <Link
            to="/dashboard/support"
            className={`${linkClasses} ${isActive('/dashboard/support') ? activeClasses : ''}`}
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
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover group-hover:ring-2 group-hover:ring-blue-300 transition"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm group-hover:bg-blue-200 transition">
            {getInitials(user.name)}
          </div>
        )}
        <div>
          <div className="font-medium text-gray-900 group-hover:text-blue-600 transition">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      </Link>
    </aside>
  );
};

export default UserSidebar;