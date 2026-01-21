import React, { useState, useMemo } from "react";
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
  const initialProperties = [
    {
      id: 1,
      name: "Ocean View Villa",
      location: "Malibu, USA",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200",
      type: "Villa",
      price: 780,
      children: true,
      status: "active",
      bookings: 12,
      lastUpdated: "2 days ago",
      createdAt: 1735689600000,
    },
    {
      id: 2,
      name: "Modern Studio",
      location: "Berlin, Germany",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200",
      type: "Studio",
      price: 120,
      children: false,
      status: "draft",
      bookings: 0,
      lastUpdated: "5 hours ago",
      createdAt: 1738368000000,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle
  const [filters, setFilters] = useState({
    status: "all",
    type: "all",
    children: "all",
    sort: "newest",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({ status: "all", type: "all", children: "all", sort: "newest" });
  };

  const filteredProperties = useMemo(() => {
    return initialProperties
      .filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          filters.status === "all" || item.status === filters.status;
        const matchesType =
          filters.type === "all" || item.type.toLowerCase() === filters.type;
        const matchesChildren =
          filters.children === "all" ||
          (filters.children === "yes" ? item.children : !item.children);
        return matchesSearch && matchesStatus && matchesType && matchesChildren;
      })
      .sort((a, b) => {
        if (filters.sort === "newest") return b.createdAt - a.createdAt;
        if (filters.sort === "price-high") return b.price - a.price;
        if (filters.sort === "price-low") return a.price - b.price;
        return 0;
      });
  }, [searchQuery, filters]);

  return (
    <div className="space-y-6">
      {/* SEARCH & FILTERS SECTION */}
      <section className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search Bar & Mobile Filter Toggle */}
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-[#E5E7EB] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] transition-all"
              />
            </div>
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2.5 bg-white border border-[#E5E7EB] rounded-lg text-[#1a1a1a]"
            >
              <RiFilter3Line size={20} />
            </button>
          </div>

          {/* Filters - Hidden on mobile unless toggled */}
          <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-stretch lg:items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200`}>
            <FilterSelect
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "draft", label: "Draft" },
                { value: "unlisted", label: "Unlisted" },
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
                { value: "studio", label: "Studio" },
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
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-[#1E5EFF] hover:underline whitespace-nowrap px-2 py-2 lg:py-0 text-center"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* DATA VIEW */}
      <section>
        {/* MOBILE VIEW (Cards) - Hidden on Large Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          {filteredProperties.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm space-y-4">
              <div className="flex gap-4">
                <img src={item.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {item.status}
                  </span>
                  <h3 className="font-bold text-[#1a1a1a] mt-1 line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-[#6B7280]">{item.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50 text-sm">
                <div>
                  <p className="text-[#6B7280] text-[11px] uppercase font-bold tracking-wider">Price</p>
                  <p className="font-bold text-[#1a1a1a]">${item.price}/night</p>
                </div>
                <div>
                  <p className="text-[#6B7280] text-[11px] uppercase font-bold tracking-wider">Bookings</p>
                  <p className="font-bold text-[#1a1a1a]">{item.bookings}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <IconButton icon={<RiEyeLine />} color="bg-blue-50 text-blue-600" />
                  <IconButton icon={<RiEditLine />} color="bg-green-50 text-green-600" />
                  <IconButton icon={<RiDeleteBin7Line />} color="bg-red-50 text-red-600" />
                </div>
                <p className="text-[11px] text-[#6B7280]">Updated {item.lastUpdated}</p>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW (Table) - Hidden on Small Screens */}
        <div className="hidden lg:block bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-center">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-center">Bookings</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filteredProperties.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="w-11 h-11 rounded-lg object-cover bg-gray-100" />
                        <div>
                          <div className="font-bold text-[#1a1a1a] text-sm">{item.name}</div>
                          <div className="text-xs text-[#6B7280]">{item.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1a1a1a] font-medium">{item.type}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#1a1a1a] text-center">${item.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === "active" ? "bg-[#DCFCE7] text-[#15803D]" : "bg-[#FEF3C7] text-[#B45309]"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1a1a1a] font-bold text-center">{item.bookings}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <IconButton icon={<RiEyeLine />} color="hover:text-[#1E5EFF] hover:bg-blue-50" />
                        <IconButton icon={<RiEditLine />} color="hover:text-[#16A34A] hover:bg-green-50" />
                        <IconButton icon={<RiDeleteBin7Line />} color="hover:text-[#DC2626] hover:bg-red-50" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PAGINATION SECTION */}
      <div className="px-6 py-5 bg-white rounded-xl border border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#6B7280] font-medium text-center sm:text-left">
          Showing <span className="text-[#1a1a1a] font-bold">{filteredProperties.length}</span> properties
        </p>
        <div className="flex items-center gap-2">
          <PaginationButton icon={<RiArrowLeftSLine />} disabled />
          <PaginationButton label="1" active />
          <PaginationButton icon={<RiArrowRightSLine />} />
        </div>
      </div>
    </div>
  );
};

// --- HELPER SUB-COMPONENTS ---

const FilterSelect = ({ name, value, onChange, options }) => (
  <div className="relative flex-1 lg:min-w-[140px]">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="appearance-none w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 pr-10 text-sm font-semibold text-[#1a1a1a] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] transition-all"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
      <RiArrowDownSLine size={18} />
    </div>
  </div>
);

const IconButton = ({ icon, color }) => (
  <button className={`p-2 rounded-lg transition-all ${color}`}>
    {React.cloneElement(icon, { size: 18 })}
  </button>
);

const PaginationButton = ({ label, icon, active, disabled }) => (
  <button
    disabled={disabled}
    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all border ${
      active ? "bg-[#1E5EFF] border-[#1E5EFF] text-white" : "bg-white border-[#E5E7EB] text-[#1a1a1a] hover:bg-gray-50"
    } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
  >
    {label || icon}
  </button>
);

export default AdminPropertiesPage;