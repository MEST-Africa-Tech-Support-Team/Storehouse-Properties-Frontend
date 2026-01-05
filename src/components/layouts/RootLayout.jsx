import React from 'react';
import { AuthProvider } from '../../context/AuthContext';
import Header from './navbar';
import Footer from './footer';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
    </AuthProvider>
  );
}