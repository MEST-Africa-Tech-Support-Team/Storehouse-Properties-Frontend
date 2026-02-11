import React from "react";
import { FiMail, FiPhone, FiHelpCircle } from "react-icons/fi";

export default function SupportOptions() {
  const options = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Support",
      desc: "Get help via email within 24 hours",
      linkText: "Send us an email",
      link: "mailto:support@storehouse.com",
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Phone Support",
      desc: "Speak directly with our team",
      linkText: "Call us now",
      link: "tel:+15551234567",
    },
    {
      icon: <FiHelpCircle className="w-6 h-6" />,
      title: "Help Center",
      desc: "Browse our knowledge base",
      linkText: "Visit help center",
      link: "/help",
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((opt, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 text-white">
                {opt.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{opt.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{opt.desc}</p>
              <a
                href={opt.link}
                className="text-primary hover:text-hover text-sm font-medium"
              >
                {opt.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}