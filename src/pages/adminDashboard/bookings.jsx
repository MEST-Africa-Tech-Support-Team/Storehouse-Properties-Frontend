import React, { useEffect, useState } from "react";
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiFilter3Line,
  RiLoader4Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminBookingsPage = () => {
  // 1. STATE MANAGEMENT
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. FETCH DATA FROM API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const API_URL = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(`${API_URL}/bookings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch bookings");

        const data = await response.json();
        // Adjust based on your API response structure (e.g., data.bookings or just data)
        setBookings(Array.isArray(data) ? data : data.bookings || []);
      } catch (err) {
        console.error("Booking Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // 3. FILTER LOGIC
  const filteredBookings = bookings.filter((booking) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      booking._id?.toLowerCase().includes(searchStr) ||
      booking.customerName?.toLowerCase().includes(searchStr) ||
      booking.propertyTitle?.toLowerCase().includes(searchStr)
    );
  });

  return (
    <div className="space-y-6">
      {/* SEARCH & FILTERS SECTION */}
      <section className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, customer, or property..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 transition-all"
              />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden p-2.5 bg-white border border-[#E5E7EB] rounded-lg text-[#1a1a1a]">
              <RiFilter3Line size={20} />
            </button>
          </div>

          <div className={`${showFilters ? "flex" : "hidden"} lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-3`}>
            <FilterSelect label="Booking Status" options={[{ value: "confirmed", label: "Confirmed" }, { value: "pending", label: "Pending" }, { value: "canceled", label: "Canceled" }]} />
            <FilterSelect label="Payment" options={[{ value: "paid", label: "Paid" }, { value: "pending", label: "Pending" }]} />
            <div className="flex items-center gap-3">
              <button className="flex-1 lg:flex-none bg-[#1E5EFF] text-white px-6 py-2.5 rounded-lg font-bold text-xs hover:bg-blue-700 transition-all shadow-md">Apply</button>
              <button className="text-xs font-bold text-[#1E5EFF] hover:underline px-2" onClick={() => setSearchQuery("")}>Reset</button>
            </div>
          </div>
        </div>
      </section>

      {/* DATA VIEW (Table) */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden min-h-[300px] relative">
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
            <RiLoader4Line className="animate-spin text-[#1E5EFF]" size={32} />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                {["Booking ID", "Property", "Customer", "Dates", "Guests", "Status", "Payment", "Amount", "Actions"].map((head) => (
                  <th key={head} className="px-6 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs font-bold text-[#1e5eff]">#{booking._id?.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#1a1a1a] text-sm">{booking.property?.title || "Property"}</div>
                      <div className="text-xs text-[#6B7280]">{booking.property?.location || "Location"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1a1a1a]">{booking.user?.firstName} {booking.user?.lastName}</td>
                    <td className="px-6 py-4">
                      <div className="text-[13px] text-[#1a1a1a] font-medium">{new Date(booking.checkIn).toLocaleDateString()}</div>
                      <div className="text-xs text-[#6B7280] flex items-center gap-1"><RiArrowRightLine size={12} /> {new Date(booking.checkOut).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-[#1a1a1a]">{booking.guests?.adults} Adults {booking.guests?.children > 0 && `/ ${booking.guests.children} Children`}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyles(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.paymentStatus === "paid" ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#F3F4F6] text-[#1a1a1a]"}`}>
                        {booking.paymentStatus || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#1a1a1a]">${booking.totalPrice?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Link to={`/admin/bookings/${booking._id}`} className="text-[#1E5EFF] font-bold text-sm hover:underline">View</Link>
                    </td>
                  </tr>
                ))
              ) : (
                !loading && (
                  <tr>
                    <td colSpan="9" className="text-center py-20 text-gray-400 font-medium">No bookings found.</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* PAGINATION SECTION */}
      <div className="px-6 py-5 bg-white rounded-xl border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#6B7280] font-medium">
          Showing <span className="text-[#1a1a1a] font-bold">{filteredBookings.length}</span> of <span className="text-[#1a1a1a] font-bold">{bookings.length}</span> bookings
        </p>
        <div className="flex items-center gap-2">
          <PaginationButton icon={<RiArrowLeftSLine />} disabled />
          <PaginationButton label="1" active />
          <PaginationButton icon={<RiArrowRightSLine />} />
        </div>
      </div>
    </div>
  );
};

// Helper for dynamic colors
const getStatusStyles = (status) => {
  switch (status) {
    case "confirmed": return "bg-[#DCFCE7] text-[#15803D]";
    case "pending": return "bg-[#FEF3C7] text-[#D97706]";
    case "canceled": return "bg-[#FEE2E2] text-[#B91C1C]";
    default: return "bg-gray-100 text-gray-600";
  }
};

const FilterSelect = ({ label, options }) => (
  <div className="relative flex-1 lg:min-w-[160px]">
    <select className="appearance-none w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 pr-10 text-sm font-semibold text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 transition-all">
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
      <RiArrowDownSLine size={18} />
    </div>
  </div>
);

const PaginationButton = ({ label, icon, active, disabled }) => (
  <button disabled={disabled} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold border ${active ? "bg-[#1E5EFF] border-[#1E5EFF] text-white" : "bg-white border-[#E5E7EB] text-[#1a1a1a] hover:bg-gray-50"} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}>
    {label || icon}
  </button>
);

export default AdminBookingsPage;