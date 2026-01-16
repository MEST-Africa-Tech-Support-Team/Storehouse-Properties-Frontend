import React from 'react';

const LoadMoreButton = ({ onClick, loading = false }) => {
  return (
    <div className="text-center mt-8">
      <button
        onClick={onClick}
        disabled={loading}
        className={`px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Loading...' : 'Load More Bookings'}
      </button>
    </div>
  );
};

export default LoadMoreButton;