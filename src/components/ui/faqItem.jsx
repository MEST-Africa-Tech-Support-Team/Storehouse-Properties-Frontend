// src/components/FAQItem.jsx
import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

export default function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="bg-[#F4F8FF] rounded-4xl overflow-hidden transition-all duration-300 mb-4"
      style={{ willChange: 'height' }} // 👈 Prevents GPU flicker during animation
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-5 text-left focus:outline-none hover:bg-blue-50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3 className="text-lg font-bold text-gray-600">{question}</h3>
        <FaChevronDown
          className={`text-gray-400 flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      
      {/* ✅ Key Fix: Use max-h-0/96 + overflow-hidden + min-h for stability */}
      <div
        id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="p-5 pt-0 text-gray-500 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}