import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import WelcomeHeader from '../../components/userDashboard/welcomeHeader';
import ActiveBookingCard from '../../components/userDashboard/activeBookingCard';
import RecentActivity from '../../components/userDashboard/recentActivity';
import QuickActions from '../../components/userDashboard/quickAction';
import CTASection from '../../components/userDashboard/userCTA';
import authService from '../../services/authService';

const UserDashboardOverview = () => {
  const { userName } = useOutletContext();
  const [activeBooking, setActiveBooking] = useState(null);

  useEffect(() => {
    const fetchActiveBooking = async () => {
      try {
        const token = authService.getToken();
        if (!token) return;

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookings/me?page=1&limit=20`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return;

        const body = await res.json();
        const bookings = Array.isArray(body) ? body : (body.bookings || body.list || []);

        // Get nearest upcoming confirmed booking
        const upcoming = bookings
          .filter(b => (b.status || '').toLowerCase() === 'confirmed')
          .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
        
        setActiveBooking(upcoming[0] || bookings[0] || null);
      } catch (err) {
        console.error('Failed to fetch active booking:', err);
      }
    };

    fetchActiveBooking();
  }, []);

  return (
    <div className="w-full p-6 max-w-5xl px-4 sm:px-6 lg:px-8 lg:ml-64">
      <WelcomeHeader userName={userName} />

      <div className="mt-6 space-y-6 mb-8">
        {activeBooking && <ActiveBookingCard booking={activeBooking} />}
        <RecentActivity />
        <QuickActions />
      </div>

      <div className="mt-6">
        <CTASection />
      </div>
    </div>
  );
};

export default UserDashboardOverview;