import React from 'react';
import { Link } from 'react-router';
import { FaArrowRight } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-20 grid lg:grid-cols-2 gap-16 items-center">
      <div className="max-w-xl">
        <h2 className="text-[#0f1d37] text-[40px] font-bold mb-8 tracking-tight">
          Who We Are
        </h2>
        <div className="space-y-6 text-gray-500 text-[16px] leading-relaxed">
          <p>
            Storehouse is your trusted partner in finding the perfect rental property. 
            We connect travelers and renters with verified, high-quality properties across the globe.
          </p>
          <p>
            Our mission is to make property rental simple, secure, and stress-free. 
            With thousands of verified listings and 24/7 support, we're committed to 
            providing you with the best rental experience possible.
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400" 
              className="h-64 w-full object-cover hover:scale-105 transition-transform duration-500" 
              alt="Happy couple moving" 
            />
          </div>
          <div className="bg-[#2563eb] text-white p-10 rounded-3xl shadow-xl hover:shadow-blue-200 transition-shadow">
            <div className="text-4xl font-extrabold mb-2">50K+</div>
            <div className="text-blue-100 font-medium text-lg">Happy Guests</div>
          </div>
        </div>
        
        <div className="space-y-6 pt-12">
          <div className="bg-[#F0F7FF] p-10 rounded-3xl border border-blue-50 shadow-sm hover:border-blue-200 transition-colors">
            <div className="text-[#2563eb] text-4xl font-extrabold mb-2">10K+</div>
            <div className="text-gray-600 font-medium text-lg">Properties Listed</div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400" 
              className="h-64 w-full object-cover hover:scale-105 transition-transform duration-500" 
              alt="Team working" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutSection;