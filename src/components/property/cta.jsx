import React from 'react';
import { Link } from 'react-router';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#3b82f6] to-[#2563eb] py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-white text-[40px] md:text-[40px] font-bold mb-3 tracking-tight leading-tight">
          Ready to Find Your Perfect Stay?
        </h2>
        
        <p className="text-blue-50 text-lg md:text-xl font-medium mb-6 opacity-90 max-w-2xl mx-auto">
          Join thousands of satisfied guests and start your journey today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            to="/explore"
            className="w-full sm:w-auto px-10 py-4 bg-white text-[#2563eb] text-[18px] font-bold rounded-full shadow-[#bfdbfe] hover:shadow-[#bfdbfe] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all duration-150 text-center"
          >
            Start Searching
          </Link>

          <button 
            className="w-full sm:w-auto px-10 py-4 bg-transparent text-white text-[18px] font-bold rounded-full border-2 border-white shadow-[rgba(255,255,255,0.2)] hover:shadow-[rgba(255,255,255,0.2)] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all duration-150"
          >
            List Your Property
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
    </section>
  );
};

export default CTASection;