// src/pages/TermsAndConditions.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaChevronDown } from 'react-icons/fa';

export default function TermsAndConditions() {
  const [isAccepted, setIsAccepted] = useState(false);
  const [openSection, setOpenSection] = useState(null); // ✅ All sections closed by default
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Load booking data from state or localStorage
  useEffect(() => {
    const data = location.state?.booking || JSON.parse(localStorage.getItem('booking_pending'));
    if (data) {
      setBookingData(data);
    } else {
      navigate(-1);
    }
  }, [location.state?.booking, navigate]);

  const handleToggle = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleAccept = () => {
    if (!isAccepted || !bookingData) return;
    
    // ✅ Save confirmed booking
    const confirmedBooking = {
      ...bookingData,
      status: 'confirmed',
      confirmedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`booking_confirmed_${Date.now()}`, JSON.stringify(confirmedBooking));
    localStorage.removeItem('booking_pending');
    
    // ✅ Navigate to confirmation page
    navigate(`/property/booking/confirmation`, { 
      state: { 
        booking: confirmedBooking,
        success: true 
      } 
    });
  };

  const handleDecline = () => {
    localStorage.removeItem('booking_pending');
    navigate(-1);
  };

  const sections = [
    {
      id: 1,
      title: "Platform Usage",
      content: (
        <>
          <p className="mb-3">Storehouse is a digital platform that enables users to explore, book, and manage access to properties and facilities listed on our website.</p>
          <p className="mb-3 font-semibold">By accessing or using Storehouse, you confirm that:</p>
          <ul className="space-y-2 mb-4 pl-5">
            <li className="list-disc">You are at least 18 years old or have legal capacity to enter into a binding agreement.</li>
            <li className="list-disc">You will use the platform only for lawful purposes.</li>
            <li className="list-disc">You will not misuse, interfere with, or attempt to disrupt the platform's functionality or security.</li>
          </ul>
          <p className="mb-3 font-semibold">Users agree not to:</p>
          <ul className="space-y-2 mb-4 pl-5">
            <li className="list-disc">Use the platform for fraudulent, misleading, or unlawful activities.</li>
            <li className="list-disc">Attempt to access restricted areas of the website or other users' accounts.</li>
            <li className="list-disc">Copy, scrape, reverse-engineer, or exploit any part of the platform without authorization.</li>
            <li className="list-disc">Upload or transmit malicious software, spam, or harmful content.</li>
          </ul>
          <p className="mb-3 font-semibold">Storehouse reserves the right to:</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Monitor platform activity to ensure compliance.</li>
            <li className="list-disc">Restrict, suspend, or terminate access if misuse or violation of these terms is detected.</li>
            <li className="list-disc">Update or modify platform features at any time to improve user experience and security.</li>
          </ul>
        </>
      ),
    },
    {
      id: 2,
      title: "User Accounts",
      content: (
        <div className="space-y-3">
          <p>Account creation requires a valid email address and secure password. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Provide accurate and complete information during registration</li>
            <li className="list-disc">Notify us immediately of any unauthorized account access</li>
            <li className="list-disc">Keep your password secure and do not share it with others</li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      title: "Bookings & Reservations",
      content: (
        <div className="space-y-3">
          <p>All bookings are subject to availability and final confirmation. Payments are processed securely at the time of booking through our trusted payment gateway.</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Bookings are confirmed upon successful payment processing</li>
            <li className="list-disc">Cancellations must be made within 24 hours for a full refund</li>
            <li className="list-disc">Special requests are subject to availability and property owner approval</li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      title: "Payments & Fees",
      content: (
        <div className="space-y-3">
          <p>All prices displayed include applicable taxes unless otherwise stated. Additional fees may apply for specific services or requests.</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Security deposit may be required for certain properties</li>
            <li className="list-disc">Late check-in/out fees apply after designated times</li>
            <li className="list-disc">Damages or excessive cleaning will incur additional charges</li>
          </ul>
        </div>
      ),
    },
    {
      id: 5,
      title: "Cancellations & Refunds",
      content: (
        <div className="space-y-3">
          <p>Our cancellation policy is designed to be fair to both guests and property owners while maintaining flexibility.</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc"><strong>More than 48 hours before check-in:</strong> Full refund</li>
            <li className="list-disc"><strong>Within 48 hours of check-in:</strong> No refund issued</li>
            <li className="list-disc"><strong>Property unavailable:</strong> Full refund plus alternative accommodation assistance</li>
          </ul>
        </div>
      ),
    },
    {
      id: 6,
      title: "Property Usage Rules",
      content: (
        <div className="space-y-3">
          <p>Guests must respect all property rules and guidelines to ensure a pleasant experience for everyone and maintain the quality of our listings.</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Observe designated quiet hours (10 PM - 8 AM)</li>
            <li className="list-disc">No smoking inside properties unless explicitly permitted</li>
            <li className="list-disc">No pets allowed unless specified in property description</li>
            <li className="list-disc">Maximum occupancy limits must be strictly observed</li>
          </ul>
        </div>
      ),
    },
    {
      id: 7,
      title: "Reviews & User Content",
      content: (
        <div className="space-y-3">
          <p>Users may submit reviews and ratings after completing their stay. All content must be truthful, respectful, and non-defamatory.</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Reviews must be based on actual experience</li>
            <li className="list-disc">No hate speech, discrimination, or inappropriate content</li>
            <li className="list-disc">Storehouse reserves the right to remove or edit inappropriate content</li>
          </ul>
        </div>
      ),
    },
    {
      id: 8,
      title: "Privacy & Data Protection",
      content: (
        <div className="space-y-3">
          <p>We collect personal data necessary to provide our services, process bookings, and enhance user experience. Your data is stored securely and handled in compliance with data protection regulations.</p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">Your personal information is never sold to third parties</li>
            <li className="list-disc">Data is encrypted and stored on secure servers</li>
            <li className="list-disc">You have the right to access, correct, or delete your personal data</li>
          </ul>
          <p className="mt-3">For complete details, please refer to our full Privacy Policy.</p>
        </div>
      ),
    },
  ];

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Hero Section - Clean & Minimal */}
      <div className="relative h-[180px] sm:h-[240px] w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Terms and Conditions"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-800/90"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-sm opacity-95 max-w-2xl px-2">
            Please review and accept before continuing your booking
          </p>
        </div>
      </div>

      <div className="py-6 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6">
        {/* ✅ Introduction Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5 mb-6">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" size={20} />
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
              These Terms & Conditions govern your use of the Storehouse platform and services. By accessing or using our website and booking services, you agree to be bound by these terms. Please read them carefully before proceeding with any reservation. Your continued use of our platform constitutes acceptance of these terms.
            </p>
          </div>
        </div>

        {/* ✅ FAQ Sections - Clean & Professional */}
        <div className="space-y-3">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`bg-white border ${openSection === section.id ? 'border-blue-500' : 'border-gray-200'} rounded-xl overflow-hidden transition-all duration-300 ${
                openSection === section.id ? 'shadow-md' : 'shadow-sm hover:shadow'
              }`}
            >
              <button
                onClick={() => handleToggle(section.id)}
                className="flex items-center justify-between w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-colors"
                aria-expanded={openSection === section.id}
                aria-controls={`section-${section.id}`}
              >
                <h2 className="font-semibold text-gray-900 text-base sm:text-lg">
                  {section.id}. {section.title}
                </h2>
                <FaChevronDown 
                  className={`text-gray-400 w-5 h-5 transform transition-transform duration-300 ${
                    openSection === section.id ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              <div
                id={`section-${section.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSection === section.id 
                    ? 'max-h-[2000px] opacity-100 py-4 px-4' 
                    : 'max-h-0 opacity-0'
                }`}
                aria-hidden={openSection !== section.id}
              >
                <div className="text-gray-700 leading-relaxed space-y-3 text-sm">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Acceptance Section - Mobile Optimized */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200">
            <div className="flex items-start gap-3 mb-4">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label 
                htmlFor="acceptTerms" 
                className="text-sm text-gray-800 cursor-pointer leading-relaxed"
              >
                I have read and agree to the <span className="font-medium text-blue-600">Terms & Conditions</span> of Storehouse. I understand that by accepting, I am entering into a binding agreement for my reservation.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleDecline}
                className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <FaTimesCircle size={16} />
                  <span>Decline</span>
                </div>
              </button>
              <button
                onClick={handleAccept}
                disabled={!isAccepted}
                className={`w-full sm:w-auto px-4 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  isAccepted
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow hover:shadow-md'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FaCheckCircle size={16} />
                <span>Accept & Continue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}