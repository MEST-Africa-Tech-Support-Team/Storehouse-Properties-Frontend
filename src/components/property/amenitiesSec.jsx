// src/components/AmenitiesSection.jsx
import { FaWifi, FaCar, FaSnowflake, FaDumbbell, FaConciergeBell, FaUtensils, FaTv, FaShieldAlt, FaChild } from 'react-icons/fa';

export default function AmenitiesSection({ amenities }) {
  const iconMap = {
    'High-speed WiFi': <FaWifi />,
    'Free parking': <FaCar />,
    'Air conditioning': <FaSnowflake />,
    'Gym access': <FaDumbbell />,
    'Concierge': <FaConciergeBell />,
    'Full kitchen': <FaUtensils />,
    'Smart TV': <FaTv />,
    '24/7 security': <FaShieldAlt />,
    'Child Included': <FaChild />,
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">What this place offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {amenities.map((amenity, idx) => (
          <div key={idx} className="flex items-center gap-2 text-gray-700">
            {iconMap[amenity] || <div className="w-5 h-5"></div>}
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}