import React from 'react';
import { Link } from 'react-router';

import { RiDashboardLine } from "react-icons/ri";
import { RiCalendarCheckFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { TbProgressHelp } from "react-icons/tb";

const UserSidebar = ({ userName, userEmail }) => {
  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderRadius: '8px',
    margin: '4px 0'
  };

  const activeStyle = { ...linkStyle, backgroundColor: '#e0f0ff', color: '#0066ff', fontWeight: 'bold' };

  return (
    <aside style={{ width: '250px', background: '#fff', borderRight: '1px solid #eee', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0066ff', marginBottom: '24px' }}>Storehouse</div>
        <nav>
          <Link to="/dashboard" style={activeStyle}>
            <RiDashboardLine /> Overview
          </Link>
          <Link to="/bookings" style={linkStyle}>
            <RiCalendarCheckFill /> My Bookings
          </Link>
          <Link to="/favorites" style={linkStyle}>
            <AiOutlineHeart /> Favorites
          </Link>
          <Link to="/profile" style={linkStyle}>
            <FaRegUser /> Profile
          </Link>
          <Link to="/support" style={linkStyle}>
            <TbProgressHelp /> Support / Help
          </Link>
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <img src="https://via.placeholder.com/40" alt="User" style={{ borderRadius: '50%' }} />
        <div>
          <div>{userName}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{userEmail}</div>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;