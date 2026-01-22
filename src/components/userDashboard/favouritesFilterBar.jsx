import React, { useState } from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { FaMinus, FaPlus } from "react-icons/fa";

const FavoritesFilterBar = ({ onApply, onReset }) => {
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    childrenAllowed: '', // 'true', 'false', or ''
    petsAllowed: '',     // 'true', 'false', or ''
    propertyType: '',
    // amenities: '',
    title: '',
    featured: false,
    guests: 2, // UI-only (not sent to API unless mapped to a real field)
  });

  const handleApply = () => {
    // Build query params object (only include non-empty values)
    const queryParams = {};
    
    if (filters.city) queryParams.city = filters.city;
    if (filters.minPrice !== '') queryParams.minPrice = Number(filters.minPrice);
    if (filters.maxPrice !== '') queryParams.maxPrice = Number(filters.maxPrice);
    if (filters.childrenAllowed !== '') queryParams.childrenAllowed = filters.childrenAllowed === 'true';
    if (filters.petsAllowed !== '') queryParams.petsAllowed = filters.petsAllowed === 'true';
    if (filters.propertyType && filters.propertyType !== 'All Types') queryParams.propertyType = filters.propertyType.toLowerCase();
    if (filters.amenities) queryParams.amenities = filters.amenities;
    if (filters.title) queryParams.title = filters.title;
    if (filters.featured) queryParams.featured = true;

    // Pass filters to parent (for API call)
    onApply(queryParams);
  };

  const handleReset = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      childrenAllowed: '',
      petsAllowed: '',
      propertyType: '',
      // amenities: '',
      title: '',
      featured: false,
      guests: 2,
    });
    onReset();
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">
        {/* Location / City */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <input
              type="text"
              placeholder="City (e.g., Lekki)"
              value={filters.city}
              onChange={(e) => updateFilter('city', e.target.value)}
              className="w-full pl-3 pr-9 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoLocationSharp className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 text-base" />
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Min Price ($)</label>
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            placeholder="0"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Max Price ($)</label>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            placeholder="5000"
            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Children Allowed */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Children Allowed</label>
          <select
            value={filters.childrenAllowed}
            onChange={(e) => updateFilter('childrenAllowed', e.target.value)}
            className="w-full py-2 px-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Pets Allowed */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Pets Allowed</label>
          <select
            value={filters.petsAllowed}
            onChange={(e) => updateFilter('petsAllowed', e.target.value)}
            className="w-full py-2 px-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {/* Property Type */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Property Type</label>
          <select
            value={filters.propertyType}
            onChange={(e) => updateFilter('propertyType', e.target.value)}
            className="w-full py-2 px-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Cabin">Cabin</option>
          </select>
        </div>

        {/* Amenities */}
        {/* <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Amenities</label>
          <input
            type="text"
            placeholder="e.g., Parking, WiFi"
            value={filters.amenities}
            onChange={(e) => updateFilter('amenities', e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Title / Keyword */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Keyword</label>
          <input
            type="text"
            placeholder="Search title..."
            value={filters.title}
            onChange={(e) => updateFilter('title', e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Featured Only */}
        <div className="flex items-end">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={(e) => updateFilter('featured', e.target.checked)}
              className="sr-only"
            />
            <div className={`relative w-10 h-5 rounded-full transition-colors ${filters.featured ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${filters.featured ? 'translate-x-5' : ''}`}></div>
            </div>
            <span className="ml-2 text-xs text-gray-700">Featured Only</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-2">
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors w-full"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-100 transition-colors w-full"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesFilterBar;