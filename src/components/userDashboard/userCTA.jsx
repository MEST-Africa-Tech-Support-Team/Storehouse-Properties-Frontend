import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegCompass } from "react-icons/fa";

const CTASection = () => {
  return (
    <div className="text-center p-10 bg-primary rounded-xl shadow-lg mt-6">
      <div className="mb-4">
        <FaRegCompass className="text-white text-5xl mx-auto" />
      </div>

      <h2 className="text-white text-2xl font-bold mb-3">Ready for Your Next Adventure?</h2>
      <p className="text-orange-100 max-w-md mx-auto mb-6">
        Discover thousands of unique properties around the world
      </p>

      <Link
        to="/explore"
        className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-full text-base hover:bg-white transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Explore Properties
      </Link>
    </div>
  );
};

export default CTASection;