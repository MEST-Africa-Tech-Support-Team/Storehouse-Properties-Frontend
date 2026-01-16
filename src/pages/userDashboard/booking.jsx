import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router';

import UserSidebar from '../../components/userDashboard/userSidebar.jsx';
import FilterBar from '../../components/userDashboard/filterBar.jsx';
import BookingCard from '../../components/userDashboard/bookingCard.jsx';
import LoadMoreButton from '../../components/userDashboard/loadMoreButton.jsx';

const BookingsPage = () => {
  const { userName } = useOutletContext();

  const [bookings, setBookings] = useState([
    {
      id: 1,
      title: "Downtown Luxury Suite",
      location: "Manhattan, New York",
      checkIn: "Jan 15, 2024",
      checkOut: "Jan 20, 2024",
      guests: "2 adults, 1 child",
      status: "Confirmed",
      price: 1250,
      childrenAllowed: true,
      image: "https://images.unsplash.com/photo-1560448204-e62e497b1d04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      action: "Cancel"
    },
    {
      id: 2,
      title: "Mountain Retreat Cabin",
      location: "Aspen, Colorado",
      checkIn: "Feb 10, 2024",
      checkOut: "Feb 15, 2024",
      guests: "2 adults",
      status: "Pending",
      price: 890,
      childrenAllowed: false,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      action: "Cancel"
    },
    {
      id: 3,
      title: "Oceanfront Villa",
      location: "Miami Beach, Florida",
      checkIn: "Dec 20, 2023",
      checkOut: "Dec 27, 2023",
      guests: "4 adults, 2 children",
      status: "Completed",
      price: 2100,
      childrenAllowed: true,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      action: "Review"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('All');
  const [filterChildren, setFilterChildren] = useState('All');
  const [sortMode, setSortMode] = useState('date'); // 'date', 'price-desc', 'price-asc'
  const [loading, setLoading] = useState(false);

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

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setBookings(prev => [
        ...prev,
        {
          id: prev.length + 1,
          title: "Desert Oasis Villa",
          location: "Scottsdale, Arizona",
          checkIn: "Mar 1, 2024",
          checkOut: "Mar 5, 2024",
          guests: "3 adults",
          status: "Confirmed",
          price: 1500,
          childrenAllowed: true,
          image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          action: "Cancel"
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex">
      <UserSidebar />
      <div className="ml-64 p-6 max-w-[1400px] w-full">

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-1">Manage your reservations and view important property details.</p>
        </div>

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