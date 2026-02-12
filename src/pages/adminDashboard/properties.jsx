import React, { useState, useMemo, useEffect } from "react";
import { propertyService } from "../../services/propertyService"; // Ensure this exists
import { toast } from "react-hot-toast";
import {
  RiSearchLine,
  RiEyeLine,
  RiEditLine,
  RiDeleteBin7Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiFilter3Line,
} from "react-icons/ri";

const AdminPropertiesPage = () => {
  // --- STATE ---
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    sort: "newest",
  });

  // --- API INTEGRATION ---
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      // API Call: GET /properties
      const data = await propertyService.getProperties();
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    
    const t = toast.loading("Deleting property...");
    try {
      await propertyService.deleteProperty(id);
      toast.success("Property deleted successfully");
      setProperties(properties.filter(p => (p._id || p.id) !== id));
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      toast.dismiss(t);
    }
  };

  // --- LOGIC ---
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ status: "all", type: "all", sort: "newest" });
  };

  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        const name = item.title || item.name || "";
        const loc = item.location?.address || item.location || "";
        
        const matchesSearch =
          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          loc.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus =
          filters.status === "all" || item.status === filters.status;
        
        const matchesType =
          filters.type === "all" || 
          (item.propertyType || item.type || "").toLowerCase() === filters.type;

        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        if (filters.sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
        if (filters.sort === "price-high") return (b.price || 0) - (a.price || 0);
        if (filters.sort === "price-low") return (a.price || 0) - (b.price || 0);
        return 0;
      });
  }, [properties, searchQuery, filters]);

  return (
    <div className="space-y-6">
      {/* SEARCH & FILTERS SECTION */}
      <section className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties by name or location..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2.5 bg-white border border-[#E5E7EB] rounded-lg text-[#1a1a1a]"
            >
              <RiFilter3Line size={20} />
            </button>
          </div>

          <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200`}>
            <FilterSelect
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "draft", label: "Draft" },
                { value: "pending", label: "Pending" },
              ]}
            />
            <FilterSelect
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              options={[
                { value: "all", label: "All Types" },
                { value: "apartment", label: "Apartment" },
                { value: "villa", label: "Villa" },
                { value: "house", label: "House" },
              ]}
            />
            <FilterSelect
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              options={[
                { value: "newest", label: "Sort: Newest" },
                { value: "price-high", label: "Price: High" },
                { value: "price-low", label: "Price: Low" },
              ]}
            />
            <button onClick={clearFilters} className="text-xs font-bold text-[#1E5EFF] px-2 hover:underline">
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* DATA VIEW */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 bg-gray-100 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase">Property</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase">Price/Night</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase">Guest</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredProperties.map((item) => {
                  const itemId = item._id || item.id;
                  return (
                    <tr key={itemId} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.coverPhoto || item.images?.[0] || "https://via.placeholder.com/100"} 
                            className="w-12 h-12 rounded-lg object-cover" 
                            alt="" 
                          />
                          <div>
                            <div className="font-bold text-[#1a1a1a] text-sm">{item.title || item.name}</div>
                            <div className="text-xs text-[#6B7280]">
                              {typeof item.location === 'object' ? item.location.city : item.location},
                               {typeof item.location === 'object' ? item.location.country : ""}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm">{item.propertyType}</td>
                      <td className="px-6 py-4 font-bold text-sm">₵{item.pricePerNight?.toLocaleString()}</td>
                      <td className="px-6 py-4 font-bold text-sm">{item.maxGuests} max</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          item.status === "active" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}>
                          {item.status || "draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <IconButton icon={<RiEyeLine />} color="hover:text-blue-600" />
                          <IconButton icon={<RiEditLine />} color="hover:text-green-600" />
                          <IconButton 
                            onClick={() => handleDelete(itemId)}
                            icon={<RiDeleteBin7Line />} 
                            color="hover:text-red-600" 
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredProperties.length === 0 && (
              <div className="p-10 text-center text-gray-500">No properties found.</div>
            )}
          </div>
        </section>
      )}

      {/* PAGINATION */}
      <div className="px-6 py-4 bg-white rounded-xl border border-[#E5E7EB] flex items-center justify-between">
        <p className="text-sm text-gray-500">Total: {filteredProperties.length} properties</p>
        <div className="flex gap-2">
          <PaginationButton icon={<RiArrowLeftSLine />} disabled />
          <PaginationButton label="1" active />
          <PaginationButton icon={<RiArrowRightSLine />} disabled />
        </div>
      </div>
    </div>
  );
};

// --- HELPERS ---

const FilterSelect = ({ name, value, onChange, options }) => (
  <div className="relative">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="appearance-none bg-white border border-[#E5E7EB] rounded-lg px-4 py-2 pr-10 text-sm font-semibold focus:outline-none focus:border-[#1E5EFF]"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
  </div>
);

const IconButton = ({ icon, color, onClick }) => (
  <button onClick={onClick} className={`p-2 rounded-lg transition-all ${color} bg-gray-50`}>
    {React.cloneElement(icon, { size: 18 })}
  </button>
);

const PaginationButton = ({ label, icon, active, disabled }) => (
  <button
    disabled={disabled}
    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border ${
      active ? "bg-[#1E5EFF] text-white border-[#1E5EFF]" : "bg-white text-gray-700 border-[#E5E7EB]"
    } ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"}`}
  >
    {label || icon}
  </button>
);

export default AdminPropertiesPage;