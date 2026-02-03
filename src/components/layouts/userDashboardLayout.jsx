import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../userDashboard/userSidebar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = () => {
  const { currentUser } = useAuth();
  const userName = currentUser ? [currentUser.firstName, currentUser.lastName].filter(Boolean).join(' ') : '';
  const userEmail = currentUser?.email || '';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <UserSidebar />
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <Outlet context={{ userName, userEmail }} />
      </main>
    </div>
  );
};

export default DashboardLayout;