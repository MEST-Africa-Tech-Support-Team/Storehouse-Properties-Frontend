import React from "react";
import { FiUsers, FiShield, FiCheckCircle, FiSettings } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { MdSecurity, MdVerified } from "react-icons/md";
import { FcDataProtection } from "react-icons/fc";

export default function StorehouseFeaturesSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          What Makes Storehouse Different
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Features that set us apart from the competition
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              icon: <FiUsers className="w-6 h-6" />,
              title: "Direct Bookings",
              desc: "No third-party dependency, direct connection between owners and guests",
            },
            {
              icon: <MdSecurity className="w-6 h-6" />,
              title: "Secure Payments",
              desc: "Bank-level security for all transactions and personal data",
            },
            {
              icon: <MdVerified className="w-6 h-6" />,
              title: "Verified Listings",
              desc: "Every property is verified to ensure quality and authenticity",
            },
            {
              icon: <FiSettings className="w-6 h-6" />,
              title: "Simple Management",
              desc: "Intuitive tools for property owners to manage their listings effortlessly",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50 p-6 rounded-xl text-center transition-all duration-300 hover:bg-blue-100 hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600">
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
                className="flex flex-col items-center text-center flex-1 transition-all duration-300 hover:bg-blue-50 hover:shadow-md hover:-translate-y-1 rounded-xl p-4 cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {index < arr.length - 1 && (
                <div className="hidden md:block mx-2">
                  <FiArrowRight className="text-blue-400 w-6 h-6" />
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
              className="bg-blue-50 p-6 rounded-xl text-center transition-all duration-300 hover:bg-blue-100 hover:shadow-md hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600">
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