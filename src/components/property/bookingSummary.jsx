import React, { useState, useEffect } from "react";
import { FiCalendar, FiUsers, FiMoon } from "react-icons/fi";
import { FaLock } from "react-icons/fa"; 

export default function BookingSummary() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // ✅ Try multiple sources for booking data
    let data = null;
    
    // 1. Try booking_pending (for terms page)
    const pending = localStorage.getItem('booking_pending');
    if (pending) {
      try {
        data = JSON.parse(pending);
      } catch (error) {
        console.error('Failed to parse booking_pending:', error);
      }
    }
    
    // 2. If not found, try booking_confirmed_* (for confirmation page)
    if (!data) {
      const keys = Object.keys(localStorage);
      const confirmedKeys = keys.filter(k => k.startsWith('booking_confirmed_'));
      
      if (confirmedKeys.length > 0) {
        // Get the most recent confirmed booking
        const latestKey = confirmedKeys.sort().reverse()[0];
        try {
          data = JSON.parse(localStorage.getItem(latestKey));
        } catch (error) {
          console.error('Failed to parse confirmed booking:', error);
        }
      }
    }
    
    if (data) {
      setBookingData(data);
    }
  }, []);

  if (!bookingData) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-center">Loading booking details...</p>
      </div>
    );
  }

  // ✅ Extract ALL possible fields with fallbacks
  const {
    propertyTitle = 'Property',
    title = 'Property', // Alternative field name
    price = 0,
    pricePerNight = 0, // Alternative field name
    checkIn,
    checkOut,
    guests = 1,
    nights = 0,
    total = 0,
    cleaningFee = 25,
    serviceFee = 35,
    images = [],
    location = {},
    city = '',
    region = '',
    address = '',
    propertyId
  } = bookingData;

  // ✅ Use the correct price field
  const nightlyPrice = price || pricePerNight || 0;

  // ✅ Calculate nights if not provided
  const calculatedNights = nights || (checkIn && checkOut 
    ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 0);

  // ✅ Calculate subtotal and total
  const subtotal = nightlyPrice * calculatedNights;
  const calculatedTotal = total || subtotal + serviceFee + cleaningFee;

  // ✅ Get property image with multiple fallbacks
  const mainImage = images?.[0] || 
    (propertyId ? localStorage.getItem(`property_image_${propertyId}`) : null) ||
    "https://images.unsplash.com/photo-1560448204-e62e0799b871?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

  // ✅ Get location string with multiple fallbacks
  let locationString = 'Location not available';
  
  if (location?.city || city) {
    const locCity = location.city || city;
    const locRegion = location.region || region;
    locationString = [locCity, locRegion].filter(Boolean).join(', ');
  } else if (location?.address || address) {
    locationString = location.address || address;
  } else if (bookingData?.location?.city) {
    locationString = bookingData.location.city;
    if (bookingData.location.region) {
      locationString += `, ${bookingData.location.region}`;
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Booking Summary</h3>

      <div className="mb-4">
        <img
          src={mainImage}
          alt={propertyTitle || title}
          className="w-full h-40 object-cover rounded-lg mb-3"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1560448204-e62e0799b871?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
          }}
          loading="lazy"
        />
        <h4 className="font-bold text-gray-800 text-base">{propertyTitle || title}</h4>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <FiCalendar className="w-4 h-4 flex-shrink-0" /> {locationString}
        </p>
      </div>

      <div className="flex justify-between py-3 border-b border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Check-in</p>
          <p className="font-medium text-sm">
            {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            }) : '—'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Check-out</p>
          <p className="font-medium text-sm">
            {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric'
            }) : '—'}
          </p>
        </div>
      </div>

      <div className="py-3 border-b border-gray-100">
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <FiMoon className="w-4 h-4 flex-shrink-0" /> {calculatedNights} night{calculatedNights !== 1 ? 's' : ''}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <FiUsers className="w-4 h-4 flex-shrink-0" /> {guests} guest{guests !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="py-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm">${nightlyPrice} × {calculatedNights} night{calculatedNights !== 1 ? 's' : ''}</span>
          <span className="font-medium text-sm">${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm">Service fee</span>
          <span className="font-medium text-sm">${serviceFee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 text-sm">Cleaning fee</span>
          <span className="font-medium text-sm">${cleaningFee}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${calculatedTotal}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
        <div className="mt-0.5 text-green-600">
          <FaLock className="w-4 h-4" />
        </div>
        <div>
          <p className="font-medium text-gray-800">Secure booking</p>
          <p className="text-xs">Your payment is protected</p>
        </div>
      </div>
    </div>
  );
}