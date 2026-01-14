import React from 'react';
import { Link } from 'react-router';


import { RiCalendarCheckFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";

const QuickActions = () => {
  const baseStyle = {
    flex: 1,
    padding: '16px 20px',
    textDecoration: 'none',
    background: '#fff',
    borderRadius: '16px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px', 
    cursor: 'pointer'
  };

  const hoverStyle = {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
  };

  const iconWrapper = (color) => ({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${color}10`,
    boxShadow: `0 4px 10px ${color}20`
  });

  const iconStyle = (color) => ({
    color: color,
    fontSize: '22px'
  });

  const textStyle = (color) => ({
    color: color,
    fontWeight: '600',
    fontSize: '15px',
    whiteSpace: 'nowrap'
  });

  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>Quick Actions</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link
          to="/bookings"
          style={baseStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
        >
          <div style={iconWrapper('#3B82F6')}>
            <RiCalendarCheckFill style={iconStyle('#3B82F6')} />
          </div>
          <span style={textStyle('#3B82F6')}>My Bookings</span>
        </Link>

        <Link
          to="/favorites"
          style={baseStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
        >
          <div style={iconWrapper('#EF4444')}>
            <AiOutlineHeart style={iconStyle('#EF4444')} />
          </div>
          <span style={textStyle('#EF4444')}>Favorites</span>
        </Link>

        <Link
          to="/profile"
          style={baseStyle}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = '';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
        >
          <div style={iconWrapper('#8B5CF6')}>
            <FaRegUser style={iconStyle('#8B5CF6')} />
          </div>
          <span style={textStyle('#8B5CF6')}>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;