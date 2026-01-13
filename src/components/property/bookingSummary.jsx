import React from "react";
import { FiCalendar, FiUsers, FiMoon } from "react-icons/fi";

export default function BookingSummary({ property, checkIn, checkOut, guests, pricePerNight }) {
  // ✅ Safe date calculation
  const nights = checkIn && checkOut 
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * 0.1); // 10%
  const cleaningFee = 85;
  const total = subtotal + serviceFee + cleaningFee;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>

      <div className="mb-4">
        <img
          src={property.image || "https://images.unsplash.com/photo-1560448204-e62e0799b871?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"}
          alt={property.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
        <h4 className="font-bold text-gray-800">{property.name}</h4>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <FiCalendar className="w-4 h-4" /> {property.location}
        </p>
      </div>

      <div className="flex justify-between py-3 border-b border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Check-in</p>
          <p className="font-medium">{checkIn ? new Date(checkIn).toLocaleDateString() : '—'}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Check-out</p>
          <p className="font-medium">{checkOut ? new Date(checkOut).toLocaleDateString() : '—'}</p>
        </div>
      </div>

      <div className="py-3 border-b border-gray-100">
        {/* ✅ Fixed: use 'nights', not 'night' */}
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <FiMoon className="w-4 h-4" /> {nights} night{nights > 1 ? 's' : ''}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <FiUsers className="w-4 h-4" /> {guests} guest{guests > 1 ? 's' : ''}
        </p>
      </div>

      <div className="py-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">${pricePerNight} × {nights} nights</span>
          <span className="font-medium">${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Service fee</span>
          <span className="font-medium">${serviceFee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Cleaning fee</span>
          <span className="font-medium">${cleaningFee}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 6v-4m0 4h-4m4 4h4v-4m-4 4l-4-4 4-4" />
          </svg>
        </div>
        <div>
          <p className="font-medium">Secure booking</p>
          <p>Your payment is protected</p>
        </div>
      </div>
    </div>
  );
}