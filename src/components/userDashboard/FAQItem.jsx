import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-white rounded-xl p-5 mb-4 ${isOpen ? 'shadow-md' : 'shadow-sm'} transition-shadow`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-medium text-gray-700">{question}</h3>
        <span className={`text-xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </div>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;