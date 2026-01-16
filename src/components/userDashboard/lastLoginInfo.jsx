import React from 'react';
import { IoTime } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";

const LastLoginInfo = ({ lastLoginDate, deviceIP }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-blue-600 mb-4">Last Login Information</h3>
      
      <div className="">
        <div className='mb-2'>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IoTime className="text-gray-400 text-base" />
            <span>Last Login Date</span>
          </div>
          <p className="ml-6 text-gray-900">{lastLoginDate}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaGlobe className="text-gray-400 text-base" />
            <span>Last Login Device / IP</span>
          </div>
          <p className="ml-6 text-gray-900">{deviceIP}</p>
        </div>
      </div>
    </div>
  );
};

export default LastLoginInfo;