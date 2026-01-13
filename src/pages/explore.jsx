import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  FaChevronDown, FaPlus, FaMinus, FaSearch, 
  FaHeart, FaSpinner, FaCheck 
} from "react-icons/fa";

import { Property, PropertyService } from "../lib/property";
import PropertyCard from "../components/ui/PropertyCard";

const ExplorePage = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const [searchLocation, setSearchLocation] = useState("");
  const [tempSearch, setTempSearch] = useState(""); 
  const [guests, setGuests] = useState(2);
  const [childIncluded, setChildIncluded] = useState("Yes");
  const [propertyType, setPropertyType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Popularity");

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

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      setSearchLocation(tempSearch);
      setPage(1); 
      setLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setTempSearch("");
    setSearchLocation("");
    setGuests(2);
    setChildIncluded("Yes");
    setPropertyType("All Types");
    setSortBy("Popularity");
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

  const filteredProperties = useMemo(() => {
    let result = allProperties.filter(prop => {
      const matchCategory = activeCategory === "All" || prop.category === activeCategory;
      const matchLocation = prop.location.toLowerCase().includes(searchLocation.toLowerCase());
      return matchCategory && matchLocation;
    });

    if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [allProperties, activeCategory, searchLocation, sortBy]);

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

      <section className="px-16 -mt-10 relative z-30">
        <div className="max-w-[1440px] mx-auto bg-white rounded-[20px] shadow-[0_15px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-100 p-5 flex items-end gap-4">
          
          <div className="flex-[1.5] min-w-[180px]">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Location</label>
            <div className="relative">
              <input 
                type="text" 
                value={tempSearch}
                onChange={(e) => setTempSearch(e.target.value)}
                placeholder="Where are you going?" 
                className="w-full bg-gray-50 rounded-xl px-4 py-3 text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
              />
              <FaSearch className="absolute right-4 top-3.5 text-gray-300 text-xs" />
            </div>
          </div>

          <CustomDropdown 
            label="Child Included" 
            options={["Yes", "No"]} 
            value={childIncluded} 
            onChange={setChildIncluded} 
          />

          <CustomDropdown 
            label="Property Type" 
            options={["All Types", "Apartments", "Houses", "Luxury Villas"]} 
            value={propertyType} 
            onChange={setPropertyType} 
          />

          <div className="min-w-[110px]">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Guests</label>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 border border-transparent">
              <button onClick={() => setGuests(Math.max(1, guests - 1))} className="text-gray-400 hover:text-blue-600"><FaMinus size={8}/></button>
              <span className="font-bold text-[13px] text-[#0f172a]">{guests}</span>
              <button onClick={() => setGuests(guests + 1)} className="text-gray-400 hover:text-blue-600"><FaPlus size={8}/></button>
            </div>
          </div>

          <CustomDropdown 
            label="Sort By" 
            options={["Popularity", "Price: Low to High", "Price: High to Low"]} 
            value={sortBy} 
            onChange={setSortBy} 
          />

          <div className="flex items-center gap-2">
            <button 
              onClick={handleApply}
              className="bg-blue-600 text-white h-[46px] px-8 rounded-xl font-bold text-[13px] hover:bg-blue-700 transition-all flex items-center justify-center min-w-[100px]"
            >
              {loading && searchLocation !== tempSearch ? <FaSpinner className="animate-spin" /> : "Apply"}
            </button>
            <button 
              onClick={handleReset}
              className="text-gray-400 font-bold text-[13px] h-[46px] px-4 hover:text-blue-600 transition-colors"
            >
              Reset
            </button>
          </div>
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

const CustomDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-w-[140px] relative" ref={dropdownRef}>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors border border-transparent select-none"
      >
        <span className="font-bold text-[13px] text-[#0f172a] truncate mr-2">{value}</span>
        <FaChevronDown className={`text-[9px] text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 shadow-xl rounded-xl py-2 overflow-hidden animate-slideDown">
          {options.map((opt) => (
            <div 
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className="px-4 py-2 text-[13px] font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 cursor-pointer flex items-center justify-between"
            >
              {opt}
              {value === opt && <FaCheck className="text-[10px]" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;