// src/components/BookingForm.jsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { FaCalendar, FaUser, FaDollarSign } from 'react-icons/fa';

export default function BookingForm({ price }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }

    // Navigate to booking page with state
    navigate('/property/booking', {
      state: {
        price,
        checkIn,
        checkOut,
        guests,
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <FaDollarSign className="text-blue-600" />
        <span className="text-2xl font-bold text-gray-800">${price}</span>
        <span className="text-gray-600">/ night</span>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Check-in */}
        <div className="mb-4">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <div className="relative">
            <input
              id="checkIn"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Check-out */}
        <div className="mb-4">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <div className="relative">
            <input
              id="checkOut"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Guests */}
        <div className="mb-6">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            Guests (optional)
          </label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}