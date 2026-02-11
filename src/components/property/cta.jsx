import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary to-hover py-16 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-white text-[40px] md:text-[40px] font-bold mb-3 tracking-tight leading-tight">
          Ready to Find Your Perfect Stay?
        </h2>
        
        <p className="text-white/80 text-lg md:text-xl font-medium mb-6 opacity-90 max-w-2xl mx-auto">
          Join thousands of satisfied guests and start your journey today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            to="/explore"
            className="w-full sm:w-auto px-10 py-4 bg-white text-primary text-[18px] font-bold rounded-full shadow-primary hover:shadow-primary hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all duration-150 text-center"
          >
           Explore Properties
          </Link>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
    </section>
  );
};

export default CTASection;