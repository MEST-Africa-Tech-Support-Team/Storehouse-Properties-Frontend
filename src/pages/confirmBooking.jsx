import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from 'react-hot-toast';
import BookingSummary from "../components/property/bookingSummary.jsx";
import GuestInformation from "../components/property/guestInformation.jsx";
import { authService } from "../services/authService";

export default function CompleteBookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fromState = location.state?.booking;
    if (fromState) {
      setBooking(fromState);
      return;
    }

    const pending = localStorage.getItem('booking_pending');
    if (pending) {
      try {
        setBooking(JSON.parse(pending));
      } catch (err) {
        console.error('Invalid booking_pending', err);
      }
    }
  }, [location.state]);

  const handleFormSubmit = async (guestData) => {
    if (!booking) {
      toast.error('Missing booking details. Please reselect dates and try again.');
      return;
    }

    setLoading(true);

    try {
      const token = authService.getToken();
      const propertyId = booking.propertyId || booking.propertyId || booking.propertyId || booking.propertyId;
      const endpoint = `${import.meta.env.VITE_API_BASE_URL}/bookings/${propertyId}`;

      const fd = new FormData();
      fd.append('propertyId', propertyId);
      fd.append('checkIn', booking.checkIn);
      fd.append('checkOut', booking.checkOut);
      fd.append('guests', booking.guests);
      fd.append('price', booking.price || booking.pricePerNight || 0);
      fd.append('nights', booking.nights || 0);
      fd.append('total', booking.total || 0);

      fd.append('fullName', guestData.fullName);
      fd.append('email', guestData.email);
      fd.append('phone', guestData.phone);
      fd.append('country', guestData.country || '');
      fd.append('arrivalTime', guestData.arrivalTime || '');
      fd.append('specialRequests', guestData.specialRequests || '');

      if (guestData.idDocuments && guestData.idDocuments.length) {
        guestData.idDocuments.forEach((file, idx) => {
          fd.append('idDocuments', file, file.name || `id-${idx}`);
        });
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: fd,
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(result.message || `Booking failed (${res.status})`);
      }

      const confirmed = result.booking || result.data || result;
      const key = `booking_confirmed_${confirmed.id || propertyId || Date.now()}`;
      localStorage.setItem(key, JSON.stringify(confirmed));

      localStorage.removeItem('booking_pending');

      setBooking(confirmed);

      toast.success('Booking confirmed — check your email for details');

      navigate(window.location.pathname, { replace: true, state: { booking: confirmed } });
    } catch (err) {
      console.error('Booking error:', err);
      toast.error(err.message || 'Failed to complete booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors group"
          >
            <IoMdArrowBack className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium group-hover:underline">Back to Properties</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">Complete your booking</h1>
        <p className="text-gray-500 mb-6">Provide the details required to reserve this property.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 px-4">
          <div className="lg:col-span-2">
            {!booking ? (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-600">No booking found — please select dates on the property page first.</p>
                <div className="mt-4">
                  <Link to="/explore" className="text-sm text-primary hover:underline">Back to properties</Link>
                </div>
              </div>
            ) : (
              <GuestInformation
                onSubmit={handleFormSubmit}
                property={{ name: booking.propertyTitle || booking.title, image: booking.image }}
                checkIn={booking.checkIn}
                checkOut={booking.checkOut}
                guests={booking.guests}
                pricePerNight={booking.price || booking.pricePerNight}
              />
            )}
          </div>

          <div className="static">
            <BookingSummary booking={booking} />
          </div>
        </div>
      </div>
    </div>
  );
}