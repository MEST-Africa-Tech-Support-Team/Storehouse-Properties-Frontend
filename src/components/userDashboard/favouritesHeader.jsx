import React from 'react';

const FavoritesHeader = ({ count }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-extrabold text-gray-900">Favorites</h1>
      <p className="text-gray-600 mt-1">
        You have {count} favorite properties for your next trip
      </p>
    </div>
  );
};

export default FavoritesHeader;