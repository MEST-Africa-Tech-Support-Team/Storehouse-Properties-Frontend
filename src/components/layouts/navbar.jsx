import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from 'react-hot-toast';
import { Avatar } from "@/components/ui/avatar";
import { MdDashboard, MdSettings, MdLogout } from "react-icons/md";
import Logo from "../../images/storehouse-logo.png";

const getInitials = (user) => {
  if (!user) return "U";
  const first = user.firstName?.charAt(0) || user.email?.charAt(0) || "U";
  const last = user.lastName?.charAt(0) || user.email?.charAt(1) || "U";
  return (first + last).toUpperCase();
};

export default function Header() {
  const { currentUser, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const publicRoutes = [
    { path: "/", label: "Home" },
    { path: "/explore", label: "Explore" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const buttonClasses =
    "px-4 py-1.5 bg-primary text-white text-sm font-medium " +
    "rounded-full hover:bg-hover transition duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Signed out — see you soon 👋', { id: 'signed-out', duration: 3000 });
      navigate("/");
      setDropdownOpen(false);
      setMobileMenuOpen(false);
    } catch (err) {
      console.error('Logout failed', err);
      toast.error(err?.message || 'Failed to sign out — please try again', { duration: 4000 });
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (loading) return null;

  const displayName =
    currentUser?.firstName && currentUser?.lastName
      ? `${currentUser.firstName} ${currentUser.lastName}`
      : currentUser?.email?.split("@")[0] || "User";

  const initials = getInitials(currentUser);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-1.5 text-xl font-bold text-gray-900"
        >
          <img src={Logo} alt="Storehouse Logo" className="h-10 w-auto brightness-0" />
          Storehouse
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {publicRoutes.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition-colors ${
                isActive(path)
                  ? "text-black-800 font-bold"
                  : "text-gray-600 hover:text-black-800"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <Avatar
                  name={displayName}
                  src={currentUser?.profilePhoto || null}
                  fallback={initials}
                  size="md"
                />
                <span className="text-gray-900 text-sm font-medium">
                  {displayName}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <MdDashboard className="text-gray-500" />
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <MdSettings className="text-gray-500" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition100 transition-colors"
                  >
                    <MdLogout className="text-red-600" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-gray-700 hover:text-primary text-sm font-medium"
              >
                Sign In
              </Link>
              <Link to="/auth/signup" className={buttonClasses}>
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 backdrop-blur-md bg-black/20 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 text-xl font-bold text-gray-900"
              >
                <img src={Logo} alt="Storehouse Logo" className="h-6 w-6" />
                Storehouse
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {currentUser && (
              <div className="mt-4 flex items-center gap-3">
                <Avatar
                  name={displayName}
                  src={currentUser?.profilePhoto || null}
                  fallback={initials}
                  size="md"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{displayName}</div>
                  <div className="text-xs text-gray-500">{currentUser.email}</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1 px-6 py-4 overflow-y-auto">
            <nav className="space-y-1">
              {publicRoutes.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(path)
                      ? "bg-light-primary/30 text-primary"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200">
              {currentUser ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <MdDashboard className="text-gray-500" />
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <MdSettings className="text-gray-500" />
                    <span className="font-medium">Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <MdLogout className="text-red-500" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/auth/login"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-center rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 text-center rounded-lg bg-primary text-white font-medium hover:bg-hover"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Storehouse
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}