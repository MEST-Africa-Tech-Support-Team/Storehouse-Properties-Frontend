import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '@/components/ui/avatar';
import { MdHome, MdDashboard, MdSettings, MdLogout } from 'react-icons/md';

// ✅ Compute initials safely
const getInitials = (user) => {
  if (!user) return 'U';
  const first = user.firstName?.charAt(0) || user.email?.charAt(0) || 'U';
  const last = user.lastName?.charAt(0) || user.email?.charAt(1) || 'U';
  return (first + last).toUpperCase();
};

export default function Header() {
  const { currentUser, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const publicRoutes = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const buttonClasses =
    'px-4 py-1.5 bg-blue-600 text-white text-sm font-medium ' +
    'rounded-full hover:bg-blue-700 transition duration-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setDropdownOpen(false);
  };

  // Wait for AuthContext loading
  if (loading) return null;

  // ✅ Safe display name with fallbacks
  const displayName = currentUser?.firstName && currentUser?.lastName
    ? `${currentUser.firstName} ${currentUser.lastName}`
    : currentUser?.email?.split('@')[0] || 'User';

  // ✅ Compute initials on-the-fly (don't rely on stored initials)
  const initials = getInitials(currentUser);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1.5 text-xl font-bold text-gray-900">
          <MdHome className="h-6 w-6 text-blue-600" />
          Storehouse
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {publicRoutes.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm font-medium transition-colors ${
                isActive(path) ? 'text-gray-950 font-bold' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <Avatar 
                  name={displayName} 
                  src={null} 
                  fallback={initials} 
                  size="md" 
                />
                <span className="hidden md:inline text-gray-900 text-sm font-medium">
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
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <MdLogout className="text-gray-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/auth/login" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                Sign In
              </Link>
              <Link to="/auth/signup" className={buttonClasses}>
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}