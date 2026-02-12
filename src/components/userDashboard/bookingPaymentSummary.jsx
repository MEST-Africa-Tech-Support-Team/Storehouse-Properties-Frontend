import React from 'react';
import { FaCheckCircle, FaCreditCard } from 'react-icons/fa';

const BookingPaymentSummary = ({ 
  payment = {
    status: "Confirmed",
    propertyPrice: 1250.00,
    serviceFee: 87.50,
    taxes: 133.75,
    total: 1471.25,
    paidDate: "September 08, 2024",
    paymentMethod: "securely"
  }
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] p-6 sticky top-6">
      {/* Booking Status */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-[#222222] mb-3">
          Booking Status
        </h3>
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
          <FaCheckCircle className="text-green-600" />
          <span className="font-medium text-sm">{payment.status}</span>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-[#222222] mb-4">
          Payment Summary
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#717171]">Property price (5 nights)</span>
            <span className="text-sm font-medium text-[#222222]">
              {formatCurrency(payment.propertyPrice)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-[#717171]">Service fee</span>
            <span className="text-sm font-medium text-[#222222]">
              {formatCurrency(payment.serviceFee)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-[#717171]">Taxes</span>
            <span className="text-sm font-medium text-[#222222]">
              {formatCurrency(payment.taxes)}
            </span>
          </div>

          <div className="border-t border-[#EBEBEB] pt-3">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-[#222222]">Total Paid</span>
              <span className="text-xl font-bold text-primary">
                {formatCurrency(payment.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <FaCheckCircle className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-green-800 mb-1">
              Payment Status: Paid
            </p>
            <p className="text-xs text-green-700">
              Completed on {payment.paidDate}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex items-center gap-2 text-xs text-[#717171]">
        <FaCreditCard className="text-[#B0B0B0]" />
        <span>Payment completed {payment.paymentMethod}</span>
      </div>
    </div>
  );
};

export default BookingPaymentSummary;
