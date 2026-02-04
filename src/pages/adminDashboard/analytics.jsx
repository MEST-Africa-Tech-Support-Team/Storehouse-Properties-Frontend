import React from "react";
import { 
  RiHome4Line, 
  RiMoneyDollarCircleLine, 
  RiCalendarCheckLine, 
  RiUserLine,
  RiArrowUpSLine,
  RiArrowUpLine,
  RiMore2Line
} from "react-icons/ri";

const AdminAnalyticsPage = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. TOP METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={<RiHome4Line />} 
          iconBg="#1E5EFF" 
          value="1,234" 
          label="Total Properties" 
          growth="+12.5%" 
        />
        <MetricCard 
          icon={<RiMoneyDollarCircleLine />} 
          iconBg="#16A34A" 
          value="$2,343" 
          label="Total Earnings" 
          growth="+1.5%" 
        />
        <MetricCard 
          icon={<RiCalendarCheckLine />} 
          iconBg="#1E5EFF" // Set to blue as per pattern or preferred icon color
          value="843" 
          label="All Time Bookings" 
          growth="+14.5%" 
        />
        <MetricCard 
          icon={<RiUserLine />} 
          iconBg="#D97706" 
          value="843" 
          label="Registered Users" 
          growth="+5.5%" 
        />
      </div>

      {/* 2. GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Overview Graph (Left - 2/3 width) */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#1a1a1a]">User Overview</h3>
              <p className="text-xs text-[#6B7280] font-medium">Platform traffic and user engagement</p>
            </div>
            <select className="bg-gray-50 border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-bold text-[#4B5563] outline-none">
              <option>Months</option>
              <option>Days</option>
              <option>Years</option>
            </select>
          </div>

          {/* Graph Visualization Placeholder */}
          <div className="relative h-64 w-full flex items-end gap-2">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 h-full flex flex-col justify-between text-[10px] font-bold text-[#9CA3AF] pb-6">
              <span>50k</span><span>10k</span><span>1k</span><span>500</span><span>100</span><span>00</span>
            </div>

            {/* Simulated Curved Area Chart */}
            <div className="ml-10 w-full h-full relative overflow-hidden group">
              <svg viewBox="0 0 400 100" className="w-full h-full preserve-3d">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CFDFF7" />
                    <stop offset="100%" stopColor="#CFDFF7" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Curved Path */}
                <path 
                  d="M0,80 Q50,20 100,50 T200,30 T300,60 T400,10 L400,100 L0,100 Z" 
                  fill="url(#chartGradient)" 
                />
                <path 
                  d="M0,80 Q50,20 100,50 T200,30 T300,60 T400,10" 
                  fill="none" 
                  stroke="#0E5FD9" 
                  strokeWidth="2.5" 
                />
              </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[10px] font-bold text-[#9CA3AF]">
              <span>Nov 01</span><span>Nov 10</span><span>Nov 20</span><span>Nov 30</span>
            </div>
          </div>
        </div>

        {/* Active Visitors Graph (Right - 1/3 width) */}
       {/* Active Visitors Graph (Right - 1/3 width) */}
<div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col">
  <div className="flex justify-between items-start mb-4">
    <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider">Active Visitors</h3>
    <div className="flex items-center gap-1 text-[#0FAF62] bg-[#DCFCE7] px-2 py-0.5 rounded-full text-[10px] font-bold">
       <span className="relative flex h-2 w-2 mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0FAF62] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0FAF62]"></span>
       </span>
       Live
    </div>
  </div>
  
  <div className="flex items-baseline gap-2 mb-8">
    <span className="text-4xl font-black text-[#1a1a1a] tracking-tight">4,291</span>
    <span className="text-xs font-bold text-[#0FAF62] flex items-center gap-0.5">
      <RiArrowUpLine /> 6.7%
    </span>
  </div>

  {/* Slim Capsule Graph Visualization */}
  <div className="flex items-end justify-between h-32 gap-3 px-1 mt-auto">
    {[30, 55, 45, 90, 65, 85, 40, 70, 50].map((height, i) => (
      <div key={i} className="flex-1 flex flex-col items-center h-full group cursor-pointer">
        <div className="relative w-1.5 h-full bg-[#F0F6FF] rounded-full overflow-hidden">
          {/* Progress fill */}
          <div 
            className="absolute bottom-0 left-0 w-full bg-[#0E5FD9] rounded-full transition-all duration-700 ease-out group-hover:bg-[#1E5EFF] group-hover:shadow-[0_0_12px_rgba(14,95,217,0.5)]" 
            style={{ height: `${height}%` }}
          ></div>
        </div>
        {/* Day Label (Optional) */}
        <span className="text-[8px] font-bold text-[#9CA3AF] mt-3 group-hover:text-[#0E5FD9] transition-colors">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M', 'T'][i]}
        </span>
      </div>
    ))}
  </div>
</div>
      </div>

      {/* 3. TOP PERFORMING PROPERTIES */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#1a1a1a]">Top Performing Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PropertyCard 
            name="The Royal Heights" 
            bookings="420" 
            revenue="834,343" 
            logoBg="bg-blue-100 text-blue-600"
          />
          <PropertyCard 
            name="Serene Vista Apartments" 
            bookings="312" 
            revenue="512,120" 
            logoBg="bg-emerald-100 text-emerald-600"
          />
          <PropertyCard 
            name="Skyline Luxury Suite" 
            bookings="285" 
            revenue="490,000" 
            logoBg="bg-amber-100 text-amber-600"
          />
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const MetricCard = ({ icon, iconBg, value, label, growth }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
    <div className="flex justify-between items-start">
      <div 
        className="p-3 rounded-xl text-white shadow-lg" 
        style={{ backgroundColor: iconBg }}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="text-[#16A34A] flex items-center text-xs font-bold">
        {growth} <RiArrowUpLine className="ml-1" />
      </div>
    </div>
    <div className="mt-4">
      <h4 className="text-2xl font-bold text-[#1a1a1a]">{value}</h4>
      <p className="text-sm font-bold text-[#6B7280]">{label}</p>
    </div>
  </div>
);

const PropertyCard = ({ name, bookings, revenue, logoBg }) => (
  <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border border-white shadow-sm ${logoBg}`}>
      {name.charAt(0)}
    </div>
    <div className="flex-1">
      <h4 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#1E5EFF] transition-colors">{name}</h4>
      <div className="flex items-center gap-2 text-[11px] font-bold text-[#6B7280] mt-0.5">
        <span>{bookings} Bookings</span>
        <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
        <span className="text-[#1a1a1a]">${Number(revenue).toLocaleString()} Revenue</span>
      </div>
    </div>
  </div>
);

export default AdminAnalyticsPage;