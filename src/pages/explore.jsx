import React, { useState, useEffect, useMemo } from "react";
import { 
  FaChevronDown, FaPlus, FaMinus, FaHeart, FaSpinner, FaCheck 
} from "react-icons/fa";

import { Property, PropertyService } from "../lib/property";
import PropertyCard from "../components/ui/propertyCard";
import FavoritesFilterBar from "../components/userDashboard/favouritesFilterBar.jsx"; 

const ExplorePage = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // State for filter values (managed by FavoritesFilterBar)
  const [appliedFilters, setAppliedFilters] = useState({});

  useEffect(() => {
    const rawData = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      image: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60&sig=${i}`,
      title: "The Avery Apartment",
      location: i % 2 === 0 ? "Greater Accra, Ghana" : "Lagos, Nigeria",
      rating: 4.9,
      price: 180 + (i * 5),
      badge: i % 6 === 0 ? "Price Drop" : i % 4 === 0 ? "New Listing" : null,
      category: ["Apartments", "Luxury", "Short Stays", "Family Homes"][i % 4]
    }));

    setAllProperties(rawData.map(item => new Property(item)));
  }, []);

  // Handle filters from FavoritesFilterBar
  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    setPage(1); // Reset to first page on new search
  };

  const handleResetFilters = () => {
    setAppliedFilters({});
    setActiveCategory("All");
    setPage(1);
  };

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 800);
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
        prop.type?.toLowerCase() === appliedFilters.propertyType.toLowerCase();
      
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
    // Note: "Popularity" is default order

    return result;
  }, [allProperties, activeCategory, appliedFilters]);

  const visibleProperties = PropertyService.getPaginatedItems(filteredProperties, page);

  return (
    <div className="bg-white min-h-screen">
      <section 
        className="relative h-[400px] w-full flex items-center px-16 bg-cover bg-center"
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

      {/* ✅ Replaced entire filter bar with FavoritesFilterBar */}
      <section className="px-16 -mt-10 relative z-30">
        <div className="max-w-[1440px] mx-auto">
          <FavoritesFilterBar 
            onApply={handleApplyFilters} 
            onReset={handleResetFilters} 
          />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-16 pt-16 pb-20">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {visibleProperties.map((prop) => (
            <div key={prop.id} className="relative group animate-fadeIn">
              {prop.badge && (
                <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[9px] font-bold text-white uppercase shadow-sm ${
                  prop.badge === 'Price Drop' ? 'bg-[#22c55e]' : 'bg-blue-600'
                }`}>
                  {prop.badge}
                </div>
              )}
              <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white hover:text-red-500 transition-all">
                <FaHeart size={12} />
              </button>
              
              <PropertyCard {...prop} />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 mt-20">
          <button 
            onClick={handleLoadMore}
            disabled={loading || visibleProperties.length >= filteredProperties.length}
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
      </section>
    </div>
  );
};

export default ExplorePage;