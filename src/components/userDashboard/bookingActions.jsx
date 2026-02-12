import React from 'react';
import { FaHeadset, FaExclamationTriangle } from 'react-icons/fa';

const BookingActions = ({ 
  onContactSupport,
  onCancelBooking,
  cancellationWarning = "Cancellation penalties apply. See full cancellation policy in booking terms & conditions."
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] p-6">
      <h3 className="text-base font-semibold text-[#222222] mb-4">
        Actions
      </h3>

      <div className="space-y-3">
        {/* Contact Support Button */}
        <button
          onClick={onContactSupport}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium text-sm
                     hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2
                     focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <FaHeadset />
          Contact Support
        </button>

        {/* Cancel Booking Button */}
        <button
          onClick={onCancelBooking}
          className="w-full bg-white text-red-600 py-3 px-4 rounded-lg font-medium text-sm
                     border-2 border-red-600 hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2
                     focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        >
          <FaExclamationTriangle />
          Cancel Booking
        </button>

        {/* Warning Text */}
        <p className="text-xs text-red-600 text-center pt-2 leading-relaxed">
          {cancellationWarning}
        </p>
      </div>
    </div>
  );
};

export default BookingActions;
