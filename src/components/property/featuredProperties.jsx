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
    const abortController = new AbortController();
    
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await propertyService.getProperties(
          { featured: true },
          { signal: abortController.signal }
        );
        
        setFeaturedProperties(data.slice(0, 8));
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch featured properties:', err);
          setError('Failed to load featured properties');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      const token = authService.getToken();
      if (!token) {
        setFavoriteIds(new Set());
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/favorites/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: abortController.signal
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        const data = await response.json();
        
        const favoritesArray = Array.isArray(data) 
          ? data 
          : data.favorites || data.data || data.properties || [];
        
        const ids = new Set(
          favoritesArray
            .map(item => {
             
              if (item.property) return item.property._id || item.property.id;
              return item._id || item.id;
            })
            .filter(Boolean) 
        );
        
        setFavoriteIds(ids);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch favorites:', err);
        }
      }
    };

    fetchFeaturedProperties();
    fetchFavorites();

    return () => abortController.abort(); 
  }, []);

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

  // ✅ Loading state
  if (loading && featuredProperties.length === 0) {
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

        <div className="
          grid gap-6
          grid-flow-col grid-rows-2 auto-cols-[85%]
          overflow-x-auto scroll-smooth pb-4
          sm:grid-flow-row sm:grid-cols-2 sm:auto-cols-auto sm:overflow-visible
          lg:grid-cols-4
          [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        ">
          {featuredProperties.map((property) => {
            const locationString = property.location?.city 
              ? `${property.location.city}, ${property.location.region || ''}`.trim()
              : property.location?.address || 'Location not available';

            const propertyId = property._id || property.id;
            const isFavorited = favoriteIds.has(propertyId);

            return (
              <PropertyCard
                key={propertyId}
                id={propertyId}
                images={property.images || []}
                title={property.title}
                description={property.description || ''}
                propertyType={property.propertyType || 'Apartment'}
                pricePerNight={property.pricePerNight || 0}
                maxGuests={property.maxGuests || 2}
                amenities={property.amenities || []}
                rules={property.rules || {}}
                location={locationString}
                isFavorite={isFavorited}
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