import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const PropertyCard = ({
  id,
  image,
  title,
  location,
  rating,
  price,
  description = '',
  badge = '',
  category = '',
  images = [image],
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleNavigation = useCallback(() => {
    navigate(`/property/${id}`, {
      state: {
        property: {
          id,
          title,
          location,
          rating,
          price,
          description,
          badge,
          category,
          images,
        },
      },
    });
  }, [navigate, id, title, location, rating, price, description, badge, category, images]);

  const toggleLike = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    if (newLikedState) {
      toast.success('Added to favorites', {
        duration: 2000,
        position: 'top-center',
      });
    } else {
      toast.error('Removed from favorites', {
        duration: 2000,
        position: 'top-center',
      });
    }
  }, [isLiked]);

  return (
    <article
      onClick={handleNavigation}
      className="max-w-[340px] w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ease-out cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleNavigation();
      }}
      aria-label={`View ${title}. ${rating} stars. $${price} per night.`}
    >
      <div className="relative h-[180px] w-full bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
        />
        <button
          onClick={toggleLike}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <FaHeart
            className={`text-lg transition-colors ${
              isLiked ? "text-red-500 fill-current" : "text-gray-400 hover:text-red-500"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1 leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <FaStar className="text-yellow-400 text-xs" aria-hidden="true" />
            <span className="text-xs font-medium text-gray-700">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 mb-3">
          <FaMapMarkerAlt className="text-blue-600 text-xs flex-shrink-0" aria-hidden="true" />
          <span className="text-xs font-medium truncate">{location}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-blue-600">${price}</span>
            <span className="text-xs text-gray-500">/night</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation();
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap px-2 py-1 rounded-md hover:bg-blue-50"
            aria-label={`View details for ${title}`}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;