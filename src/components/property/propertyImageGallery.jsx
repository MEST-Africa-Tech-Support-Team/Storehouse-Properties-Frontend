import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const PropertyImageGallery = ({ images = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const displayImages = images.slice(0, 5);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden cursor-pointer">
        
        <div 
          className="md:col-span-2 md:row-span-2 relative overflow-hidden group"
          onClick={() => openLightbox(0)}
        >
          <img 
            src={displayImages[0]} 
            className="w-full h-full object-cover transition duration-500 group-hover:brightness-90"
            alt="Property Hero"
          />
        </div>

        {displayImages.slice(1).map((img, idx) => (
          <div 
            key={idx} 
            className="hidden md:block relative overflow-hidden group"
            onClick={() => openLightbox(idx + 1)}
          >
            <img 
              src={img} 
              className="w-full h-full object-cover transition duration-500 group-hover:brightness-90"
              alt={`Property ${idx + 1}`}
            />
          </div>
        ))}
        
        {images.length > 5 && (
            <button 
                onClick={() => openLightbox(0)}
                className="absolute bottom-4 right-4 bg-white border border-black px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition shadow-md z-10"
            >
                Show all photos
            </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-gray-800 flex flex-col items-center justify-center">
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center text-white z-10">
            <span className="text-lg font-medium">
              {currentIndex + 1} / {images.length}
            </span>
            <button 
              onClick={() => setShowModal(false)}
              className="p-3 hover:bg-white/10 rounded-full transition"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <button 
            onClick={prevImage}
            className="absolute left-4 p-4 text-white hover:bg-white/10 rounded-full transition z-10"
          >
            <FaChevronLeft size={30} />
          </button>

          <button 
            onClick={nextImage}
            className="absolute right-4 p-4 text-white hover:bg-white/10 rounded-full transition z-10"
          >
            <FaChevronRight size={30} />
          </button>

          <div className="w-full h-full flex items-center justify-center p-4 md:p-20">
            <img 
              src={images[currentIndex]} 
              className="max-w-full max-h-full object-contain select-none"
              alt="Expanded view"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;