// src/components/LocationSection.jsx
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function LocationSection({ location }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
      <div className="bg-gray-100 p-6 rounded-xl text-center">
        <FaMapMarkerAlt className="mx-auto text-gray-500 text-4xl mb-2" />
        <p className="text-gray-500 text-sm mb-1">Interactive map would be embedded here</p>
        <p className="text-gray-600 text-xs">{location}</p>
      </div>
    </div>
  );
}