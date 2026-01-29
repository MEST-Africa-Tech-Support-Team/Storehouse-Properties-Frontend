import React from 'react';
import { IoTime } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";

const LastLoginInfo = ({ user }) => {
  if (!user) return null;

  // Use actual login timestamp or fallback to account creation
  const lastLoginDate = user.loggedInAt || user.createdAt;
  const formattedDate = new Date(lastLoginDate).toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Device placeholder (clickable-looking)
  const deviceText = user.lastLoginDevice || 'Unknown device';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 w-full max-w-md mx-auto sm:max-w-full sm:p-4">
      <h3 className="text-lg font-semibold text-blue-600 mb-4">Last Login Information</h3>
      
      <div className="space-y-4">
        {/* Last Login Date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IoTime className="text-gray-400 text-base" />
            <span>Last Login Date:</span>
          </div>
          <p className="ml-0 sm:ml-6 text-gray-900 break-words">{formattedDate}</p>
        </div>

        {/* Last Login Device */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaGlobe className="text-gray-400 text-base" />
            <span>Device / IP:</span>
          </div>
          <p className="ml-0 sm:ml-6 text-blue-600 cursor-pointer break-words">
            {deviceText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LastLoginInfo;
