import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { MdSecurity, MdVerified } from "react-icons/md";
import { FcDataProtection } from "react-icons/fc";
import { FaBullhorn, FaShieldAlt, FaHome, FaCheckCircle } from "react-icons/fa";

export default function StorehouseFeaturesSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          What Makes Storehouse Property Different?
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Features that set us apart from the competition
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaBullhorn className="w-6 h-6" />,
              title: "Continuous Marketing & Exposure",
              desc: "Your property is promoted across Airbnb, Booking.com, social media, and other channels, ensuring high visibility and fast occupancy with qualified tenants.",
            },
            {
              icon: <FaShieldAlt className="w-6 h-6" />,
              title: "Transparent & Secure Payments",
              desc: "Automated collections and disbursement ensure smooth revenue flow, fully documented and accessible to property owners for complete peace of mind.",
            },
            {
              icon: <FaHome className="w-6 h-6" />,
              title: "High-Quality, Well-Maintained Properties",
              desc: "Every property under our care is meticulously maintained and regularly inspected to guarantee comfort, safety, and tenant satisfaction.",
            },
            {
              icon: <FaCheckCircle className="w-6 h-6" />,
              title: "Hassle-Free Property Management",
              desc: "From rent collection and tenant relations to maintenance and compliance, we handle every aspect of property management so you can enjoy your investment stress-free.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-light-primary/20 p-6 rounded-xl text-center transition-all duration-300 hover:bg-light-primary/30 hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          How It Works
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Simple steps to your perfect stay
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
          {[
            {
              step: 1,
              title: "Explore Properties",
              desc: "Browse our curated selection of verified rental properties",
            },
            {
              step: 2,
              title: "Choose Your Stay",
              desc: "Select dates and review all details before booking",
            },
            {
              step: 3,
              title: "Book Securely",
              desc: "Complete your booking with our secure payment system",
            },
            {
              step: 4,
              title: "Enjoy Your Stay",
              desc: "Relax and enjoy your perfectly matched accommodation",
            },
          ].map((item, index, arr) => (
            <React.Fragment key={index}>
              <div
                className="flex flex-col items-center text-center flex-1 transition-all duration-300 hover:bg-light-primary/20 hover:shadow-md hover:-translate-y-1 rounded-xl p-4 cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {index < arr.length - 1 && (
                <div className="hidden md:block mx-2">
                  <FiArrowRight className="text-primary/60 w-6 h-6" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Trust & Security
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Your safety and security are our top priorities
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <MdSecurity className="w-6 h-6" />,
              title: "Secure Payments",
              desc: "All transactions are protected with industry-standard encryption and security protocols",
            },
            {
              icon: <FcDataProtection className="w-6 h-6" />,
              title: "Data Protection",
              desc: "Your personal information is protected with advanced security measures and privacy controls",
            },
            {
              icon: <MdVerified className="w-6 h-6" />,
              title: "Verified Properties",
              desc: "Every listing undergoes thorough verification to ensure authenticity and quality standards",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-light-primary/20 p-6 rounded-xl text-center transition-all duration-300 hover:bg-light-primary/30 hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}