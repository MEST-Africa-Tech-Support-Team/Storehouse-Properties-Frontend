import React from "react";
import ContactImage from "../../images/contact.png";

export default function ContactBanner() {
  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      
      {/* Background Image */}
      <img
        src={ContactImage}
        alt="Contact Us Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay (lighter) */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          We're here to help. Reach out anytime.
        </p>
      </div>

    </div>
  );
}
