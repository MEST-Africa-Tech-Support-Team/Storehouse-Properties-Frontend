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
  description,
  propertyType,
  pricePerNight,
  maxGuests,
  amenities,
  rules,
  location,
  isFavorite: initialIsLiked = false,
  onFavoriteChange,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [loading, setLoading] = useState(false);

  // ✅ Use first image from images array or fallback
  const image = images[0] || 'https://placehold.co/340x180/e2e8f0/64748b?text=No+Image';
  
  // ✅ Handle location object properly (matches your backend structure)
  const locationString = location?.city 
    ? `${location.city}, ${location.region || ''}`.trim()
    : location?.address || 'Location not available';

  // Sync local state with prop changes
  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleNavigation = useCallback(() => {
    navigate(`/property/${id}`, {
      state: {
        property: {
          id,
          title,
          description,
          propertyType,
          pricePerNight,
          maxGuests,
          amenities,
          rules,
          location,
          images,
        },
      },
    });
  }, [navigate, id, title, description, propertyType, pricePerNight, maxGuests, amenities, rules, location, images]);

  const toggleLike = useCallback(async (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // ✅ Check authentication first
    const token = authService.getToken();
    if (!token) {
      toast.error('Please log in to manage favorites', {
        duration: 3000,
        position: 'top-center'
      });
      return;
    }

    // ✅ Optimistic UI update + loading state
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLoading(true);

    try {
      let success;
      if (newLikedState) {
        success = await favoriteService.add(id);
      } else {
        success = await favoriteService.remove(id);
      }

      if (!success) throw new Error();

      // ✅ Success toast
      toast.success(
        newLikedState ? 'Added to favorites' : 'Removed from favorites',
        {
          duration: 2000,
          position: 'top-center',
          icon: newLikedState ? '❤️' : '👋'
        }
      );

      // ✅ Notify parent component of the change
      if (onFavoriteChange) {
        onFavoriteChange(id, newLikedState);
      }
    } catch (error) {
      // ✅ Revert on error
      setIsLiked(!newLikedState);
      toast.error(
        newLikedState 
          ? 'Failed to add to favorites' 
          : 'Failed to remove from favorites',
        {
          duration: 3000,
          position: 'top-center'
        }
      );
    } finally {
      setLoading(false);
    }
  }, [isLiked, id, onFavoriteChange]);

  return (
    <article
      onClick={handleNavigation}
      className="max-w-[340px] w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ease-out cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-primary"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleNavigation();
      }}
      aria-label={`View ${title}. ${locationString}. $${pricePerNight} per night.`}
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
          disabled={loading}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 ${
            loading 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:bg-white focus:ring-red-400'
          }`}
        >
          <FaHeart
            className={`text-lg transition-colors ${
              isLiked 
                ? "text-red-500 fill-current" 
                : "text-gray-400 hover:text-red-500"
            } ${
              loading && !isLiked ? 'animate-pulse' : ''
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