import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Compute initials safely
const getInitials = (user) => {
  if (!user) return 'U';
  const first = user.firstName?.charAt(0) || user.email?.charAt(0) || 'U';
  const last = user.lastName?.charAt(0) || user.email?.charAt(1) || 'U';
  return (first + last).toUpperCase();
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const init = () => {
      const token = authService.getToken();
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser({ ...user, initials: getInitials(user) });
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const result = await authService.login(credentials); // returns { user, token }
      const user = result.user;
      const userWithInitials = { ...user, initials: getInitials(user) };
      setCurrentUser(userWithInitials);
      localStorage.setItem('user', JSON.stringify(user));
      return { user: userWithInitials };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setCurrentUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
