import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import PropertyCard from "../ui/propertyCard";
import { propertyService } from "../../services/propertyService";
import { authService } from "../../services/authService";

const FeaturedStays = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ✅ Fetch featured properties from API endpoint
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // ✅ Call endpoint: GET /properties?featured=true
        const data = await propertyService.getProperties({ featured: true });
        
        // ✅ Limit to max 8 properties
        const limitedProperties = data.slice(0, 8);
        setFeaturedProperties(limitedProperties);
      } catch (err) {
        console.error('Failed to fetch featured properties:', err);
        setError('Failed to load featured properties');
      } finally {
        setLoading(false);
      }
    };

    // ✅ Fetch user's favorite property IDs
    const fetchFavorites = async () => {
      const token = authService.getToken();
      if (!token) {
        setFavoriteIds(new Set());
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/favorites/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) return;

        const data = await response.json();
        const favoritesData = Array.isArray(data) ? data : (data.favorites || data.properties || []);
        const ids = new Set(favoritesData.map(p => p._id || p.id));
        setFavoriteIds(ids);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFeaturedProperties();
    fetchFavorites();
  }, []);

  // ✅ Loading state - show skeleton while fetching
  if (loading) {
    return (
      <section className="bg-white py-20 px-4 md:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-[36px] font-extrabold tracking-tight text-[#0f1d37]">
              Featured Stays
            </h2>
            <div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>
          </div>
          
          <div className="grid gap-6 grid-flow-col grid-rows-2 auto-cols-[85%] overflow-x-auto pb-4 sm:grid-flow-row sm:grid-cols-2 sm:auto-cols-auto sm:overflow-visible lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ✅ Error state - show error message
  if (error) {
    return (
      <section className="bg-white py-20 px-4 md:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-[36px] font-extrabold tracking-tight text-[#0f1d37]">
              Featured Stays
            </h2>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // ✅ Handle when a favorite is toggled from PropertyCard
  const handleFavoriteChange = (propertyId, isFavorited) => {
    setFavoriteIds(prev => {
      const newSet = new Set(prev);
      if (isFavorited) {
        newSet.add(propertyId);
      } else {
        newSet.delete(propertyId);
      }
      return newSet;
    });
  };

  // ✅ No featured properties found
  if (featuredProperties.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 px-4 md:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-[36px] font-extrabold tracking-tight text-[#0f1d37]">
            Featured Stays
          </h2>

          <Link
            to="/explore"
            className="group flex items-center gap-3 text-[16px] font-bold text-primary transition-colors hover:text-hover"
          >
            View All
            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>

        <div
          className="
            grid gap-6
            grid-flow-col grid-rows-2 auto-cols-[85%]
            overflow-x-auto scroll-smooth pb-4

            sm:grid-flow-row sm:grid-cols-2 sm:auto-cols-auto sm:overflow-visible
            lg:grid-cols-4

            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {featuredProperties.map((property) => {
            // ✅ Normalize property data to match PropertyCard props
            const locationString = property.location?.city 
              ? `${property.location.city}, ${property.location.region || ''}`.trim()
              : property.location?.address || 'Location not available';

            return (
              <PropertyCard
                key={property._id || property.id}
                id={property._id || property.id}
                images={property.images || []}
                title={property.title}
                location={locationString}
                pricePerNight={property.pricePerNight}
                description={property.description}
                propertyType={property.propertyType}
                maxGuests={property.maxGuests}
                amenities={property.amenities}
                rules={property.rules}
                isFavorite={favoriteIds.has(property._id || property.id)}
                onFavoriteChange={handleFavoriteChange}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStays;