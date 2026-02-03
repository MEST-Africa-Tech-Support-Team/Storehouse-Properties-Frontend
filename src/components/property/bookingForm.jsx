import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function BookingForm({ price = 180, propertyId, maxGuests = 10, propertyTitle = 'Property', propertyImage = null, propertyLocation = null }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const cleaningFee = 25;
  const serviceFee = 35;
  const maxGuestsLimit = Math.min(maxGuests, 10);

  useEffect(() => {
    if (!propertyId) return;
    
    const savedData = localStorage.getItem(`booking_${propertyId}`);
    if (savedData) {
      try {
        const { checkIn: savedCheckIn, checkOut: savedCheckOut, guests: savedGuests } = JSON.parse(savedData);
        const today = new Date().toISOString().split('T')[0];
        if (savedCheckIn >= today && savedCheckOut > savedCheckIn) {
          setCheckIn(savedCheckIn);
          setCheckOut(savedCheckOut);
        }
        if (savedGuests >= 1 && savedGuests <= maxGuestsLimit) {
          setGuests(savedGuests);
        }
      } catch (error) {
        console.error('Failed to load saved booking data:', error);
        localStorage.removeItem(`booking_${propertyId}`);
      }
    }
  }, [propertyId, maxGuestsLimit]);

  useEffect(() => {
    if (!propertyId) return;
    
    const bookingData = {
      checkIn,
      checkOut,
      guests,
      nights,
      total,
      price,
      cleaningFee,
      serviceFee,
      timestamp: new Date().toISOString(),
      
      propertyId: propertyId || null,
      propertyTitle: propertyTitle || null,
      propertyImage: propertyImage || null,
      propertyLocation: propertyLocation || null,
    };

    if (propertyId) {
      localStorage.setItem(`booking_${propertyId}`, JSON.stringify(bookingData));
    }

    localStorage.setItem('booking_pending', JSON.stringify(bookingData));
  }, [checkIn, checkOut, guests, nights, total, price, propertyId, propertyTitle, propertyImage, propertyLocation]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (inDate < today || outDate <= inDate) {
        setNights(0);
        setTotal(0);
        return;
      }
      
      const diffTime = Math.abs(outDate - inDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
      const subtotal = price * diffDays;
      setTotal(subtotal + cleaningFee + serviceFee);
    } else {
      setNights(0);
      setTotal(0);
    }
  }, [checkIn, checkOut, price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates', { duration: 3000 });
      return;
    }
    
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (inDate < today) {
      toast.error('Check-in date must be today or later', { duration: 3000 });
      return;
    }
    
    if (outDate <= inDate) {
      toast.error('Check-out must be after check-in', { duration: 3000 });
      return;
    }
    
    if (!authService.isAuthenticated()) {
      toast.custom((t) => (
        <div className="bg-white shadow-lg rounded-xl p-4 max-w-md border border-gray-200 animate-fadeIn">
          <div className="flex items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-gray-900">Continue your booking</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Please log in or create an account to secure your reservation. Your dates and details have been saved.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    localStorage.setItem('postAuthRedirect', JSON.stringify({
                      pathname: location.pathname,
                      state: { price, checkIn, checkOut, guests, total, nights, propertyId }
                    }));
                    navigate('/auth/login', { state: { from: location, bookingAttempt: true } });
                  }}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    localStorage.setItem('postAuthRedirect', JSON.stringify({
                      pathname: location.pathname,
                      state: { price, checkIn, checkOut, guests, total, nights, propertyId }
                    }));
                    navigate('/auth/signup', { state: { from: location, bookingAttempt: true } });
                  }}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ), {
        duration: Infinity,
        position: 'top-center'
      });
      return;
    }

    // ✅ Save booking data to localStorage for terms & conditions page
    const bookingData = {
      propertyId,
      propertyTitle,
      price,
      checkIn,
      checkOut,
      guests,
      nights,
      total,
      cleaningFee,
      serviceFee,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('booking_pending', JSON.stringify(bookingData));
    
    navigate('/property/terms&conditions', { 
      state: { 
        booking: bookingData,
        fromProperty: true 
      } 
    });
  };

  const incrementGuests = () => {
    if (guests < maxGuestsLimit) setGuests(prev => prev + 1);
  };

  const decrementGuests = () => {
    if (guests > 1) setGuests(prev => prev - 1);
  };

  return (
    <div className="w-full max-w-[380px] bg-white p-5 rounded-2xl border border-gray-200 shadow-sm font-sans">
      <div className="text-center mb-4">
        <span className="text-2xl md:text-3xl font-bold text-[#1e293b]">${price}</span>
        <span className="text-gray-500 text-sm ml-1">/ night</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative border border-gray-200 rounded-xl p-3 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider">Check-in</label>
            <div className="flex items-center justify-between mt-1">
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-[14px] text-[#1e293b] outline-none bg-transparent appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="relative border border-gray-200 rounded-xl p-3 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider">Check-out</label>
            <div className="flex items-center justify-between mt-1">
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-[14px] text-[#1e293b] outline-none bg-transparent appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="relative border border-gray-200 rounded-xl p-3 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition">
          <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider">Guests</label>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[14px] text-[#1e293b]">
              {guests} guest{guests !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={decrementGuests}
                disabled={guests <= 1}
                className="w-5 h-5 flex items-center justify-center text-gray-500 border rounded-full disabled:opacity-30 bg-gray-50 hover:bg-gray-100 transition"
                aria-label="Decrease guests"
              >
                −
              </button>
              <button
                type="button"
                onClick={incrementGuests}
                disabled={guests >= maxGuestsLimit}
                className="w-5 h-5 flex items-center justify-center text-gray-500 border rounded-full disabled:opacity-30 bg-gray-50 hover:bg-gray-100 transition"
                aria-label="Increase guests"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {nights > 0 && (
          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-[14px] text-[#1e293b]">
              <span>${price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
              <span className="font-medium">${price * nights}</span>
            </div>
            <div className="flex justify-between text-[14px] text-[#1e293b]">
              <span>Cleaning fee</span>
              <span className="font-medium">${cleaningFee}</span>
            </div>
            <div className="flex justify-between text-[14px] text-[#1e293b]">
              <span>Service fee</span>
              <span className="font-medium">${serviceFee}</span>
            </div>
            
            <div className="border-t border-gray-100 my-2"></div>
            
            <div className="flex justify-between items-center text-[16px] font-bold text-[#1e293b]">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        )}

        <div className="pt-3">
          <button
            type="submit"
            disabled={nights <= 0}
            className={`w-full font-semibold py-3 rounded-xl text-[15px] transition shadow-sm ${
              nights > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Book Now
          </button>
          <p className="text-center text-[12px] text-gray-500 mt-2">You won't be charged yet</p>
        </div>
      </form>
    </div>
  );
}