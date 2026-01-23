import React, { useState, useEffect, useMemo } from "react";
import { 
  FaChevronDown, FaPlus, FaMinus, FaHeart, FaSpinner, FaCheck 
} from "react-icons/fa";
import PropertyCard from "../components/ui/propertyCard";
import FavoritesFilterBar from "../components/userDashboard/favouritesFilterBar.jsx"; 
import { propertyService } from "../services/propertyService"; // ✅ Added service
import { toast } from "react-hot-toast"; // ✅ Added for error handling

const ExplorePage = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [initialLoad, setInitialLoad] = useState(true); // ✅ Track initial load

  // State for filter values (managed by FavoritesFilterBar)
  const [appliedFilters, setAppliedFilters] = useState({});

  // ✅ Fetch properties from backend
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

  // ✅ Fetch on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Handle filters from FavoritesFilterBar
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setPage(1);
    fetchProperties(filters); // ✅ Fetch filtered properties
  };

  const handleResetFilters = () => {
    setAppliedFilters({});
    setActiveCategory("All");
    setPage(1);
    fetchProperties(); // ✅ Reset to all properties
  };

  const handleLoadMore = () => {
    // ✅ Since we're fetching all properties at once, 
    // just increment page to show more items
    setPage((prev) => prev + 1);
  };

  // Apply filters from FavoritesFilterBar + category
  const filteredProperties = useMemo(() => {
    let result = allProperties.filter(prop => {
      // Category filter
      const matchCategory = activeCategory === "All" || prop.category === activeCategory;
      
      // Location filter (from city param)
      const matchLocation = !appliedFilters.city || 
        prop.location.toLowerCase().includes(appliedFilters.city.toLowerCase());
      
      // Price filters
      const matchMinPrice = !appliedFilters.minPrice || prop.price >= appliedFilters.minPrice;
      const matchMaxPrice = !appliedFilters.maxPrice || prop.price <= appliedFilters.maxPrice;
      
      // Child policy
      const matchChildren = appliedFilters.childrenAllowed === undefined || 
        (prop.childrenAllowed === appliedFilters.childrenAllowed);
      
      // Pet policy
      const matchPets = appliedFilters.petsAllowed === undefined || 
        (prop.petsAllowed === appliedFilters.petsAllowed);
      
      // Property type
      const matchType = !appliedFilters.propertyType || 
        (prop.propertyType?.toLowerCase() === appliedFilters.propertyType.toLowerCase());
      
      // Title/keyword
      const matchTitle = !appliedFilters.title || 
        prop.title.toLowerCase().includes(appliedFilters.title.toLowerCase());
      
      // Featured only
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

    // Sorting
    if (appliedFilters.sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (appliedFilters.sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [allProperties, activeCategory, appliedFilters]);

  // ✅ Simple pagination (show 20 items per page)
  const visibleProperties = filteredProperties.slice(0, page * 20);

  return (
    <div className="bg-white min-h-screen">
      <section 
        className="relative h-[400px] w-full flex items-center px-4 sm:px-16 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black/40" /> 
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
          {["All", "Apartments", "Short Stays", "Family Homes", "Luxury"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-full text-[12px] font-bold transition-all border ${
                activeCategory === cat 
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100" 
                : "bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {initialLoad && loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
                      prop.badge === 'Price Drop' ? 'bg-[#22c55e]' : 'bg-blue-600'
                    }`}>
                      {prop.badge}
                    </div>
                  )}
                  <PropertyCard 
                    id={prop._id || prop.id}
                    image={prop.image}
                    title={prop.title}
                    location={prop.location}
                    rating={prop.rating || 4.5}
                    price={prop.price}
                    description={prop.description}
                    badge={prop.badge}
                    category={prop.category}
                    images={prop.images}
                    isFavorite={prop.isFavorite || false}
                  />
                </div>
              ))}
            </div>

            {visibleProperties.length < filteredProperties.length && (
              <div className="flex flex-col items-center gap-4 mt-20">
                <button 
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="group flex items-center gap-3 px-12 py-3.5 border-2 border-blue-600 text-blue-600 font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[14px]"
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