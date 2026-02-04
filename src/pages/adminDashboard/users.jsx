import React, { useState } from "react";
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiFilter3Line,
  RiUserLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminUsersPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample User Data
  const usersData = [
    {
      id: "USR-9921",
      name: "Alex Johnson",
      email: "alex.j@example.com",
      phone: "+1 (555) 000-1234",
      totalBookings: 12,
      totalSpent: "$14,240",
      lastBooking: "Jan 12, 2025",
      status: "active",
    },
    {
      id: "USR-9922",
      name: "Sarah Williams",
      email: "s.williams@web.com",
      phone: "+44 20 7123 4567",
      totalBookings: 2,
      totalSpent: "$1,200",
      lastBooking: "Feb 01, 2025",
      status: "active",
    },
    {
      id: "USR-9923",
      name: "Michael Chen",
      email: "m.chen@tech.io",
      phone: "+852 2123 4567",
      totalBookings: 24,
      totalSpent: "$45,650",
      lastBooking: "Mar 10, 2025",
      status: "suspended",
    },
    {
      id: "USR-9924",
      name: "Emma Watson",
      email: "emma.w@cinema.com",
      phone: "+1 (555) 999-8888",
      totalBookings: 5,
      totalSpent: "$8,100",
      lastBooking: "Apr 20, 2025",
      status: "active",
    },
  ];

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
                placeholder="Search by name, email, or user ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2.5 bg-white border border-[#E5E7EB] rounded-lg text-[#1a1a1a]"
            >
              <RiFilter3Line size={20} />
            </button>
          </div>

          <div
            className={`${
              showFilters ? "flex" : "hidden"
            } lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            <FilterSelect
              label="All Status"
              options={[
                { value: "active", label: "Active" },
                { value: "suspended", label: "Suspended" },
              ]}
            />
            <FilterSelect
              label="Has Bookings"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            <FilterSelect
              label="Reg. Month"
              options={[
                { value: "01", label: "January" },
                { value: "02", label: "February" },
                { value: "03", label: "March" },
                // ... add others
              ]}
            />

            <div className="flex items-center gap-3">
              <button className="flex-1 lg:flex-none bg-[#1E5EFF] text-white px-6 py-2.5 rounded-lg font-bold text-xs hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                Apply
              </button>
              <button className="text-xs font-bold text-[#1E5EFF] hover:underline whitespace-nowrap px-2">
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DATA VIEW (Table) */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                {[
                  "User",
                  "Email",
                  "Phone",
                  "Total Bookings",
                  "Total Spent",
                  "Last Booking",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-4 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {usersData.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#6B7280]">
                        <RiUserLine size={16} />
                      </div>
                      <div>
                        <div className="font-bold text-[#1a1a1a] text-sm">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-[#6B7280] font-bold">
                          {user.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#4B5563]">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#4B5563]">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#1a1a1a]">
                    {user.totalBookings}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#1E5EFF]">
                    {user.totalSpent}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#4B5563]">
                    {user.lastBooking}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        user.status === "active"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#FEE2E2] text-[#B91C1C]"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="text-[#1E5EFF] font-bold text-sm hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PAGINATION SECTION */}
      <div className="px-6 py-5 bg-white rounded-xl border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#6B7280] font-medium">
          Showing <span className="text-[#1a1a1a] font-bold">{usersData.length}</span>{" "}
          of <span className="text-[#1a1a1a] font-bold">1,240</span> users
        </p>
        <div className="flex items-center gap-2">
          <PaginationButton icon={<RiArrowLeftSLine />} disabled />
          <PaginationButton label="1" active />
          <PaginationButton label="2" />
          <PaginationButton icon={<RiArrowRightSLine />} />
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE COMPONENTS ---

const FilterSelect = ({ label, options }) => (
  <div className="relative flex-1 lg:min-w-[160px]">
    <select className="appearance-none w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 pr-10 text-sm font-semibold text-[#1a1a1a] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] transition-all">
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
      <RiArrowDownSLine size={18} />
    </div>
  </div>
);

const PaginationButton = ({ label, icon, active, disabled }) => (
  <button
    disabled={disabled}
    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all border ${
      active
        ? "bg-[#1E5EFF] border-[#1E5EFF] text-white"
        : "bg-white border-[#E5E7EB] text-[#1a1a1a] hover:bg-gray-50"
    } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
  >
    {label || icon}
  </button>
);

export default AdminUsersPage;