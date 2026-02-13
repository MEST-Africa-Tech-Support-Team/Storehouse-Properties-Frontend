import React from "react";
import { FaBullseye, FaHandshake, FaCogs } from "react-icons/fa";

export default function MissionVisionSection() {
  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-light-primary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Our Mission */}
          <div className="group bg-white p-8 sm:p-10 rounded-2xl border border-[#EBEBEB] hover:border-primary 
                          hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl 
                            flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaBullseye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] mb-4 group-hover:text-primary transition-colors duration-300">
              Our Mission
            </h3>
            <p className="text-[#717171] text-[15px] sm:text-base leading-relaxed">
              Our mission is to manage real estate properties 24/7, maximizing client income through exceptional property management skills while ensuring tenant and guest satisfaction through first-rate property maintenance.
            </p>
            
            {/* Decorative bottom line */}
            <div className="mt-6 h-1 w-12 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
          </div>

          {/* Our Commitment */}
          <div className="group bg-white p-8 sm:p-10 rounded-2xl border border-[#EBEBEB] hover:border-primary 
                          hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl 
                            flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaHandshake className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] mb-4 group-hover:text-primary transition-colors duration-300">
              Our Commitment
            </h3>
            <p className="text-[#717171] text-[15px] sm:text-base leading-relaxed">
              At Storehouse Property and Consult Ltd, we are committed to delivering stress-free property ownership, strong financial performance, and well-maintained properties. We are honored to serve as trusted managers of our clients' real estate investments.
            </p>
            
            {/* Decorative bottom line */}
            <div className="mt-6 h-1 w-12 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
          </div>

          {/* Our Systems */}
          <div className="group bg-white p-8 sm:p-10 rounded-2xl border border-[#EBEBEB] hover:border-primary 
                          hover:shadow-xl transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl 
                            flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <FaCogs className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#222222] mb-4 group-hover:text-primary transition-colors duration-300">
              Our Systems & Processes
            </h3>
            <p className="text-[#717171] text-[15px] sm:text-base leading-relaxed">
              We operate with streamlined systems designed to reduce unnecessary costs and wastage. Our automated collections and disbursement processes ensure smooth cash flow, while all records and reports are properly documented and available for inspection by property owners and their representatives. We also maintain a stringent selection process for suppliers and service providers.
            </p>
            
            {/* Decorative bottom line */}
            <div className="mt-6 h-1 w-12 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}