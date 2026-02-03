import React, { useState, useMemo, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import UserSidebar from '../../components/userDashboard/userSidebar.jsx';
import FilterBar from '../../components/userDashboard/filterBar.jsx';
import BookingCard from '../../components/userDashboard/bookingCard.jsx';
import LoadMoreButton from '../../components/userDashboard/loadMoreButton.jsx';
import ActiveBookingCard from '../../components/userDashboard/activeBookingCard.jsx';
import authService from '../../services/authService';

const BookingsPage = () => {
  const { userName } = useOutletContext();

  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;
  const [hasMore, setHasMore] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);

  const [filterStatus, setFilterStatus] = useState('All');
  const [filterChildren, setFilterChildren] = useState('All');
  const [sortMode, setSortMode] = useState('date'); // 'date', 'price-desc', 'price-asc'
  const [loading, setLoading] = useState(false);

  const normalizeList = (data) => Array.isArray(data) ? data : (data.bookings || data.list || []);

  const fetchBookings = async (opts = { page: 1, append: false }) => {
    const { page: p, append } = opts;
    setLoading(true);
    try {
      const token = authService.getToken();
      if (!token) throw new Error('Authentication required');

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/bookings/me?page=${p}&limit=${PAGE_SIZE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Failed to load bookings (${res.status})`);
      }

      const body = await res.json();
      const list = normalizeList(body);

      setBookings(prev => (append ? [...prev, ...list] : list));
      setHasMore(list.length === PAGE_SIZE);
      setPage(p);

      // compute active booking (nearest upcoming confirmed)
      const combined = append ? [...bookings, ...list] : list;
      const upcoming = combined
        .filter(b => (b.status || '').toLowerCase() === 'confirmed')
        .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
      setActiveBooking(upcoming[0] || combined[0] || null);
    } catch (err) {
      console.error('fetchBookings:', err);
      toast.error(err.message || 'Failed to load bookings');
      // leave bookings as-is (no dummy injection)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings({ page: 1, append: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Apply filters and sorting **without mutating original bookings**
  const filteredAndSorted = useMemo(() => {
    let result = [...bookings];

    // Apply filters
    result = result.filter(booking => {
      const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
      const matchesChildren = filterChildren === 'All' ||
        (filterChildren === 'true' && booking.childrenAllowed === true) ||
        (filterChildren === 'false' && booking.childrenAllowed === false);
      return matchesStatus && matchesChildren;
    });

    // Apply sorting
    result.sort((a, b) => {
      if (sortMode === 'date') {
        const dateA = new Date(a.checkIn.split(', ')[0]);
        const dateB = new Date(b.checkIn.split(', ')[0]);
        return dateB - dateA; // newest first
      } else if (sortMode === 'price-desc') {
        return b.price - a.price;
      } else if (sortMode === 'price-asc') {
        return a.price - b.price;
      }
      return 0;
    });

    return result;
  }, [bookings, filterStatus, filterChildren, sortMode]);

  const handleSortChange = (mode) => {
    setSortMode(mode);
  };

  const handleLoadMore = async () => {
    if (!hasMore) {
      toast('No more bookings');
      return;
    }
    await fetchBookings({ page: page + 1, append: true });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <UserSidebar />
      <div className="w-full p-6 max-w-[1400px] px-4 sm:px-6 lg:px-8 lg:ml-64">

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-1">Manage your reservations and view important property details.</p>
        </div>

        {/* Active booking (if any) */}
        {activeBooking && (
          <div className="mb-6">
            <ActiveBookingCard booking={activeBooking} />
          </div>
        )}

        {/* Empty state */}
        {!loading && bookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">You haven't booked any properties yet.</p>
            <Link to="/explore" className="mt-4 inline-block px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Explore properties</Link>
          </div>
        )}

        <FilterBar
          onStatusChange={setFilterStatus}
          onChildrenChange={setFilterChildren}
          onSortChange={handleSortChange}
        />

        <div className="space-y-4">
          {filteredAndSorted.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>

        {filteredAndSorted.length > 0 && (
          <LoadMoreButton onClick={handleLoadMore} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default BookingsPage;