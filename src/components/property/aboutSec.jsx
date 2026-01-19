import React from "react";
import { Link } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section className="
      py-16 lg:py-20 
      max-w-7xl mx-auto 
      px-6 sm:px-10 lg:px-20
      grid gap-14 lg:grid-cols-2 lg:gap-16 
      items-center
    ">
      {/* Text Content */}
      <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
        <h2 className="
          text-[#0f1d37] 
          text-3xl sm:text-4xl lg:text-[40px] 
          font-bold mb-6 lg:mb-8 
          tracking-tight
        ">
          About Storehouse
        </h2>

        <div className="
          space-y-5 lg:space-y-6 
          text-gray-500 
          text-[15px] sm:text-[16px] 
          leading-relaxed
        ">
          <p>
            Storehouse is your trusted partner in finding the perfect rental
            property. We connect travelers and renters with verified,
            high-quality properties across the globe.
          </p>
          <p>
            Our mission is to make property rental simple, secure, and
            stress-free. With thousands of verified listings and 24/7 support,
            we're committed to providing you with the best rental experience
            possible.
          </p>
        </div>

        <Link
          to="/about"
          className="
            mt-8 lg:mt-10 
            inline-flex items-center gap-2 
            text-[#2563eb] font-bold text-lg 
            group transition-colors hover:text-blue-800
          "
        >
          Learn More About Us
          <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>

      {/* Visual Grid */}
      <div className="
        grid grid-cols-1 sm:grid-cols-2 
        gap-6
      ">
        {/* Left column */}
        <div className="space-y-6">
          <Link to="/about" className="block overflow-hidden rounded-3xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400"
              className="
                h-56 sm:h-64 
                w-full object-cover 
                hover:scale-105 transition-transform duration-500
              "
              alt="Happy couple moving"
            />
          </Link>

          <Link
            to="/about"
            className="
              block
              bg-[#2563eb] text-white 
              p-8 sm:p-10 
              rounded-3xl shadow-xl 
              hover:shadow-blue-200 transition-shadow
            "
          >
            <div className="text-3xl sm:text-4xl font-extrabold mb-2">
              50K+
            </div>
            <div className="text-blue-100 font-medium text-lg">
              Happy Guests
            </div>
          </Link>
        </div>

        {/* Right column */}
        <div className="space-y-6 sm:pt-12">
          <Link
            to="/about"
            className="
              block
              bg-[#F0F7FF] 
              p-8 sm:p-10 
              rounded-3xl 
              border border-blue-50 
              shadow-sm hover:border-blue-200 transition-colors
            "
          >
            <div className="text-[#2563eb] text-3xl sm:text-4xl font-extrabold mb-2">
              10K+
            </div>
            <div className="text-gray-600 font-medium text-lg">
              Properties Listed
            </div>
          </Link>

          <Link to="/about" className="block overflow-hidden rounded-3xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400"
              className="
                h-56 sm:h-64 
                w-full object-cover 
                hover:scale-105 transition-transform duration-500
              "
              alt="Team working"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
