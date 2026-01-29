import React, { useState } from "react";
import {
  RiSearchLine,
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiFilter3Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminBookingsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Data for the table
  const bookingsData = [
    {
      id: "#BK-2334",
      property: "Sunset Villa",
      location: "Miami Beach, FL",
      customer: "Alex Johnson",
      checkIn: "Jan 15, 2025",
      checkOut: "Jan 22, 2025",
      guests: "2 Adults / 1 Child",
      children: "YES",
      status: "confirmed",
      payment: "paid",
      amount: "$3,434",
    },
    {
      id: "#BK-2335",
      property: "Modern Studio",
      location: "Berlin, Germany",
      customer: "Sarah Williams",
      checkIn: "Feb 01, 2025",
      checkOut: "Feb 05, 2025",
      guests: "1 Adult",
      children: "NO",
      status: "canceled",
      payment: "refunded",
      amount: "$1,200",
    },
    {
      id: "#BK-2336",
      property: "Mountain Retreat",
      location: "Aspen, CO",
      customer: "Michael Chen",
      checkIn: "Mar 10, 2025",
      checkOut: "Mar 15, 2025",
      guests: "2 Adults / 2 Children",
      children: "YES",
      status: "confirmed",
      payment: "paid",
      amount: "$5,650",
    },
    {
      id: "#BK-2337",
      property: "Urban Loft",
      location: "London, UK",
      customer: "Emma Watson",
      checkIn: "Apr 20, 2025",
      checkOut: "Apr 25, 2025",
      guests: "2 Adults",
      children: "NO",
      status: "confirmed",
      payment: "paid",
      amount: "$2,100",
    },
    {
      id: "#BK-2338",
      property: "Beachfront Condo",
      location: "Malibu, CA",
      customer: "David Miller",
      checkIn: "May 05, 2025",
      checkOut: "May 12, 2025",
      guests: "2 Adults / 1 Child",
      children: "YES",
      status: "canceled",
      payment: "refunded",
      amount: "$4,200",
    },
    {
      id: "#BK-2339",
      property: "Parisian Suite",
      location: "Paris, France",
      customer: "Sophie Martin",
      checkIn: "Jun 12, 2025",
      checkOut: "Jun 18, 2025",
      guests: "2 Adults",
      children: "NO",
      status: "confirmed",
      payment: "paid",
      amount: "$3,800",
    },
    {
      id: "#BK-2340",
      property: "Lakeside Cabin",
      location: "Lake Tahoe, NV",
      customer: "Robert Brown",
      checkIn: "Jul 01, 2025",
      checkOut: "Jul 08, 2025",
      guests: "4 Adults / 2 Children",
      children: "YES",
      status: "confirmed",
      payment: "paid",
      amount: "$6,120",
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
                placeholder="Search by booking ID, customer, property..."
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
            className={`${showFilters ? "flex" : "hidden"} lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            <FilterSelect
              label="Booking Status"
              options={[
                { value: "confirmed", label: "Confirmed" },
                { value: "canceled", label: "Canceled" },
              ]}
            />
            <FilterSelect
              label="Payment Status"
              options={[
                { value: "paid", label: "Paid" },
                { value: "refunded", label: "Refunded" },
              ]}
            />
            <FilterSelect
              label="Children"
              options={[
                { value: "yes", label: "Children: Yes" },
                { value: "no", label: "Children: No" },
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
                  "Booking ID",
                  "Property",
                  "Customer",
                  "Dates",
                  "Guests",
                  "Children",
                  "Status",
                  "Payment",
                  "Amount",
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
              {bookingsData.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-bold text-[#1e5eff]">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#1a1a1a] text-sm">
                      {booking.property}
                    </div>
                    <div className="text-xs text-[#6B7280]">
                      {booking.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#1a1a1a]">
                    {booking.customer}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[13px] text-[#1a1a1a] font-medium">
                      {booking.checkIn}
                    </div>
                    <div className="text-xs text-[#6B7280] flex items-center gap-1">
                      <RiArrowRightLine size={12} /> {booking.checkOut}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-[#1a1a1a]">
                    {booking.guests}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-md text-[10px] font-bold ${
                        booking.children === "YES"
                          ? "bg-[#1E5EFF] text-white"
                          : "bg-[#F3F4F6] text-[#1a1a1a]"
                      }`}
                    >
                      {booking.children}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        booking.status === "confirmed"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#FEE2E2] text-[#B91C1C]"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        booking.payment === "paid"
                          ? "bg-[#DCFCE7] text-[#15803D]"
                          : "bg-[#F3F4F6] text-[#1a1a1a]"
                      }`}
                    >
                      {booking.payment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#1a1a1a]">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/bookings/${booking.id.replace("#", "")}`}
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
        <p className="text-sm text-[#6B7280] font-medium text-center sm:text-left">
          Showing{" "}
          <span className="text-[#1a1a1a] font-bold">
            {bookingsData.length}
          </span>{" "}
          of <span className="text-[#1a1a1a] font-bold">247</span> bookings
        </p>
        <div className="flex items-center gap-2">
          <PaginationButton icon={<RiArrowLeftSLine />} disabled />
          <PaginationButton label="1" active />
          <PaginationButton label="2" />
          <PaginationButton label="3" />
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

export default AdminBookingsPage;
