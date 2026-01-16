import React from 'react';
import { Link } from 'react-router';
import { IoBan } from "react-icons/io5";
import { FaBaby } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaCalendar } from "react-icons/fa";

const BookingCard = ({ booking }) => {
  const { id, title, location, checkIn, checkOut, guests, status, price, childrenAllowed, action } = booking;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getChildrenBadge = (allowed) => {
    if (allowed === null) return null;
    return allowed ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
        <FaBaby className="text-xs" />
        Children Allowed
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
        <IoBan className="text-xs" />
        No Children
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex gap-4">
      <img
        src={booking.image || "https://images.unsplash.com/photo-1560448204-e62e497b1d04?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"}
        alt={title}
        className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 ease-out hover:scale-105"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{location}</p>
        {getChildrenBadge(childrenAllowed)}
      </div>

      <div className="flex flex-col justify-center items-start gap-2">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <FaCalendar className="text-gray-500" />
          <span>{checkIn} → {checkOut}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <IoIosPeople className="text-gray-500" />
          <span>{guests}</span>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="flex flex-col justify-between items-end">
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">${price.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Total paid</div>
        </div>

        <div className="flex flex-row space-x-2">
          <Link
            to={`/booking/${id}/details`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
          {action === 'Cancel' && (
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          )}
          {action === 'Review' && (
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors">
              Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;