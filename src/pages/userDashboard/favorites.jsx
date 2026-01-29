import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { toast } from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

import UserSidebar from "../../components/userDashboard/userSidebar.jsx";
import PropertyCard from "../../components/ui/propertyCard.jsx";
import FavoritesFilterBar from "../../components/userDashboard/favouritesFilterBar.jsx";
import FavoritesHeader from "../../components/userDashboard/favouritesHeader.jsx";

const FavoritesPage = () => {
  const { userName } = useOutletContext();
  const { currentUser } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch user's favorite properties using token from authService
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = authService.getToken();
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/favorites/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData.message || `Failed to load favorites (${response.status})`;
        throw new Error(message);
      }

      const data = await response.json();
      const favoritesData = Array.isArray(data) ? data : (data.favorites || data.properties || []);
      
      setFavorites(favoritesData);
      setFilteredFavorites(favoritesData);

    } catch (err) {
      console.error('Fetch favorites error:', err);
      setError(err.message || 'Failed to load favorites. Please try again.');
      toast.error(err.message || 'Failed to load favorites. Please try again.');
      setFavorites([]);
      setFilteredFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleApplyFilters = (filters) => {
    let result = [...favorites];

    if (filters.location) {
      result = result.filter((p) =>
        ((p.location?.city || p.location?.address || '') + '')
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    if (filters.sortBy === "Price: Low to High") {
      result.sort((a, b) => (a.pricePerNight || 0) - (b.pricePerNight || 0));
    } else if (filters.sortBy === "Price: High to Low") {
      result.sort((a, b) => (b.pricePerNight || 0) - (a.pricePerNight || 0));
    } else if (filters.sortBy === "Rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredFavorites(result);
  };

  const handleResetFilters = () => {
    setFilteredFavorites(favorites);
  };

  if (loading) {
    return (
      <div className="flex">
        <UserSidebar />
        <div className="ml-64 p-6 max-w-[1400px] w-full">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-48 bg-gray-200 rounded-xl"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && favorites.length === 0) {
    return (
      <div className="flex">
        <UserSidebar />
        <div className="ml-64 p-6 max-w-[1400px] w-full">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{error}</p>
            <button
              onClick={fetchFavorites}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <UserSidebar />
      <div className="ml-64 p-6 max-w-[1400px] w-full">
        <FavoritesHeader count={filteredFavorites.length} />

        <FavoritesFilterBar
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">You haven't added any properties to your favorites yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFavorites.map((property) => (
              <PropertyCard
                key={property._id || property.id}
                id={property._id || property.id}
                images={property.images}
                title={property.title}
                description={property.description}
                propertyType={property.propertyType}
                pricePerNight={property.pricePerNight}
                maxGuests={property.maxGuests}
                amenities={property.amenities}
                rules={property.rules}
                location={property.location}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
