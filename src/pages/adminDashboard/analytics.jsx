import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  RiHome4Line, 
  RiMoneyDollarCircleLine, 
  RiCalendarCheckLine, 
  RiUserLine,
  RiArrowUpLine,
  RiLoader4Line
} from "react-icons/ri";

const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [topProperties, setTopProperties] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const API_BASE = import.meta.env.VITE_API_BASE_URL;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        // 1. Concurrent API Calls
        const [summaryRes, topPropsRes, growthRes] = await Promise.all([
          fetch(`${API_BASE}/analytics`, { method: "GET", headers }),
          fetch(`${API_BASE}/analytics/top-properties`, { method: "GET", headers }),
          fetch(`${API_BASE}/analytics/user-growth`, { method: "GET", headers })
        ]);

        if (!summaryRes.ok || !topPropsRes.ok || !growthRes.ok) 
          throw new Error("Failed to synchronize analytics data");

        const summaryData = await summaryRes.json();
        const topPropsData = await topPropsRes.json();
        const growthData = await growthRes.json();

        setAnalytics(summaryData);
        setTopProperties(topPropsData);
        setUserGrowth(growthData); 
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <RiLoader4Line className="animate-spin text-[#1E5EFF]" size={40} />
        <p className="text-sm font-medium text-gray-500">Syncing platform data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8">
      
      {/* SECTION 1: TOP METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={<RiHome4Line />} 
          iconBg="#1E5EFF" 
          value={analytics?.totalProperties?.toLocaleString() || "0"} 
          label="Total Properties" 
          growth="+12.5%" 
        />
        <MetricCard 
          icon={<RiMoneyDollarCircleLine />} 
          iconBg="#16A34A" 
          value={`₵${(analytics?.totalEarnings || 0).toLocaleString()}`} 
          label="Total Earnings" 
          growth="+1.5%" 
        />
        <MetricCard 
          icon={<RiCalendarCheckLine />} 
          iconBg="#1E5EFF" 
          value={analytics?.totalBookings?.toLocaleString() || "0"} 
          label="All Time Bookings" 
          growth="+14.5%" 
        />
        <MetricCard 
          icon={<RiUserLine />} 
          iconBg="#D97706" 
          value={analytics?.totalUsers?.toLocaleString() || "0"} 
          label="Registered Users" 
          growth="+5.5%" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 2: USER OVERVIEW GRAPH (SVG Dummy Data) */}
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#1a1a1a]">User Overview</h3>
              <p className="text-xs text-[#6B7280] font-medium">Platform traffic and user engagement</p>
            </div>
            <select className="bg-gray-50 border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-bold text-[#4B5563] outline-none">
              <option>Months</option><option>Days</option><option>Years</option>
            </select>
          </div>
          <div className="relative h-64 w-full flex items-end gap-2">
            <div className="absolute left-0 h-full flex flex-col justify-between text-[10px] font-bold text-[#9CA3AF] pb-6">
              <span>50k</span><span>10k</span><span>1k</span><span>500</span><span>100</span><span>00</span>
            </div>
            <div className="ml-10 w-full h-full relative overflow-hidden group">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path d="M0,80 Q50,20 100,50 T200,30 T300,60 T400,10 L400,100 L0,100 Z" fill="#CFDFF7" opacity="0.3" />
                <path d="M0,80 Q50,20 100,50 T200,30 T300,60 T400,10" fill="none" stroke="#0E5FD9" strokeWidth="2.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* SECTION 3: USER GROWTH CHART */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-wider">User Growth</h3>
            <div className="flex items-center gap-1 text-[#0FAF62] bg-[#DCFCE7] px-2 py-0.5 rounded-full text-[10px] font-bold">
               <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0FAF62] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0FAF62]"></span>
               </span>
               Live
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-4xl font-black text-[#1a1a1a] tracking-tight">
              {analytics?.totalUsers?.toLocaleString() || "0"}
            </span>
            <span className="text-xs font-bold text-[#0FAF62] flex items-center gap-0.5">
              <RiArrowUpLine /> 5.5%
            </span>
          </div>

          <div className="flex items-end justify-between h-32 gap-3 px-1 mt-auto">
            {userGrowth?.length > 0 ? (
              userGrowth.slice(-7).map((data, i) => {
                const val = typeof data === 'number' ? data : (data.count || 0);
                const label = data.day || ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i % 7];
                const maxVal = Math.max(...userGrowth.map(d => typeof d === 'number' ? d : (d.count || 0)), 10);
                const barHeight = (val / maxVal) * 100;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center h-full group cursor-pointer">
                    <div className="relative w-1.5 h-full bg-[#F0F6FF] rounded-full overflow-hidden">
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-[#0E5FD9] rounded-full transition-all duration-700" 
                        style={{ height: `${barHeight}%` }}
                      ></div>
                    </div>
                    <span className="text-[8px] font-bold text-[#9CA3AF] mt-3 group-hover:text-[#0E5FD9]">
                      {label}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-[10px] text-gray-400 pb-10">No growth data found</p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 4: TOP PERFORMING PROPERTIES */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#1a1a1a]">Top Performing Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topProperties.length > 0 ? (
            topProperties.map((prop, idx) => (
              <PropertyCard 
                key={prop._id || idx}
                name={prop.hotelName} 
                bookings={prop.totalBookings} 
                revenue={prop.totalRevenue} 
                logoBg={idx === 0 ? "bg-blue-100 text-blue-600" : idx === 1 ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No property data reported yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const MetricCard = ({ icon, iconBg, value, label, growth }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">
    <div className="flex justify-between items-start">
      <div className="p-3 rounded-xl text-white shadow-lg" style={{ backgroundColor: iconBg }}>
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
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg border border-white shadow-sm flex-shrink-0 ${logoBg}`}>
      {name?.charAt(0) || "P"}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#1E5EFF] transition-colors truncate">{name}</h4>
      <div className="flex items-center gap-2 text-[11px] font-bold text-[#6B7280] mt-0.5">
        <span>{bookings} Bookings</span>
        <span className="w-1 h-1 bg-[#D1D5DB] rounded-full"></span>
        <span className="text-[#1a1a1a] truncate">₵{Number(revenue).toLocaleString()} Rev</span>
      </div>
    </div>
  </div>
);

export default AdminAnalyticsPage;