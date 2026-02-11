import React from 'react';

/**
 * @param {React.ElementType} icon 
 * @param {string} label
 */
const CategoryCard = ({ icon: Icon, label }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[200px] h-[200px] bg-white rounded-2xl transition-all hover:shadow-lg hover:shadow-primary cursor-pointer">
      <div className="flex items-center justify-center w-[80px] h-[80px] bg-light-primary/30 rounded-full mb-4">
        {Icon && <Icon className="w-8 h-8 text-primary" fill="currentColor" />}
      </div>

      <h3 className="text-[#0f1d37] text-[16px] font-bold tracking-tight">
        {label}
      </h3>
    </div>
  );
};

export default CategoryCard;