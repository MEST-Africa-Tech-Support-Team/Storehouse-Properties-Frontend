import React from 'react';
import Header from './navbar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../scrollToTop';

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <ScrollToTop />
         <Outlet />
        {children}
      </main>
      <Footer />
    </div>
  );
}
