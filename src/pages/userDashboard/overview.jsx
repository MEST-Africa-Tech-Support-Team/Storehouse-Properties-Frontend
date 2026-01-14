import React from 'react';
import { useOutletContext } from 'react-router';
import WelcomeHeader from '../../components/userDashboard/welcomeHeader';
import ActiveBookingCard from '../../components/userDashboard/activeBookingCard';
import RecentActivity from '../../components/userDashboard/recentActivity';
import QuickActions from '../../components/userDashboard/quickAction';
import CTASection from '../../components/userDashboard/userCTA';

const UserDashboardOverview = () => {
  const { userName } = useOutletContext();

  return (
    <>
      <WelcomeHeader userName={userName} />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', margin: '24px 0' }}>
        <div>
          <ActiveBookingCard />
          <QuickActions />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
      <CTASection />
    </>
  );
};

export default UserDashboardOverview;