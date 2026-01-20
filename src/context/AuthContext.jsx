// import { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom'; 

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// const getInitials = (name) => {
//   if (!name) return '?';
//   return name
//     .split(' ')
//     .map(part => part[0]?.toUpperCase())
//     .join('')
//     .substring(0, 2) || '?';
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('storehouse_user');
//     if (storedUser) {
//       try {
//         const user = JSON.parse(storedUser);
//         user.initials = getInitials(user.name);
//         setCurrentUser(user);
//       } catch (e) {
//         console.warn('Invalid user data in localStorage. Clearing.');
//         localStorage.removeItem('storehouse_user');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = useCallback((email, name, avatar = null) => {
//     const user = {
//       id: Date.now().toString(), 
//       email,
//       name,
//       avatar,
//       initials: getInitials(name),
//       role: 'user',
//     };
//     setCurrentUser(user);
//     localStorage.setItem('storehouse_user', JSON.stringify(user));
//   }, []);

//   const logout = useCallback(() => {
//     setCurrentUser(null);
//     localStorage.removeItem('storehouse_user');
//     navigate('/'); 
//   }, [navigate]);

//   const value = {
//     currentUser,
//     login,
//     logout,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage once
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("storehouse_user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        user.initials = getInitials(user.name);
        setCurrentUser(user);
      }
    } catch (error) {
      console.warn("Invalid user data. Clearing storage.");
      localStorage.removeItem("storehouse_user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((email, name, avatar = null, role = "user") => {
    const user = {
      id: Date.now().toString(),
      email,
      name,
      avatar,
      role,
      initials: getInitials(name),
    };

    setCurrentUser(user);
    localStorage.setItem("storehouse_user", JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("storehouse_user");
  }, []);

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
