import React from "react";
import { useNavigate } from "react-router"; //
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const PropertyCard = ({
  id, 
  image,
  title,
  location,
  rating,
  price,
}) => {
  const navigate = useNavigate(); 
  const handleNavigation = () => {
    navigate(`/property/${id}`);
  };

  return (
    <article 
      onClick={handleNavigation} 
      className="max-w-[340px] w-full bg-white rounded-[22px] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 group cursor-pointer"
    >
      
     
      <div className="h-[150px] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-3">
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[16px] font-bold text-[#0f172a] truncate mr-2">
            {title}
          </h3>

          <div className="flex items-center gap-1 text-[14px] font-semibold flex-shrink-0">
            <FaStar className="text-yellow-400" />
            <span className="text-[#0f172a]">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <FaMapMarkerAlt className="text-[#2563eb] text-[14px]" />
          <span className="text-[10px] font-medium">{location}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-baseline gap-1">
            <span className="text-[#2563eb] text-[20px] font-extrabold">
              ${price}
            </span>
            <span className="text-gray-400 text-[14px] font-medium">
              /night
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); 
              handleNavigation();
            }}
            aria-label={`View details for ${title}`}
            className="text-[#2563eb] text-[10px] font-bold hover:text-blue-800 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;