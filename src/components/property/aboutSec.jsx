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
          About Storehouse Property
        </h2>

        <div className="
          space-y-5 lg:space-y-6 
          text-gray-500 
          text-[15px] sm:text-[16px] 
          leading-relaxed
        ">
          <p>
            Storehouse Property and Consult Ltd is a real estate property management and consulting company that provides quality, affordable short, medium, and long-term lodging solutions as well as comprehensive property management services. 
          </p>
          <p>
            We serve individuals, small groups, and organizations seeking a reliable alternative to traditional hotels, while helping property owners maximize returns on their real estate investments.
          </p>
        </div>

        <Link
          to="/about"
          className="
            mt-8 lg:mt-10 
            inline-flex items-center gap-2 
            text-primary font-bold text-lg 
            group transition-colors hover:text-hover
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
              group
              block relative
              bg-primary text-white 
              p-8 sm:p-10 
              rounded-3xl shadow-xl 
              hover:shadow-primary transition-all duration-300
              overflow-hidden
            "
          >
            {/* Default Content */}
            <div className="group-hover:opacity-0 transition-opacity duration-300">
              <div className="text-3xl sm:text-4xl font-extrabold mb-2">
                10+
              </div>
              <div className="text-white/80 font-medium text-lg">
                Years of Experience
              </div>
            </div>

            {/* Hover Description */}
            <div className="absolute inset-0 p-8 sm:p-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm sm:text-base leading-relaxed text-center">
                Our Company has over 10 years experience in the property management business.
              </p>
            </div>
          </Link>
        </div>

        {/* Right column */}
        <div className="space-y-6 sm:pt-12">
          <Link
            to="/about"
            className="
              group
              block relative
              bg-light-primary/20 
              p-8 sm:p-10 
              rounded-3xl 
              border border-light-primary 
              shadow-sm hover:border-primary transition-all duration-300
              overflow-hidden
            "
          >
            {/* Default Content */}
            <div className="group-hover:opacity-0 transition-opacity duration-300">
              <div className="text-primary text-3xl sm:text-4xl font-extrabold mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium text-lg">
                Property Management
              </div>
            </div>

            {/* Hover Description */}
            <div className="absolute inset-0 p-8 sm:p-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-primary text-sm sm:text-base leading-relaxed text-center font-medium">
                Storehouse Property and Consult Ltd manages your Real Estate Properties 24−7!
              </p>
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
