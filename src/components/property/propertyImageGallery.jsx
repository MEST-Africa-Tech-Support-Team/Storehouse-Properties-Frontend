// src/components/PropertyImageGallery.jsx
import { useState } from 'react';
import { FaExpandAlt, FaCompressAlt } from 'react-icons/fa';

export default function PropertyImageGallery({ images }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-xl ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <img
        src={images[currentIndex]}
        alt="Property"
        className={`w-full h-full object-cover transition-transform duration-300 ${isFullscreen ? 'object-contain' : 'object-cover'}`}
      />
      
      {/* Fullscreen Toggle */}
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
      >
        {isFullscreen ? <FaCompressAlt /> : <FaExpandAlt />}
      </button>

      {/* Navigation Arrows */}
      {!isFullscreen && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Thumbnail Strip */}
      {!isFullscreen && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 p-2">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className={`h-12 w-16 object-cover rounded cursor-pointer border-2 ${idx === currentIndex ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}