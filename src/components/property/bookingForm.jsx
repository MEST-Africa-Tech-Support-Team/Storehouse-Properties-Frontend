import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

export default function BookingForm({ price = 180 }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const cleaningFee = 25;
  const serviceFee = 35;

  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      if (outDate <= inDate) {
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
      toast.error('Please select check-in and check-out dates');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      toast.error('Check-out must be after check-in');
      return;
    }
    navigate('/property/:id/terms&conditions', {
      state: { price, checkIn, checkOut, guests, total, nights },
    });
  };

  const incrementGuests = () => {
    if (guests < 6) setGuests(guests + 1);
  };

  const decrementGuests = () => {
    if (guests > 1) setGuests(guests - 1);
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
                className="w-5 h-5 flex items-center justify-center text-gray-500  border rounded-full disabled:opacity-30 bg-gray-50"
                aria-label="Decrease guests"
              >
                −
              </button>
              <button
                type="button"
                onClick={incrementGuests}
                disabled={guests >= 10}
                className="w-5 h-5 flex items-center justify-center text-gray-500 border rounded-full disabled:opacity-30 bg-gray-50"
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
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow'
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