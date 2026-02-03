import React from 'react';
import { Outlet } from 'react-router-dom'; 
import { Link } from 'react-router-dom';    

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
      </div>

      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-1 text-white hover:text-blue-200 z-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Home page
      </Link>

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}