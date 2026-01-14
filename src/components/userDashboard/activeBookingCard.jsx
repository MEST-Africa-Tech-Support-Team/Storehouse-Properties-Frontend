import React from 'react';
import { Link } from 'react-router';

import { IoLocationOutline } from "react-icons/io5";
import { IoIosCalendar } from "react-icons/io";

const ActiveBookingCard = () => {
  const booking = {
    id: 1,
    title: "Skyline Luxury Apartment",
    location: "Downtown Manhattan, New York",
    checkIn: "Dec 20, 2024",
    checkOut: "Dec 27, 2024",
    nights: 7,
    status: "Confirmed",
    image: "https://via.placeholder.com/200x150?text=Apartment"
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      display: 'flex',
      gap: '20px',
      alignItems: 'center'
    }}>
      <img
        src={booking.image}
        alt={booking.title}
        style={{
          width: '120px',
          height: '90px',
          objectFit: 'cover',
          borderRadius: '12px',
          flexShrink: 0
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: '20px',
          fontWeight: '600',
          color: '#111'
        }}>
          {booking.title}
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '12px',
          color: '#666',
          fontSize: '14px'
        }}>
          <IoLocationOutline size={16} />
          {booking.location}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px',
          fontSize: '14px',
          color: '#666'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IoIosCalendar size={18} color="#0066ff" />
            <div>
              <div style={{ fontSize: '12px', color: '#888' }}>Check-in</div>
              <div style={{ fontWeight: '600', color: '#111' }}>{booking.checkIn}</div>
            </div>
          </div>

          <span style={{ fontSize: '16px', color: '#ccc' }}>→</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <IoIosCalendar size={18} color="#0066ff" />
            <div>
              <div style={{ fontSize: '12px', color: '#888' }}>Check-out</div>
              <div style={{ fontWeight: '600', color: '#111' }}>{booking.checkOut}</div>
            </div>
          </div>

          <div style={{
            width: '1px',
            height: '32px',
            backgroundColor: '#eee',
            margin: '0 16px'
          }}></div>

          <div style={{
            textAlign: 'right',
            fontSize: '14px',
            color: '#666'
          }}>
            <div style={{ fontSize: '12px' }}>Total Nights</div>
            <div style={{ fontWeight: '600', color: '#111' }}>{booking.nights} nights</div>
          </div>
        </div>

        <div style={{
          display: 'inline-block',
          padding: '4px 12px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '12px'
        }}>
          {booking.status}
        </div>

        <Link
          to={`/booking/${booking.id}`}
          style={{
            display: 'block',
            width: '100%',
            padding: '12px 20px',
            backgroundColor: '#0066ff',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '24px',
            textAlign: 'center',
            fontWeight: '600',
            fontSize: '15px',
            transition: 'background-color 0.2s',
            marginTop: '8px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0055d4'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0066ff'}
        >
          View Booking Details
        </Link>
      </div>
    </div>
  );
};

export default ActiveBookingCard;