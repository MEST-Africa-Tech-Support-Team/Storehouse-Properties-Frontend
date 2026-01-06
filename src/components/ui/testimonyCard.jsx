import React from 'react';
import { FaStar } from 'react-icons/fa';

const TestimonialCard = ({ quote, author, role, avatar, rating = 5 }) => {
  return (
    <article className="flex flex-col p-8 bg-white rounded-[24px] shadow-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full max-w-[380px]">
      <div className="flex gap-1 mb-6">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="text-[#FFC107] text-lg" />
        ))}
      </div>

      <p className="text-[#4b5563] text-[16px] leading-relaxed mb-8 italic">
        "{quote}"
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img 
            src={avatar} 
            alt={author} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-[#0f1d37] font-bold text-[16px] leading-tight">
            {author}
          </h4>
          <p className="text-gray-500 text-[14px]">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
};

export default TestimonialCard;