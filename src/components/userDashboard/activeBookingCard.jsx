import React from "react";
import { Link } from "react-router-dom";

import { IoLocationOutline } from "react-icons/io5";
import { IoIosCalendar } from "react-icons/io";

const ActiveBookingCard = ({ booking = null }) => {
  if (!booking) return null;

  const nights = booking.nights || Math.max(1, Math.round((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24)));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row gap-5 items-start mb-6 font-sans">
      <img
        src={booking.image}
        alt={booking.title}
        className="w-full sm:w-[120px] h-48 sm:h-[90px] object-cover rounded-xl flex-shrink-0 transition-transform duration-300 ease-out hover:scale-105"
      />

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-3 gap-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-[1.2] m-0 truncate">{booking.title}</h3>
          <span className="px-3 py-1 bg-[#d4edda] text-[#155724] rounded-full text-xs font-semibold">{booking.status}</span>
        </div>

        <div className="flex items-center gap-1.5 mb-3 text-gray-500 text-sm">
          <IoLocationOutline size={16} className="text-gray-500" />
          <span className="truncate">{booking.location}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1.5">
            <IoIosCalendar size={18} className="text-[#0066ff]" />
            <div>
              <div className="text-xs text-gray-500 font-medium">Check-in</div>
              <div className="font-semibold text-gray-900">{new Date(booking.checkIn).toLocaleDateString()}</div>
            </div>
          </div>

          <span className="text-lg text-gray-300 hidden sm:block">→</span>

          <div className="flex items-center gap-1.5">
            <IoIosCalendar size={18} className="text-[#0066ff]" />
            <div>
              <div className="text-xs text-gray-500 font-medium">Check-out</div>
              <div className="font-semibold text-gray-900">{new Date(booking.checkOut).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="w-px h-8 bg-gray-200 mx-0 sm:mx-4" />

          <div className="text-right">
            <div className="text-xs text-gray-500 font-medium">Total Nights</div>
            <div className="font-semibold text-gray-900">{nights} nights</div>
          </div>
        </div>

        <div className="mt-2 sm:mt-0">
          <Link
            to={`/booking/${booking.id}`}
            className="inline-block w-full sm:w-[calc(40%+35px)] py-3 px-5 bg-[#0066ff] text-white no-underline rounded-full text-center font-semibold text-sm transition-colors"
          >
            View Booking Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActiveBookingCard;