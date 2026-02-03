import React from 'react';
import { useOutletContext } from 'react-router-dom';

import UserSidebar from '../../components/userDashboard/userSidebar';
import SupportOptionCard from '../../components/userDashboard/supportOption';
import FAQItem from '../../components/userDashboard/FAQItem';
import ContactForm from '../../components/userDashboard/contactForm';

const SupportPage = () => {
  const { userName } = useOutletContext();

  const faqData = [
    {
      question: "How do you vet talent?",
      answer: "We conduct thorough background checks, skill assessments, and reference verifications to ensure every professional meets our high standards."
    },
    {
      question: "Typical time to first shortlist?",
      answer: "Most clients receive their first shortlisted candidates within 24-48 hours after submitting a request."
    },
    {
      question: "Trial engagements?",
      answer: "Yes! We offer trial engagements for most roles to ensure the right fit before committing long-term."
    },
    {
      question: "Which time zones?",
      answer: "We support global teams across all major time zones including EST, PST, GMT, IST, AEST, and more."
    },
    {
      question: "Do you support payroll/relocation?",
      answer: "Absolutely. We handle payroll processing and relocation assistance for international hires."
    }
  ];

  const handleEmailSupport = () => {
    window.location.href = "mailto:support@storehouse.com";
  };

  const handlePhoneSupport = () => {
    window.location.href = "tel:+15551234567";
  };

  const handleHelpCenter = () => {
    window.location.href = "/help-center";
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <UserSidebar />
      <div className="w-full p-6 max-w-[1400px] px-4 sm:px-6 lg:px-8 lg:ml-64">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-black">Support & Help</h1>
          <p className="text-gray-600 mt-1">We are here to help you with anything you need</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <SupportOptionCard
            icon="email"
            title="Email Support"
            description="Get help via email within 24 hours"
            actionText="Send us an email"
            onClick={handleEmailSupport}
          />
          <SupportOptionCard
            icon="phone"
            title="Phone Support"
            description="Speak directly with our team"
            actionText="Call us now"
            onClick={handlePhoneSupport}
          />
          <SupportOptionCard
            icon="help"
            title="Help Center"
            description="Browse our knowledge base"
            actionText="Visit help center"
            onClick={handleHelpCenter}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            {faqData.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default SupportPage;