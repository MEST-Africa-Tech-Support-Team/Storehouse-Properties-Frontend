import React from 'react';

const BookingDetailsHeader = ({ title = "Booking Details", subtitle = "Review the information for your reservation." }) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#222222] mb-2">
        {title}
      </h1>
      <p className="text-[#717171] text-sm sm:text-base">
        {subtitle}
      </p>
    </div>
  );
};

export default BookingDetailsHeader;
