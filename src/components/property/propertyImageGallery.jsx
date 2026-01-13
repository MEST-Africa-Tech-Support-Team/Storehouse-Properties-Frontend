import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const PropertyImageGallery = ({ images = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  const previewImages = images.slice(0, 5);
  const remainingCount = Math.max(0, images.length - 5);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Preview Grid */}
      <div className="flex flex-col md:flex-row gap-2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
        <div
          className="w-full md:w-3/5 relative overflow-hidden group cursor-pointer"
          onClick={() => openLightbox(0)}
        >
          {previewImages[0] && (
            <img
              src={previewImages[0]}
              alt="Main property view"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="w-full md:w-2/5 grid grid-cols-2 grid-rows-2 gap-2">
          {previewImages.slice(1).map((img, idx) => {
            const isLastSlot = idx === 3;
            const showBadge = isLastSlot && remainingCount > 0;
            return (
              <div
                key={idx}
                className="relative overflow-hidden group cursor-pointer rounded-xl"
                onClick={() => openLightbox(idx + 1)}
              >
                {img && (
                  <img
                    src={img}
                    alt={`Property detail ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {showBadge && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="bg-white text-gray-900 font-bold text-xs md:text-sm px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                      +{remainingCount} photo{remainingCount !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          {previewImages.length < 5 &&
            Array.from({ length: 5 - previewImages.length })
              .slice(1)
              .map((_, idx) => <div key={`empty-${idx}`} className="bg-gray-100 rounded-xl" />)}
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-start p-6 md:p-8"
          onClick={() => setShowModal(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close gallery"
          >
            <FaTimes className="text-gray-700" size={20} />
          </button>

          <div className="w-full max-w-6xl mb-4">
            <p className="text-gray-700 font-medium text-left text-sm md:text-base">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          <div
            className="w-full max-w-6xl h-[60vh] md:h-[70vh] mb-4 overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex]}
              alt={`Property photo ${currentIndex + 1}`}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              draggable={false}
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 flex items-center justify-center bg-white shadow-sm transition"
            aria-label="Previous photo"
          >
            <FaChevronLeft className="text-gray-700" size={14} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 flex items-center justify-center bg-white shadow-sm transition"
            aria-label="Next photo"
          >
            <FaChevronRight className="text-gray-700" size={14} />
          </button>

          <div className="w-full max-w-6xl overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-3 w-max">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectImage(idx);
                  }}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                    idx === currentIndex
                      ? 'border-blue-500 scale-105'
                      : 'border-transparent blur-[2px] grayscale hover:blur-none hover:grayscale-0'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyImageGallery;