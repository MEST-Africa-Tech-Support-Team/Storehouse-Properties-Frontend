import React, { useState, useEffect, useMemo } from "react";
import { 
  FaChevronDown, FaPlus, FaMinus, FaHeart, FaSpinner, FaCheck 
} from "react-icons/fa";
import PropertyCard from "../components/ui/propertyCard";
import FavoritesFilterBar from "../components/userDashboard/favouritesFilterBar.jsx"; 
import { propertyService } from "../services/propertyService"; 
import { authService } from "../services/authService";
import { toast } from "react-hot-toast"; 

const ExplorePage = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [initialLoad, setInitialLoad] = useState(true); 

  const [appliedFilters, setAppliedFilters] = useState({});

  const fetchProperties = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await propertyService.getProperties(filters);
      setAllProperties(data || []);
      if (initialLoad) setInitialLoad(false);
    } catch (error) {
      console.error("Fetch properties error:", error);
      toast.error("Failed to load properties. Please try again.");
      setAllProperties([]);
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

  useEffect(() => {
    fetchProperties();
    fetchFavorites();
  }, []);

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setPage(1);
    fetchProperties(filters); 
  };

  const handleResetFilters = () => {
    setAppliedFilters({});
    setActiveCategory("All");
    setPage(1);
    fetchProperties(); 
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

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

  const filteredProperties = useMemo(() => {
    let result = allProperties.filter(prop => {
      const matchCategory = activeCategory === "All" || prop.propertyType === activeCategory;
      
      // ✅ Fix location filtering - use location.city instead of location string
      const matchLocation = !appliedFilters.city || 
        (prop.location?.city && prop.location.city.toLowerCase().includes(appliedFilters.city.toLowerCase()));
      
      // ✅ Use pricePerNight instead of price
      const matchMinPrice = !appliedFilters.minPrice || prop.pricePerNight >= appliedFilters.minPrice;
      const matchMaxPrice = !appliedFilters.maxPrice || prop.pricePerNight <= appliedFilters.maxPrice;
      
      // ✅ Fix rules filtering - access rules object properly
      const matchChildren = appliedFilters.childrenAllowed === undefined || 
        (prop.rules?.childrenAllowed === appliedFilters.childrenAllowed);
      
      const matchPets = appliedFilters.petsAllowed === undefined || 
        (prop.rules?.petsAllowed === appliedFilters.petsAllowed);
      
      const matchType = !appliedFilters.propertyType || 
        (prop.propertyType?.toLowerCase() === appliedFilters.propertyType.toLowerCase());
      
      const matchTitle = !appliedFilters.title || 
        prop.title.toLowerCase().includes(appliedFilters.title.toLowerCase());
      
      const matchFeatured = !appliedFilters.featured || prop.featured === true;

      return matchCategory && 
             matchLocation && 
             matchMinPrice && 
             matchMaxPrice && 
             matchChildren && 
             matchPets && 
             matchType && 
             matchTitle && 
             matchFeatured;
    });

    // ✅ Sort by pricePerNight instead of price
    if (appliedFilters.sortBy === "Price: Low to High") {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (appliedFilters.sortBy === "Price: High to Low") {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return result;
  }, [allProperties, activeCategory, appliedFilters]);

  const visibleProperties = filteredProperties.slice(0, page * 20);

  return (
    <div className="bg-white min-h-screen">
      <section 
        className="relative h-[400px] w-full flex items-center px-4 sm:px-16 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black/50" /> 
        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <h1 className="text-[56px] font-black text-white tracking-tight mb-2">
            Explore Stays
          </h1>
          <p className="text-white/90 text-xl font-medium max-w-lg">
            Find verified luxury rental properties that fit your unique lifestyle and travel needs.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-16 -mt-10 relative z-30">
        <div className="max-w-[1440px] mx-auto">
          <FavoritesFilterBar 
            onApply={handleApplyFilters} 
            onReset={handleResetFilters} 
          />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-16 pt-16 pb-20">
        <div className="flex gap-3 mb-12 overflow-x-auto no-scrollbar">
          {["All", "apartment", "short-stay", "family-home", "luxury"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === "All" ? "All" : cat)}
              className={`px-8 py-2.5 rounded-full text-[12px] font-bold transition-all border ${
                activeCategory === cat || (activeCategory === "All" && cat === "All")
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/30" 
                : "bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100"
              }`}
            >
              {cat === "apartment" ? "Apartments" :
               cat === "short-stay" ? "Short Stays" :
               cat === "family-home" ? "Family Homes" :
               cat === "luxury" ? "Luxury" : "All"}
            </button>
          ))}
        </div>

        {initialLoad && loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found matching your criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {visibleProperties.map((prop) => (
                <div key={prop._id || prop.id} className="relative group animate-fadeIn">
                  {prop.badge && (
                    <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[9px] font-bold text-white uppercase shadow-sm ${
                      prop.badge === 'Price Drop' ? 'bg-[#22c55e]' : 'bg-primary'
                    }`}>
                      {prop.badge}
                    </div>
                  )}
                  <PropertyCard 
                    id={prop._id || prop.id}
                    images={prop.images}
                    title={prop.title}
                    description={prop.description}
                    propertyType={prop.propertyType}
                    pricePerNight={prop.pricePerNight}
                    maxGuests={prop.maxGuests}
                    amenities={prop.amenities}
                    rules={prop.rules}
                    location={prop.location}
                    isFavorite={favoriteIds.has(prop._id || prop.id)}
                    onFavoriteChange={handleFavoriteChange}
                  />
                </div>
              ))}
            </div>

            {visibleProperties.length < filteredProperties.length && (
              <div className="flex flex-col items-center gap-4 mt-20">
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="group flex items-center gap-3 px-12 py-3.5 border-2 border-primary text-primary font-black rounded-2xl hover:bg-primary hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[14px]"
                >
                  {loading ? (
                    <FaSpinner className="animate-spin text-lg" />
                  ) : (
                    "Load More Properties"
                  )}
                </button>
                <p className="text-gray-400 text-[12px] font-semibold">
                  Showing <span className="text-[#0f172a] font-bold">{visibleProperties.length}</span> of {filteredProperties.length} properties
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ExplorePage;