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
    <div className="ml-64 p-6 max-w-[1400px]">
      <WelcomeHeader userName={userName} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <ActiveBookingCard />
          <QuickActions />
        </div>
        <div className="space-y-6">
          <RecentActivity />
        </div>
      </div>

      <div className="mt-6">
        <CTASection />
      </div>
    </div>
  );
};

export default UserDashboardOverview;