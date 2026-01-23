// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const getInitials = (user) => {
  if (!user) return 'U';
  const first = user.firstName?.charAt(0) || user.email?.charAt(0) || 'U';
  const last = user.lastName?.charAt(0) || user.email?.charAt(1) || 'U';
  return (first + last).toUpperCase();
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authVersion, setAuthVersion] = useState(0); // ✅ Track auth changes

  const initializeAuth = () => {
    try {
      const token = authService.getToken();
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser({ ...user, initials: getInitials(user) });
      } else {
        authService.logout();
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Auth init error:', error);
      authService.logout();
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Re-initialize when authVersion changes
  useEffect(() => {
    initializeAuth();
  }, [authVersion]);

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setAuthVersion(prev => prev + 1); // ✅ Force re-initialization
  };

  // ✅ Expose refresh function
  const refreshAuth = () => {
    setAuthVersion(prev => prev + 1);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout, loading, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};