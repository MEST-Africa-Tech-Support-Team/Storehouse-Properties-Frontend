import React from "react";
import { Link } from "react-router";

import { IoLocationOutline } from "react-icons/io5";
import { IoIosCalendar } from "react-icons/io";

const ActiveBookingCard = () => {
  const booking = {
    id: 1,
    title: "Skyline Luxury Apartment",
    location: "Downtown Manhattan, New York",
    checkIn: "Dec 20, 2024",
    checkOut: "Dec 27, 2024",
    nights: 7,
    status: "Confirmed",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz9HI6MGIwQaw4M1eHeN1N0DU7J6neAS0lSQ&s",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex gap-5 items-start mb-6 font-sans">
      <img
        src={booking.image}
        alt={booking.title}
        className="w-[120px] h-[90px] object-cover rounded-xl flex-shrink-0 transition-transform duration-300 ease-out hover:scale-105"
      />

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 leading-[1.4] m-0">
            {booking.title}
          </h3>
          <span className="px-3 py-1 bg-[#d4edda] text-[#155724] rounded-full text-xs font-semibold">
            {booking.status}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-3 text-gray-500 text-sm">
          <IoLocationOutline size={16} className="text-gray-500" />
          {booking.location}
        </div>

        <div className="flex items-center gap-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1.5">
            <IoIosCalendar size={18} className="text-[#0066ff]" />
            <div>
              <div className="text-xs text-gray-500 font-medium">Check-in</div>
              <div className="font-semibold text-gray-900">{booking.checkIn}</div>
            </div>
          </div>

          <span className="text-lg text-gray-300">→</span>

          <div className="flex items-center gap-1.5">
            <IoIosCalendar size={18} className="text-[#0066ff]" />
            <div>
              <div className="text-xs text-gray-500 font-medium">Check-out</div>
              <div className="font-semibold text-gray-900">{booking.checkOut}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200 mx-4"></div>

          <div className="text-right">
            <div className="text-xs text-gray-500 font-medium">Total Nights</div>
            <div className="font-semibold text-gray-900">{booking.nights} nights</div>
          </div>
        </div>

        <Link
          to={`/booking/${booking.id}`}
          className="block w-[calc(40%+35px)] py-3 px-5 bg-[#0066ff] text-white no-underline rounded-full text-center font-semibold text-sm transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0055d4")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0066ff")}
        >
          View Booking Details
        </Link>
      </div>
    </div>
  );
};

export default ActiveBookingCard;