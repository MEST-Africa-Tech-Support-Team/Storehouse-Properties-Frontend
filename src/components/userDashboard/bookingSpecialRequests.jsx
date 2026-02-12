import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const BookingSpecialRequests = ({ 
  requests = "Please prepare a crib for our infant and ensure the apartment is on a higher floor with a good view. We would also appreciate early check-in if possible."
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-[#222222] mb-4">
        Special Requests
      </h3>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <FaInfoCircle className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#222222] leading-relaxed">
            {requests}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSpecialRequests;
