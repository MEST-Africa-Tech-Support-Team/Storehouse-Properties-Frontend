import React, { useState } from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";

const FavoritesFilterBar = ({ onApply, onReset }) => {
  const [location, setLocation] = useState('');
  const [childIncluded, setChildIncluded] = useState('Yes');
  const [propertyType, setPropertyType] = useState('All Types');
  const [guests, setGuests] = useState(2);
  const [sortBy, setSortBy] = useState('Popularity');

  const handleApply = () => {
    onApply({ location, childIncluded, propertyType, guests, sortBy });
  };

  const handleReset = () => {
    setLocation('');
    setChildIncluded('Yes');
    setPropertyType('All Types');
    setGuests(1);
    setSortBy('Popularity');
    onReset();
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-nowrap items-end gap-3">
        <div className="w-48">
          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-3 pr-9 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoLocationSharp className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-base" />
          </div>
        </div>

        <div className="w-32">
          <label className="block text-xs font-medium text-gray-700 mb-1">Child Included</label>
          <select
            value={childIncluded}
            onChange={(e) => setChildIncluded(e.target.value)}
            className="w-full py-2 px-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="w-36">
          <label className="block text-xs font-medium text-gray-700 mb-1">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full py-2 px-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Types">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Cabin">Cabin</option>
          </select>
        </div>

        <div className="w-32">
          <label className="block text-xs font-medium text-gray-700 mb-1">Guests</label>
          <div className="flex items-center justify-between border border-gray-300 rounded-lg py-2 px-2.5">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Decrease guests"
            >
              <FaMinus />
            </button>
            <span className="text-sm font-medium min-w-[18px] text-center">{guests}</span>
            <button
              onClick={() => setGuests(guests + 1)}
              className="text-gray-700 hover:text-gray-900"
              aria-label="Increase guests"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="w-40">
          <label className="block text-xs font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full py-2 px-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Popularity">Popularity</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Rating">Rating</option>
          </select>
        </div>

        <div className="flex gap-2 whitespace-nowrap">
          <button
            onClick={handleApply}
            className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 text-gray-700 text-sm font-medium rounded-full hover:bg-blue-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesFilterBar;