// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Provide a helpful dev-only diagnostic and a safe fallback so the app doesn't crash
    if (process.env.NODE_ENV !== 'production') {
      const err = new Error('useAuth must be used within AuthProvider — returning a fallback so app can continue. Check stack to find the caller.');
      // Log the error (stack shows the offending component)
      // eslint-disable-next-line no-console
      console.error(err);
    }

    // Non-throwing fallback to avoid hard crashes in production builds where
    // a component might mistakenly call useAuth outside the provider.
    return {
      currentUser: null,
      logout: () => {},
      loading: true,
      refreshAuth: () => {},
    };
  }
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
  const [authVersion, setAuthVersion] = useState(0); 

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (window.__AUTH_PROVIDER_MOUNTED) {
          console.warn('Multiple AuthProvider instances detected — this can cause context mismatch.');
        }
        window.__AUTH_PROVIDER_MOUNTED = true;
      }
    } catch (e) {
    }
    return () => {
      try {
        if (typeof window !== 'undefined') window.__AUTH_PROVIDER_MOUNTED = false;
      } catch (e) {
      }
    };
  }, []);

  const initializeAuth = async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        authService.logout();
        setCurrentUser(null);
        return;
      }

      // Fetch fresh profile from /users/me so names & role are always current
      let user = null;
      try {
        user = await authService.getProfile();
      } catch (_) {
        // Network issue — fall back to cached data
      }

      if (!user) {
        user = authService.getCurrentUser();
      }

      if (user) {
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

  useEffect(() => {
    initializeAuth();
  }, [authVersion]);

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setAuthVersion(prev => prev + 1); 
  };

  const refreshAuth = () => {
    setAuthVersion(prev => prev + 1);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout, loading, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};