import React, { useEffect, useState } from "react";
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiFilter3Line,
  RiUserLine,
  RiLoader4Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 8;

  // --- NEW FILTER STATES ---
  const [statusFilter, setStatusFilter] = useState("");
  const [bookingFilter, setBookingFilter] = useState("");

  useEffect(() => {
    const fetchUsersSummary = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const API_BASE = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(`${API_BASE}/users/summary/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
        const data = await response.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error("Failed to load users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersSummary();
  }, []);

  // --- UPDATED FILTER & SEARCH LOGIC ---
  const filteredUsers = users.filter((user) => {
    // 1. Search Query Logic
    const fullName = (user.username || "").toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId?.toString().includes(searchQuery);

    // 2. Status Filter Logic
    const matchesStatus = statusFilter === "" || user.status === statusFilter;

    // 3. Booking Filter Logic (Checks if totalBookings > 0)
    const hasBookings = (user.totalBookings || 0) > 0;
    const matchesBooking = 
      bookingFilter === "" || 
      (bookingFilter === "yes" ? hasBookings : !hasBookings);

    return matchesSearch && matchesStatus && matchesBooking;
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, bookingFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setBookingFilter("");
  };

  return (
    <div className="space-y-6">
      {/* SEARCH & FILTERS */}
      <section className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2.5 bg-white border border-[#E5E7EB] rounded-lg"
            >
              <RiFilter3Line size={20} />
            </button>
          </div>

          <div className={`${showFilters ? "flex" : "hidden"} lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-3`}>
            {/* Status Filter */}
            <FilterSelect 
              label="All Status" 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "active", label: "Active" },
                { value: "suspended", label: "Suspended" },
              ]} 
            />
            {/* Booking Filter */}
            <FilterSelect 
              label="Has Bookings" 
              value={bookingFilter}
              onChange={(e) => setBookingFilter(e.target.value)}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]} 
            />
            
            <button 
              onClick={resetFilters}
              className="text-xs font-bold text-[#1E5EFF] hover:underline px-2"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* DATA TABLE */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden min-h-[400px] relative">
        {loading ? (
          <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-50">
            <RiLoader4Line className="animate-spin text-[#1E5EFF]" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  {["User", "Email", "Phone", "Total Bookings", "Total Spent", "Last Booking", "Status", "Actions"].map((head) => (
                    <th key={head} className="px-6 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {currentItems.length > 0 ? (
                  currentItems.map((user) => (
                    <tr key={user.userId} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1E5EFF]"><RiUserLine size={16} /></div>
                          <div>
                            <div className="font-bold text-[#1a1a1a] text-sm">{user.username}</div>
                            <div className="text-[10px] text-[#6B7280] font-bold">ID: {user.userId?.slice(-6).toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{user.email}</td>
                      <td className="px-6 py-4 text-sm font-medium">{user.phone || "—"}</td>
                      <td className="px-6 py-4 text-sm font-bold">{user.totalBookings || 0}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#1E5EFF]">${user.totalSpent?.toLocaleString() || "0"}</td>
                      <td className="px-6 py-4 text-sm font-medium">{user.lastBooking ? new Date(user.lastBooking).toLocaleDateString() : "Never"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === "active" ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEE2E2] text-[#B91C1C]"}`}>
                          {user.status || "active"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/admin/users/${user.userId}`} className="text-[#1E5EFF] font-bold text-sm hover:underline">View</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8" className="py-20 text-center text-gray-400">No users match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* PAGINATION */}
      {!loading && filteredUsers.length > 0 && (
        <div className="px-6 py-5 bg-white rounded-xl border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280]">
            Showing <span className="text-[#1a1a1a] font-bold">{indexOfFirstItem + 1}</span> to <span className="text-[#1a1a1a] font-bold">{Math.min(indexOfLastItem, filteredUsers.length)}</span> of <span className="text-[#1a1a1a] font-bold">{filteredUsers.length}</span> users
          </p>
          <div className="flex items-center gap-2">
            <PaginationButton icon={<RiArrowLeftSLine />} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, i) => (
              <PaginationButton key={i} label={i + 1} active={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)} />
            ))}
            <PaginationButton icon={<RiArrowRightSLine />} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const FilterSelect = ({ label, options, value, onChange }) => (
  <div className="relative flex-1 lg:min-w-[160px]">
    <select 
      value={value}
      onChange={onChange}
      className="appearance-none w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 pr-10 text-sm font-semibold text-[#1a1a1a] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 transition-all"
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
  </div>
);

const PaginationButton = ({ label, icon, active, disabled, onClick }) => (
  <button onClick={onClick} disabled={disabled} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold border ${active ? "bg-[#1E5EFF] border-[#1E5EFF] text-white" : "bg-white border-[#E5E7EB] text-[#1a1a1a] hover:bg-gray-50"} ${disabled ? "opacity-30" : ""}`}>
    {label || icon}
  </button>
);

export default AdminUsersPage;