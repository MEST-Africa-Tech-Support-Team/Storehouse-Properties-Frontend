import React from 'react';
import { Link } from 'react-router-dom';

import { RiCalendarCheckFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/dashboard/bookings"
          className="w-full sm:flex-1 flex items-center gap-3 p-4 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-transform duration-200 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center shadow-[0_4px_10px_rgba(59,130,246,0.12)]">
            <RiCalendarCheckFill className="text-blue-500 text-xl" />
          </div>
          <span className="font-semibold text-blue-500 whitespace-nowrap">My Bookings</span>
        </Link>

        <Link
          to="/dashboard/favorites"
          className="w-full sm:flex-1 flex items-center gap-3 p-4 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-transform duration-200 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center shadow-[0_4px_10px_rgba(239,68,68,0.12)]">
            <AiOutlineHeart className="text-red-500 text-xl" />
          </div>
          <span className="font-semibold text-red-500 whitespace-nowrap">Favorites</span>
        </Link>

        <Link
          to="/dashboard/profile"
          className="w-full sm:flex-1 flex items-center gap-3 p-4 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-transform duration-200 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-violet-50 flex items-center justify-center shadow-[0_4px_10px_rgba(139,92,246,0.12)]">
            <FaRegUser className="text-violet-500 text-xl" />
          </div>
          <span className="font-semibold text-violet-500 whitespace-nowrap">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;