import React from 'react';
import { FaCalendarAlt, FaUsers, FaClock } from 'react-icons/fa';

const BookingStayDetails = ({ 
  stayDetails = {
    checkIn: {
      date: "March 15, 2024",
      time: "After 3:00 PM"
    },
    checkOut: {
      date: "March 20, 2024",
      time: "Before 11:00 AM"
    },
    guests: {
      count: 4,
      breakdown: "2 bedrooms"
    },
    arrivalTime: {
      time: "4:30 PM",
      date: "March 15, 2024"
    }
  }
}) => {
  const details = [
    {
      icon: <FaCalendarAlt className="text-primary" />,
      label: "Check-in",
      value: stayDetails.checkIn.date,
      subValue: stayDetails.checkIn.time
    },
    {
      icon: <FaCalendarAlt className="text-primary" />,
      label: "Check-out",
      value: stayDetails.checkOut.date,
      subValue: stayDetails.checkOut.time
    },
    {
      icon: <FaUsers className="text-primary" />,
      label: "Guests",
      value: `${stayDetails.guests.count} Adults`,
      subValue: stayDetails.guests.breakdown
    },
    {
      icon: <FaClock className="text-primary" />,
      label: "Expected Arrival",
      value: stayDetails.arrivalTime.time,
      subValue: stayDetails.arrivalTime.date
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-[#222222] mb-6">
        Stay Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {details.map((detail, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              {detail.icon}
            </div>
            
            <div className="flex-1">
              <p className="text-xs text-[#717171] mb-1">{detail.label}</p>
              <p className="text-sm sm:text-base font-semibold text-[#222222]">
                {detail.value}
              </p>
              <p className="text-xs text-[#717171] mt-0.5">{detail.subValue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStayDetails;
