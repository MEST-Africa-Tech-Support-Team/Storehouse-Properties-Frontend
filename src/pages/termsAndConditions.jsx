// src/pages/TermsAndConditions.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function TermsAndConditions() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [openSection, setOpenSection] = useState(1); 
  const navigate = useNavigate();

  const handleToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleAccept = () => {
    if (!isAccepted) return;
    navigate('/booking/confirm'); 
  };

  const handleDecline = () => {
    navigate(-1); 
  };

  const sections = [
    {
      id: 1,
      title: "1. Platform Usage",
      content: (
        <>
          <p>Storehouse is a digital platform that enables users to explore, book, and manage access to properties and facilities listed on our website.</p>
          <p>By accessing or using Storehouse, you confirm that:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>You are at least 18 years old or have legal capacity to enter into a binding agreement.</li>
            <li>You will use the platform only for lawful purposes.</li>
            <li>You will not misuse, interfere with, or attempt to disrupt the platform’s functionality or security.</li>
          </ul>
          <p>Users agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use the platform for fraudulent, misleading, or unlawful activities.</li>
            <li>Attempt to access restricted areas of the website or other users’ accounts.</li>
            <li>Copy, scrape, reverse-engineer, or exploit any part of the platform without authorization.</li>
            <li>Upload or transmit malicious software, spam, or harmful content.</li>
          </ul>
          <p>Store House reserves the right to:</p>
          <ul className="list-disc pl-6">
            <li>Monitor platform activity to ensure compliance.</li>
            <li>Restrict, suspend, or terminate access if misuse or violation of these terms is detected.</li>
            <li>Update or modify platform features at any time to improve user experience and security.</li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      title: "2. Users Accounts",
      content: (
        <p>Account creation requires valid email and password. You are responsible for maintaining account confidentiality and all activities under your account.</p>
      ),
    },
    {
      id: 3,
      title: "3. Bookings & Reservations",
      content: (
        <p>All bookings are subject to availability and confirmation. Payments are processed at time of booking. Cancellations must be made within 24 hours for full refund.</p>
      ),
    },
    {
      id: 4,
      title: "4. Payments & Fees",
      content: (
        <p>Prices shown include taxes unless otherwise stated. Additional fees may apply for late check-in/out, damages, or special requests.</p>
      ),
    },
    {
      id: 5,
      title: "5. Cancellations & Refunds",
      content: (
        <p>Cancellations made more than 48 hours before check-in receive full refund. Within 48 hours, no refund is issued.</p>
      ),
    },
    {
      id: 6,
      title: "6. Property Usage Rules",
      content: (
        <p>Guests must respect property rules including quiet hours, no smoking, and no pets unless specified.</p>
      ),
    },
    {
      id: 7,
      title: "7. Reviews & User Content",
      content: (
        <p>Users may submit reviews after stay. All content must be truthful and non-defamatory. Storehouse reserves the right to remove inappropriate content.</p>
      ),
    },
    {
      id: 8,
      title: "8. Privacy & Data Protection",
      content: (
        <p>We collect personal data to provide services. Your data is stored securely and never sold. See our full Privacy Policy for details.</p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Terms and Conditions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Terms and conditions</h1>
          <p className="text-sm sm:text-base opacity-90">Please review and accept before continuing your booking</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 max-w-4xl mx-auto">
        {/* Intro Box */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <p className="text-gray-800 leading-relaxed">
            These Terms & Conditions govern your use of the Store House platform and services. By accessing or using our website and booking services, you agree to be bound by these terms. Please read them carefully before proceeding with any reservation or account creation. Your continued use of our platform constitutes acceptance of these terms.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
                openSection === section.id ? 'shadow-md' : ''
              }`}
            >
              <button
                onClick={() => handleToggle(section.id)}
                className="flex justify-between items-center w-full p-5 text-left focus:outline-none hover:bg-gray-50"
                aria-expanded={openSection === section.id}
              >
                <h2 className="font-semibold text-gray-800">{section.title}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-gray-400 transform transition-transform duration-300 ${
                    openSection === section.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSection === section.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={openSection !== section.id}
              >
                <div className="p-5 pt-0 text-gray-700 leading-relaxed">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <input
              id="acceptTerms"
              type="checkbox"
              checked={isAccepted}
              onChange={(e) => setIsAccepted(e.target.checked)}
              className="w-5 h-5 text-blue-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="acceptTerms" className="text-gray-800">
              I have read and agree to the Terms & Conditions of Storehouse
            </label>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDecline}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              disabled={!isAccepted}
              className={`px-6 py-3 rounded-xl font-medium transition ${
                isAccepted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Accept & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}