import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import UserSidebar from '../userDashboard/userSidebar';

const DashboardLayout = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored) {
      setUser(stored);
    }
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <UserSidebar userName={user.name} userEmail={user.email} />
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <Outlet context={{ userName: user.name, userEmail: user.email }} />
      </main>
    </div>
  );
};

export default DashboardLayout;