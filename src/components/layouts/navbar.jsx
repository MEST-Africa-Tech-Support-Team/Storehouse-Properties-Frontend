import React from 'react';
import { Link, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '@/components/ui/avatar';
import { MdHome } from "react-icons/md";

const getInitials = (name) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export default function Header() {
  const { currentUser, logout } = useAuth();
  const location = useLocation(); 

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

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-xl font-bold text-gray-900">
            <MdHome className="h-6 w-6 text-blue-600" />
            StoreHouse
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {publicRoutes.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium transition-colors ${
                  isActive(path)
                    ? 'text-gray-900 font-bold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Avatar 
                  name={currentUser.name || 'User'} 
                  src={null}
                  fallback={getInitials(currentUser.name || 'U')}
                  size="md"
                />
                <span className="hidden md:inline text-gray-900 text-sm font-medium">
                  {currentUser.name.split(' ')[0]}
                </span>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link to="/signup" className={buttonClasses}>
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