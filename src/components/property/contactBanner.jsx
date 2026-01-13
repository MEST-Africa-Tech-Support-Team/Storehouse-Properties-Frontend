import React from "react";

export default function ContactBanner() {
  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1580587771525-78b9e728a3d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        alt="Contact Us Banner"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-blue-900 bg-opacity-60"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-2xl">
          We're here to help. Reach out anytime.
        </p>
      </div>
    </div>
  );
}