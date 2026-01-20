import React from 'react';
import { 
  RiDownloadLine, 
  RiDashboardLine, 
  RiCalendarCheckLine, 
  RiArrowRightLine,
  RiArrowUpLine,
  RiAddCircleLine,
  RiSettings4Line,
  RiTeamLine,
  RiBuilding2Line,
  RiMoneyDollarCircleLine
} from "react-icons/ri";
import { FaUsers, FaArrowRight } from "react-icons/fa6";
import { MdOutlineChevronRight } from "react-icons/md";

const AdminOverviewPage = () => {
  // Dummy Data for Table
  const recentBookings = [
    { id: '#BK-8824', property: 'Ocean View Villa', customer: 'Sarah Jenkins', date: 'Oct 24, 2025', status: 'Confirmed', amount: '$1,200' },
    { id: '#BK-8825', property: 'Modern Loft', customer: 'Michael Chen', date: 'Oct 23, 2025', status: 'Canceled', amount: '$850' },
    { id: '#BK-8826', property: 'Mountain Retreat', customer: 'Emma Wilson', date: 'Oct 22, 2025', status: 'Confirmed', amount: '$2,100' },
    { id: '#BK-8827', property: 'Urban Studio', customer: 'James Cooper', date: 'Oct 21, 2025', status: 'Confirmed', amount: '$450' },
  ];

  return (
    <div className="min-h-screen  pb-12">
      {/* 1. HEADER SECTION */}
    

      <div className="space-y-8">
        
        {/* 2. ANALYSIS CARDS SECTION */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-[#1E5EFF]">
              <RiBuilding2Line size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#1a1a1a]">1,247</h3>
            <p className="text-[#6B7280] text-sm font-medium mt-1">Active listings</p>
            <div className="flex items-center gap-1 mt-4 text-[#16A34A] text-sm font-bold">
              <RiArrowUpLine />
              <span>12% from last month</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-[#16A34A]">
              <RiCalendarCheckLine size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#1a1a1a]">8,942</h3>
            <p className="text-[#6B7280] text-sm font-medium mt-1">All time bookings</p>
            <div className="flex items-center gap-1 mt-4 text-[#16A34A] text-sm font-bold">
              <RiArrowUpLine />
              <span>8% from last month</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-[#9333EA]">
              <FaUsers size={22} />
            </div>
            <h3 className="text-3xl font-bold text-[#1a1a1a]">15,384</h3>
            <p className="text-[#6B7280] text-sm font-medium mt-1">Registered customers</p>
            <div className="flex items-center gap-1 mt-4 text-[#16A34A] text-sm font-bold">
              <RiArrowUpLine />
              <span>24% from last month</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-[#F59E0B]">
              <RiMoneyDollarCircleLine size={24} />
            </div>
            <h3 className="text-3xl font-bold text-[#1a1a1a]">$2.4M</h3>
            <p className="text-[#6B7280] text-sm font-medium mt-1">Completed payments</p>
            <div className="flex items-center gap-1 mt-4 text-[#16A34A] text-sm font-bold">
              <RiArrowUpLine />
              <span>18% from last month</span>
            </div>
          </div>
        </section>

        {/* 3. TABLE & QUICK ACTIONS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Recent Bookings</h2>
              <a href="#" className="text-[#1E5EFF] text-sm font-bold flex items-center gap-0.5 hover:underline">
                View all bookings <MdOutlineChevronRight size={20} />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F9FAFB] border-y border-gray-100">
                  <tr className="text-[#6B7280] text-xs uppercase font-bold tracking-wider">
                    <th className="px-6 py-4">Booking ID</th>
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Customers</th>
                    <th className="px-6 py-4">Dates</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentBookings.map((booking, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-[#1a1a1a]">{booking.id}</td>
                      <td className="px-6 py-4 text-sm text-[#1a1a1a]">{booking.property}</td>
                      <td className="px-6 py-4 text-sm text-[#1a1a1a]">{booking.customer}</td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">{booking.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'Confirmed' 
                          ? 'bg-[#F0FDF4] text-[#15803D]' 
                          : 'bg-[#FEF2F2] text-[#B91C1C]'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#1a1a1a]">{booking.amount}</td>
                      <td className="px-6 py-4">
                        <button className="text-[#1E5EFF] font-bold text-sm hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { label: 'Add New Property', icon: <RiAddCircleLine size={20} /> },
                { label: 'View All Bookings', icon: <RiCalendarCheckLine size={20} /> },
                { label: 'Manage Users', icon: <RiTeamLine size={20} /> },
                { label: 'Platform Settings', icon: <RiSettings4Line size={20} /> },
              ].map((action, idx) => (
                <button 
                  key={idx}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-lg border border-gray-100 text-[#1a1a1a] font-semibold transition-all hover:bg-[#1E5EFF] hover:text-white group"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors">
                    {action.icon}
                  </span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PERFORMANCE SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
          {/* Top Performing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Top Performing Properties</h2>
            <div className="space-y-6">
              {[
                { name: 'Skyline Penthouse', bookings: 42, revenue: '$12,400', color: 'bg-blue-100' },
                { name: 'Cedar Wood Cabin', bookings: 38, revenue: '$9,800', color: 'bg-green-100' },
                { name: 'Azure Beach House', bookings: 35, revenue: '$15,200', color: 'bg-purple-100' },
              ].map((prop, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${prop.color} rounded-lg flex items-center justify-center`}>
                      <RiBuilding2Line className="text-[#1E5EFF] text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1a1a]">{prop.name}</h4>
                      <p className="text-sm text-[#6B7280] font-medium">{prop.bookings} bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1a1a1a] text-lg">{prop.revenue}</p>
                    <p className="text-xs text-[#16A34A] font-extrabold uppercase tracking-tight">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Low Activity Properties</h2>
            <div className="space-y-4">
              {/* Critical */}
              <div className="bg-[#FEF2F2] p-5 rounded-xl border border-red-50">
                <h4 className="font-bold text-[#1a1a1a]">Garden Cottage</h4>
                <p className="text-sm text-[#DC2626] font-bold mt-1">0 bookings in 30 days</p>
                <a href="#" className="text-[#1E5EFF] text-sm font-bold flex items-center gap-2 mt-3 hover:underline">
                  Review listing <FaArrowRight size={12} />
                </a>
              </div>

              {/* Warning */}
              <div className="bg-[#FFFBEB] p-5 rounded-xl border border-amber-50">
                <h4 className="font-bold text-[#1a1a1a]">City Studio</h4>
                <p className="text-sm text-[#D97706] font-bold mt-1">2 bookings in 30 days</p>
                <a href="#" className="text-[#1E5EFF] text-sm font-bold flex items-center gap-2 mt-3 hover:underline">
                  Review listing <FaArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminOverviewPage;