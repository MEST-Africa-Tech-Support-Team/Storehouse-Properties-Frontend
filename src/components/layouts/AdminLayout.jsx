import React, { useEffect, useState } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../adminDashboard/adminSidebar";
import { RiDownloadLine, RiAddCircleLine, RiArrowLeftSLine, RiShieldUserLine } from "react-icons/ri";

const AdminLayout = () => {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("storehouse_user"));
    if (stored) setAdmin(stored);
  }, []);

  const getHeaderContent = () => {
    const path = location.pathname;

    // 1. DYNAMIC REVIEW PAGE (When viewing a specific pending booking)
    if (path.includes("review-booking")) {
      return {
        title: "Review Booking Request",
        subtitle: "Carefully verify guest details and property availability",
        // action: (
        //   <button 
        //     onClick={() => navigate("/admin/recent-bookings")} 
        //     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] text-sm font-bold text-[#6B7280] hover:text-[#1E5EFF] transition-all shadow-sm"
        //   >
        //     <RiArrowLeftSLine size={18} />
        //     Back to Pending List
        //   </button>
        // ),
      };
    }

    // 2. RECENT BOOKINGS (The list of pending requests)
    if (path.includes("recent-bookings")) {
      return {
        title: "Pending Approvals",
        subtitle: "You have new reservation requests that require action",
        action: (
          <div className="flex items-center gap-2 bg-[#FFF7ED] px-4 py-2 rounded-lg border border-[#FFEDD5]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[11px] font-bold text-[#9A3412] uppercase tracking-wider">Action Required</span>
          </div>
        ),
      };
    }

    // 3. SPECIFIC USER DETAIL
    if (/\/admin\/users\/.+/.test(path)) {
      return {
        title: "User Profile",
        subtitle: "Detailed overview of customer activity and account status",
        // action: (
        //   <button 
        //     onClick={() => navigate("/admin/users")} 
        //     className="flex items-center gap-1 text-sm font-bold text-[#1E5EFF] hover:underline"
        //   >
        //     <RiArrowLeftSLine size={18} />
        //     Back to Users List
        //   </button>
        // ),
      };
    }

    // 4. ADD PROPERTY PAGE
    if (path.includes("properties/add")) {
      return {
        title: "Add New Property",
        subtitle: "List a new property by filling out the information below",
        action: null,
      };
    }

    // 5. GENERAL CATEGORIES
    if (path.includes("properties")) {
      return {
        title: "Properties",
        subtitle: "Manage, review, and organize all property listings",
        action: (
          <Link 
            to="/admin/properties/add" 
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white hover:bg-hover transition-all shadow-md font-semibold text-sm"
          >
            <RiAddCircleLine className="text-lg" />
            Add New Property
          </Link>
        ),
      };
    }

    if (path.includes("bookings")) {
      return {
        title: "Bookings",
        subtitle: "Manage and monitor all property reservations",
        action: null,
      };
    }

    if (path.includes("users")) {
      return {
        title: "Users",
        subtitle: "View and manage registered customers",
        action: null,
      };
    }

    if (path.includes("analytics")) {
      return {
        title: "Analytics",
        subtitle: "Understand platform performance at a glance",
        action: (
          <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[#1a1a1a] hover:bg-gray-50 transition-all shadow-sm font-semibold text-sm">
            <RiDownloadLine className="text-lg" />
            Export
          </button>
        ),
      };
    }

    if (path.includes("settings")) {
      return {
        title: "Admin Settings",
        subtitle: "Configure global platform behavior and preferences",
        action: null,
      };
    }

    // DEFAULT: Dashboard Overview
    return {
      title: "Dashboard Overview",
      subtitle: "Monitor platform activity and performance at a glance",
      action: (
        <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[#1a1a1a] hover:bg-gray-50 transition-all shadow-sm font-semibold text-sm">
          <RiDownloadLine className="text-lg" />
          Export
        </button>
      ),
    };
  };

  const { title, subtitle, action } = getHeaderContent();

  return (
    <div className="flex min-h-screen bg-[#F4F8FF]">
      <AdminSidebar userName={admin.name} userEmail={admin.email} />

      <div className="flex-1 lg:pl-64 flex flex-col">
        <header className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a1a]">{title}</h1>
              <p className="text-[#6B7280] text-sm mt-0.5 font-medium">
                {subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">{action}</div>
          </div>
        </header>

        <main className="p-6 md:p-8">
          <Outlet context={{ adminName: admin.name, adminEmail: admin.email }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;