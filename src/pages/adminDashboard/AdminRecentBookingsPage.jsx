import React from "react";
import { 
  RiArrowRightLine, 
  RiArrowLeftSLine, 
  RiArrowRightSLine 
} from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminRecentBookingsPage = () => {
  // Data filtered as per your request (No payment/amount, status forced to pending)
  const recentBookings = [
    {
      id: "#BK-1029",
      property: "Ocean View Villa",
      location: "Miami Beach, FL",
      customer: "Sarah Connor",
      checkIn: "Jan 15, 2025",
      checkOut: "Jan 22, 2025",
      guests: "2 Adults / 1 Child",
      children: "YES",
      status: "pending",
    },
    {
      id: "#BK-1028",
      property: "Mountain Retreat",
      location: "Aspen, CO",
      customer: "John Doe",
      checkIn: "Feb 01, 2025",
      checkOut: "Feb 05, 2025",
      guests: "1 Adult",
      children: "NO",
      status: "pending",
    },
    {
      id: "#BK-1027",
      property: "Urban Loft",
      location: "London, UK",
      customer: "Mike Ross",
      checkIn: "Mar 10, 2025",
      checkOut: "Mar 15, 2025",
      guests: "2 Adults / 2 Children",
      children: "YES",
      status: "pending",
    },
    {
      id: "#BK-1026",
      property: "Cozy Cabin",
      location: "Lake Tahoe, NV",
      customer: "Rachel Zane",
      checkIn: "Apr 20, 2025",
      checkOut: "Apr 25, 2025",
      guests: "2 Adults",
      children: "NO",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
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
                  "Action",
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
              {recentBookings.map((booking) => (
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
                          : "bg-gray-100 text-[#1a1a1a]"
                      }`}
                    >
                      {booking.children}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#FEF3C7] text-[#D97706]">
                      {booking.status}
                    </span>
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

        {/* PAGINATION SECTION */}
        <div className="px-6 py-5 bg-white border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280] font-medium text-center sm:text-left">
            Showing{" "}
            <span className="text-[#1a1a1a] font-bold">
              {recentBookings.length}
            </span>{" "}
            of <span className="text-[#1a1a1a] font-bold">12</span> new bookings
          </p>
          <div className="flex items-center gap-2">
            <PaginationButton icon={<RiArrowLeftSLine />} disabled />
            <PaginationButton label="1" active />
            <PaginationButton label="2" />
            <PaginationButton icon={<RiArrowRightSLine />} />
          </div>
        </div>

        {/* <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <Link
            to="/admin/bookings"
            className="text-xs font-bold text-[#6B7280] hover:text-[#1E5EFF] uppercase tracking-widest transition-colors"
          >
            View All Historical Bookings
          </Link>
        </div> */}
      </section>
    </div>
  );
};

// --- REUSABLE COMPONENTS ---

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

export default AdminRecentBookingsPage;