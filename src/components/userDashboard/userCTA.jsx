import React from 'react';
import { Link } from 'react-router';
import { FaRegCompass } from "react-icons/fa";

const CTASection = () => {
  return (
    <div className="text-center p-10 bg-[#1e5eff] rounded-xl shadow-lg mt-6">
      <div className="mb-4">
        <FaRegCompass className="text-white text-5xl mx-auto" />
      </div>

      <h2 className="text-white text-2xl font-bold mb-3">Ready for Your Next Adventure?</h2>
      <p className="text-blue-100 max-w-md mx-auto mb-6">
        Discover thousands of unique properties around the world
      </p>

      <Link
        to="/explore"
        className="inline-block px-8 py-3 bg-white text-[#1e5eff] font-semibold rounded-full text-base hover:bg-blue-50 transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Explore Properties
      </Link>
    </div>
  );
};

export default CTASection;