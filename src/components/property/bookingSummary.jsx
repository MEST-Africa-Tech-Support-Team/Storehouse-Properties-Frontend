import React from "react";
import { FiCalendar, FiUsers, FiMoon } from "react-icons/fi";
import { FaLock } from "react-icons/fa"; 
export default function BookingSummary({ 
  property,
  checkIn,
  checkOut,
  guests,
}) {
  if (!property) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500">Property details not available</p>
      </div>
    );
  }

  const pricePerNight = property.price || 0;
  const nights = checkIn && checkOut 
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0;

  const cleaningFee = 25;
  const serviceFee = 35;
  const subtotal = pricePerNight * nights;
  const total = subtotal + serviceFee + cleaningFee;

  const mainImage = (property.images?.[0] || property.image || "");

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>

      <div className="mb-4">
        <img
          src={mainImage}
          alt={property.title || "Property"}
          className="w-full h-40 object-cover rounded-lg mb-3"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560448204-e62e0799b871?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
          }}
        />
        <h4 className="font-bold text-gray-800">{property.title}</h4>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <FiCalendar className="w-4 h-4" /> {property.location}
        </p>
      </div>

      <div className="flex justify-between py-3 border-b border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Check-in</p>
          <p className="font-medium">
            {checkIn ? new Date(checkIn).toLocaleDateString() : '—'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Check-out</p>
          <p className="font-medium">
            {checkOut ? new Date(checkOut).toLocaleDateString() : '—'}
          </p>
        </div>
      </div>

      <div className="py-3 border-b border-gray-100">
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <FiMoon className="w-4 h-4" /> {nights} night{nights !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <FiUsers className="w-4 h-4" /> {guests} guest{guests !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="py-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">${pricePerNight} × {nights} night{nights !== 1 ? 's' : ''}</span>
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

      <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
        <div className="mt-0.5 text-green-600">
          <FaLock className="w-4 h-4" />
        </div>
        <div>
          <p className="font-medium text-gray-800">Secure booking</p>
          <p>Your payment is protected</p>
        </div>
      </div>
    </div>
  );
}