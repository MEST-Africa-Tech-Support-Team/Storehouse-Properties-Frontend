import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    question: "How do I book a property?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    id: 2,
    question: "What is the cancellation policy?",
    answer: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
  },
  {
    id: 3,
    question: "How do I verify my identity?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
  },
  {
    id: 4,
    question: "What payment methods are accepted?",
    answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis."
  },
  {
    id: 5,
    question: "How do I leave a review?",
    answer: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
  },
  {
    id: 6,
    question: "Are pets allowed in the properties?",
    answer: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt."
  }
];

// Passing isOpen and toggle function from parent to ensure isolation
const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="bg-light-primary/20 rounded-4xl overflow-hidden transition-all duration-300">
      <button
        onClick={toggle}
        className="flex justify-between items-center w-full p-5 text-left focus:outline-none hover:bg-light-primary/30 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold text-gray-600">{question}</h3>
        <FaChevronDown
          className={`text-gray-400 flex-shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-5 pt-0 text-gray-500 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  // Store the ID of the currently open FAQ. null means all are closed.
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    // If user clicks the already open FAQ, close it (set to null), 
    // otherwise set the new ID
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 px-6 md:px-26 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <div className="h-[300px] md:h-[400px] rounded-[32px] overflow-hidden mb-12 shadow-xl group">
          <img
            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Resort Pool"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <span className="block text-primary font-bold text-sm uppercase tracking-wider mb-3">
          Frequently Asked Questions
        </span>
        <h2 className="text-[#0f1d37] text-3xl md:text-4xl font-extrabold tracking-tight">
          Find Answers To Common Questions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {faqData.map((item) => (
          <FAQItem
            key={item.id}
            question={item.question}
            answer={item.answer}
            isOpen={openId === item.id}
            toggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;