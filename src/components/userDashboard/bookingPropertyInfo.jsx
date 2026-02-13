import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa';

const BookingPropertyInfo = ({ 
  property = {
    name: "Skyline Modern Apartment",
    location: "Downtown Manhattan, New York, NY",
    bookingId: "BK-2024-087453",
    images: []
  }
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-white rounded-xl border border-[#EBEBEB] overflow-hidden">
      {/* Image Carousel */}
      <div className="relative h-48 sm:h-64 bg-gray-100">
        {property.images && property.images.length > 0 ? (
          <>
            <img 
              src={property.images[currentImageIndex]} 
              alt={`${property.name} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {property.images.length > 1 && (
              <>
                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full 
                             flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-[#222222]" />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full 
                             flex items-center justify-center hover:bg-white transition-all shadow-lg"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-[#222222]" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index 
                          ? 'bg-white w-6' 
                          : 'bg-white/60'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400">No image available</p>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#222222] mb-2">
          {property.name}
        </h2>
        
        <div className="flex items-start gap-2 text-[#717171] mb-4">
          <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
          <span className="text-sm sm:text-base">{property.location}</span>
        </div>

        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
          <span className="text-xs text-[#717171]">Booking ID:</span>
          <span className="text-sm font-medium text-[#222222]">{property.bookingId}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingPropertyInfo;
