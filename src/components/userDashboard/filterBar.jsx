import React, { useState } from 'react';
import { RiExpandUpDownFill } from "react-icons/ri";

const FilterBar = ({ onStatusChange, onChildrenChange, onSortChange }) => {
  const [sortMode, setSortMode] = useState('date'); 

  const handleSortToggle = () => {
    const nextMode = {
      date: 'price-desc',
      'price-desc': 'price-asc',
      'price-asc': 'date'
    }[sortMode];

    setSortMode(nextMode);
    onSortChange(nextMode);
  };

  const getSortLabel = () => {
    switch (sortMode) {
      case 'date': return 'Sort by date';
      case 'price-desc': return 'Price: High to Low';
      case 'price-asc': return 'Price: Low to High';
      default: return 'Sort by date';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Status:</label>
            <select
              onChange={(e) => onStatusChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-32"
            >
              <option value="All">All</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Children Allowed:</label>
            <select
              onChange={(e) => onChildrenChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-32"
            >
              <option value="All">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSortToggle}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors group"
          aria-label={`Sort by ${getSortLabel()}`}
        >
          <RiExpandUpDownFill className="text-gray-500 text-base" />
          <span>{getSortLabel()}</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;