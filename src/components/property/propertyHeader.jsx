import { FaMapMarkerAlt, FaStar, FaHeart } from 'react-icons/fa';

export default function PropertyHeader({ title, location, rating, reviewCount, isSuperhost, onToggleFavorite, isFavorite }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <FaMapMarkerAlt className="text-gray-500" />
            <span className="text-gray-600">{location}</span>
          </div>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`p-2 ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition`}
        >
          <FaHeart />
        </button>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          <span>{rating} ({reviewCount} reviews)</span>
        </div>
        <div>•</div>
        <div>{isSuperhost && 'Superhost'}</div>
      </div>
    </div>
  );
}