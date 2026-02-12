import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaStar, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { authService } from '../../services/authService';
import { favoriteService } from '../../services/favoriteService';

const PropertyCard = ({
  id,
  images = [],
  title,
  pricePerNight,
  location,
  isFavorite: initialIsLiked = false,
  onFavoriteChange,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [loading, setLoading] = useState(false);

  const image = images[0] || 'https://placehold.co/340x180/e2e8f0/64748b?text=No+Image';
  
  const locationString = location?.city 
    ? `${location.city}, ${location.region || ''}`.trim()
    : location?.address || 'Location not available';

  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleNavigation = useCallback(() => {
    navigate(`/property/${id}`, {
      state: { property: { id, title, pricePerNight, location, images } }
    });
  }, [navigate, id, title, pricePerNight, location, images]);

  const toggleLike = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!authService.getToken()) {
      toast.error('Please log in to manage favorites', { duration: 3000 });
      return;
    }

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLoading(true);

    try {
      await (newLikedState 
        ? favoriteService.add(id) 
        : favoriteService.remove(id)
      );

      toast.success(
        newLikedState ? 'Added to favorites ❤️' : 'Removed from favorites',
        { duration: 2000 }
      );

      onFavoriteChange?.(id, newLikedState);
    } catch {
      setIsLiked(!newLikedState);
      toast.error(
        newLikedState 
          ? 'Failed to add to favorites' 
          : 'Failed to remove from favorites',
        { duration: 3000 }
      );
    } finally {
      setLoading(false);
    }
  }, [isLiked, id, onFavoriteChange]);

  return (
    <article
      onClick={handleNavigation}
      className="max-w-[340px] w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-primary"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleNavigation()}
      aria-label={`View ${title}. ${locationString}. ₵${pricePerNight} per night.`}
    >
      <div className="relative h-[180px] w-full bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
        />
        <button
          onClick={toggleLike}
          disabled={loading}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 shadow-md transition-all duration-200 ${
            loading 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:scale-110 active:scale-95 hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-400'
          }`}
        >
          <FaHeart
            className={`text-lg transition-colors ${
              isLiked 
                ? "text-red-500 fill-current" 
                : "text-gray-400 hover:text-red-500"
            } ${loading && !isLiked ? 'animate-pulse' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <FaStar className="text-yellow-400 text-xs" aria-hidden="true" />
            <span className="text-xs font-medium text-gray-700">4.8</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500 mb-3">
          <FaMapMarkerAlt className="text-primary text-xs flex-shrink-0" aria-hidden="true" />
          <span className="text-xs font-medium truncate">{locationString}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-primary">₵{pricePerNight}</span>
            <span className="text-xs text-gray-500">/night</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation();
            }}
            className="text-xs font-bold text-primary hover:text-hover transition-colors whitespace-nowrap px-2 py-1 rounded-md hover:bg-light-primary/20"
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