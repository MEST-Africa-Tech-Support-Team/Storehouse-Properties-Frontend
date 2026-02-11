import React from "react";
import AboutImage from "../../images/about.png";

export default function AboutUsBanner() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">

      {/* Background Image */}
      <img
        src={AboutImage}
        alt="Modern kitchen interior"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">About Us</h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Always here for you. Get in touch whenever you need us.
        </p>
      </div>

    </div>
  );
}
