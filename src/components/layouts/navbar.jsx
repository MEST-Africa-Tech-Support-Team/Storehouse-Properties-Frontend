// src/components/layout/navbar.jsx
import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '@/components/ui/avatar';

export default function Header() {
  const { currentUser, logout } = useAuth();

  // Button-like classes for "Create Account" link
  const buttonClasses = 
    'px-4 py-1.5 bg-blue-600 text-white text-sm font-medium ' +
    'rounded-full hover:bg-blue-700 transition duration-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 text-xl font-bold text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2l-7 7-7 7" />
            </svg>
            StoreHouse
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/properties" className="text-gray-700 hover:text-blue-600">Explore</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              // ✅ Logged In: Show Avatar + Name
              <div className="flex items-center gap-2">
                <Avatar 
                  src={currentUser.avatar} 
                  name={currentUser.name} 
                  size="md"
                />
                <span className="hidden md:inline text-gray-700 text-sm">
                  {currentUser.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              // ✅ Not Logged In: Sign In + Styled "Create Account" Link
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 text-sm"
                >
                  Sign In
                </Link>
                <Link to="/register" className={buttonClasses}>
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}