import React, { useEffect, useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import AdminSidebar from "../adminDashboard/adminSidebar";
import { RiDownloadLine, RiAddCircleLine } from "react-icons/ri";

const AdminLayout = () => {
  const [admin, setAdmin] = useState({ name: "", email: "" });
  const location = useLocation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("storehouse_user"));
    if (stored) setAdmin(stored);
  }, []);

 const getHeaderContent = () => {
  const path = location.pathname;

  if (path.includes("properties/add")) {
    return {
      title: "Add New Property",
      subtitle: "List a new property by filling out the information below",
      action: null, 
    };
  }

  if (path.includes("properties")) {
    return {
      title: "Properties",
      subtitle: "Manage, review, and organize all property listings",
      action: (
        <Link 
          to="/admin/properties/add" 
          className="flex items-center gap-2 bg-[#1E5EFF] px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all shadow-md font-semibold text-sm"
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
          <Outlet
            context={{ adminName: admin.name, adminEmail: admin.email }}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
