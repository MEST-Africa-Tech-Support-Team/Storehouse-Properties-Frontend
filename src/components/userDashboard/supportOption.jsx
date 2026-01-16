import React from 'react';
import { FaEnvelope, FaPhone, FaQuestionCircle } from "react-icons/fa";

const SupportOptionCard = ({ icon, title, description, actionText, actionLink, onClick }) => {
  const IconComponent = {
    email: FaEnvelope,
    phone: FaPhone,
    help: FaQuestionCircle
  }[icon];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-2">
        <IconComponent size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <button
        onClick={onClick}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
        {actionText}
      </button>
    </div>
  );
};

export default SupportOptionCard;