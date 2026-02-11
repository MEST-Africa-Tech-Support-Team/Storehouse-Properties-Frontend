import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Ensure this path is correct
import { toast } from "react-hot-toast";
import {
  RiDashboardLine,
  RiBarChartBoxLine,
  RiMenuLine,
  RiCloseLine,
  RiCalendarCheckFill,
  RiHistoryLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { FaHouse, FaRegBuilding } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

const AdminSidebar = ({ userName, onLogout }) => {
  const { logout } = useAuth(); // Hook into your global Auth state
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle mobile resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const getInitials = (fullName) => {
    if (!fullName) return "A";
    return fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  // --- INTEGRATED LOGOUT LOGIC ---
  const handleSignOut = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      
      // 1. Call the global logout from Context
      // This clears the Firebase/API session and sets currentUser to null
      await logout(); 

      // 2. Clear local storage safety nets
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData"); 

      // 3. Execute optional callback from Parent (AdminLayout)
      if (onLogout) onLogout();

      // 4. Success UI Feedback
      toast.success("Signed out — see you soon 👋", { id: 'admin-logout' });

      // 5. Close menus and redirect to home
      setShowUserMenu(false);
      setIsOpen(false);
      navigate("/", { replace: true });
      
    } catch (err) {
      console.error('Logout failed', err);
      toast.error(err?.message || 'Failed to sign out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const linkClasses = "flex items-center gap-3 px-4 py-3 rounded-lg no-underline transition-all duration-200";
  const activeClasses = "bg-[#1E5EFF] text-white shadow-md shadow-blue-100 font-semibold";
  const inactiveClasses = "text-gray-600 hover:bg-gray-50 hover:text-[#1E5EFF]";

  const adminNavLinks = [
    { to: "/admin", label: "Overview", icon: <RiDashboardLine className="text-xl" /> },
    { to: "/admin/recent-bookings", label: "Recent Bookings", icon: <RiHistoryLine className="text-xl" /> },
    { to: "/admin/properties", label: "Properties", icon: <FaRegBuilding className="text-lg" /> },
    { to: "/admin/bookings", label: "Bookings", icon: <RiCalendarCheckFill className="text-xl" /> },
    { to: "/admin/users", label: "Users", icon: <HiOutlineUsers className="text-xl" /> },
    { to: "/admin/analytics", label: "Analytics", icon: <RiBarChartBoxLine className="text-xl" /> },
    { to: "/admin/settings", label: "Settings", icon: <IoSettingsOutline className="text-xl" /> },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-5 left-4 z-[30] p-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-600"
      >
        <RiMenuLine size={22} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[40] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-100 p-6 flex flex-col justify-between z-[50]
          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"} 
          lg:translate-x-0 lg:w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between mb-10">
            <Link to="/" className="flex items-center gap-2.5 text-[#1E5EFF] font-bold text-2xl tracking-tight">
              <div className="bg-[#1E5EFF] p-1.5 rounded-lg">
                <FaHouse className="text-white text-lg" />
              </div>
              <span className="text-[#1a1a1a]">Storehouse</span>
            </Link>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400">
              <RiCloseLine size={24} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
            {adminNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`${linkClasses} ${isActive(link.to) ? activeClasses : inactiveClasses}`}
              >
                <span className={isActive(link.to) ? "text-white" : "text-gray-400"}>
                  {link.icon}
                </span>
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Admin User Footer */}
          <div className="mt-auto pt-6 border-t border-gray-100 relative">
            {showUserMenu && (
              <div className="absolute bottom-20 left-0 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button 
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors text-sm font-semibold"
                >
                  <RiLogoutBoxRLine className="text-lg" />
                  {isLoggingOut ? "Signing Out..." : "Sign Out"}
                </button>
              </div>
            )}

            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all border ${
                showUserMenu ? "bg-gray-100 border-gray-200" : "bg-gray-50/50 border-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex-shrink-0 flex items-center justify-center text-[#1E5EFF] font-bold text-sm">
                {getInitials(userName)}
              </div>
              <div className="overflow-hidden text-left">
                <p className="font-bold text-sm text-[#1a1a1a] truncate leading-none mb-1">
                  {userName || "Admin User"}
                </p>
                <p className="text-[11px] text-gray-500 truncate font-medium uppercase tracking-tighter">
                  Administrator
                </p>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for closing user menu dropdown */}
      {showUserMenu && (
        <div className="fixed inset-0 z-[45]" onClick={() => setShowUserMenu(false)} />
      )}
    </>
  );
};

export default AdminSidebar;