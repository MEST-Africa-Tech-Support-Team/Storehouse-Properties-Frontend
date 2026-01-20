import React, { useState, useMemo } from 'react';
import { 
  RiSearchLine, 
  RiEyeLine, 
  RiEditLine, 
  RiDeleteBin7Line,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiArrowDownSLine
} from "react-icons/ri";

const AdminPropertiesPage = () => {
  // 1. DUMMY DATA
  const initialProperties = [
    { id: 1, name: "Ocean View Villa", location: "Malibu, USA", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200", type: "Villa", price: 780, children: true, status: "active", bookings: 12, lastUpdated: "2 days ago", createdAt: 1735689600000 },
    { id: 2, name: "Modern Studio", location: "Berlin, Germany", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200", type: "Studio", price: 120, children: false, status: "draft", bookings: 0, lastUpdated: "5 hours ago", createdAt: 1738368000000 },
    { id: 3, name: "Urban Apartment", location: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200", type: "Apartment", price: 350, children: true, status: "unlisted", bookings: 45, lastUpdated: "1 week ago", createdAt: 1730419200000 },
    { id: 4, name: "Luxury Penthouse", location: "New York, USA", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200", type: "Apartment", price: 1200, children: false, status: "active", bookings: 8, lastUpdated: "3 days ago", createdAt: 1738454400000 },
    { id: 5, name: "Mountain House", location: "Aspen, USA", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=200", type: "House", price: 540, children: true, status: "active", bookings: 22, lastUpdated: "1 day ago", createdAt: 1738540800000 },
  ];

  // 2. STATES FOR SEARCH AND FILTERS
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    children: 'all',
    sort: 'newest'
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ status: 'all', type: 'all', children: 'all', sort: 'newest' });
  };

  // 3. FILTERING LOGIC
  const filteredProperties = useMemo(() => {
    return initialProperties
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filters.status === 'all' || item.status === filters.status;
        const matchesType = filters.type === 'all' || item.type.toLowerCase() === filters.type;
        const matchesChildren = filters.children === 'all' || 
                               (filters.children === 'yes' ? item.children : !item.children);

        return matchesSearch && matchesStatus && matchesType && matchesChildren;
      })
      .sort((a, b) => {
        if (filters.sort === 'newest') return b.createdAt - a.createdAt;
        if (filters.sort === 'oldest') return a.createdAt - b.createdAt;
        if (filters.sort === 'price-high') return b.price - a.price;
        if (filters.sort === 'price-low') return a.price - b.price;
        return 0;
      });
  }, [searchQuery, filters]);

  return (
    <div className="space-y-6">
      {/* SEARCH & FILTERS SECTION */}
      <section className="bg-white p-3 rounded-xl border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          
          {/* Flexible Search Bar */}
          <div className="relative flex-1 min-w-[200px]">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E7EB] rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] transition-all"
            />
          </div>

          {/* Status Filter */}
          <FilterSelect 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'draft', label: 'Draft' },
              { value: 'unlisted', label: 'Unlisted' },
            ]}
          />

          {/* Type Filter */}
          <FilterSelect 
            name="type" 
            value={filters.type} 
            onChange={handleFilterChange}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'apartment', label: 'Apartment' },
              { value: 'villa', label: 'Villa' },
              { value: 'studio', label: 'Studio' },
              { value: 'house', label: 'House' },
            ]}
          />

          {/* Children Policy Filter */}
          <FilterSelect 
            name="children" 
            value={filters.children} 
            onChange={handleFilterChange}
            options={[
              { value: 'all', label: 'All Policy' },
              { value: 'yes', label: 'Children: Yes' },
              { value: 'no', label: 'Children: No' },
            ]}
          />

          {/* Sorting Filter */}
          <FilterSelect 
            name="sort" 
            value={filters.sort} 
            onChange={handleFilterChange}
            options={[
              { value: 'newest', label: 'Sort: Newest' },
              { value: 'oldest', label: 'Sort: Oldest' },
              { value: 'time-added', label: 'Time Added' },
              { value: 'price-high', label: 'Price: High' },
              { value: 'price-low', label: 'Price: Low' },
            ]}
          />
          
          {/* Clear Filters Link */}
          <button 
            onClick={clearFilters} 
            className="text-xs font-bold text-[#1E5EFF] hover:underline whitespace-nowrap px-2"
          >
            Clear Filters
          </button>
        </div>
      </section>

      {/* DATA TABLE SECTION */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Property</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-center">Children</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-center">Bookings</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-4 text-xs font-bold text-[#6B7280] uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="w-11 h-11 rounded-lg object-cover bg-gray-100" />
                        <div>
                          <div className="font-bold text-[#1a1a1a] text-sm leading-tight">{item.name}</div>
                          <div className="text-xs text-[#6B7280] font-medium mt-0.5">{item.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1a1a1a] font-medium">{item.type}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#1a1a1a]">
                      ${item.price}<span className="text-[#6B7280] font-normal">/night</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold ${
                        item.children ? 'bg-[#1E5EFF] text-white' : 'bg-[#E5E7EB] text-[#1a1a1a]'
                      }`}>
                        {item.children ? 'YES' : 'NO'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'active' ? 'bg-[#DCFCE7] text-[#15803D]' : 
                        item.status === 'draft' ? 'bg-[#FEF3C7] text-[#B45309]' : 'bg-[#E5E7EB] text-[#374151]'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1a1a1a] font-bold text-center">{item.bookings}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280] font-medium">{item.lastUpdated}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <IconButton icon={<RiEyeLine />} color="hover:text-[#1E5EFF] hover:bg-blue-50" />
                        <IconButton icon={<RiEditLine />} color="hover:text-[#16A34A] hover:bg-green-50" />
                        <IconButton icon={<RiDeleteBin7Line />} color="hover:text-[#DC2626] hover:bg-red-50" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-[#6B7280] font-medium">
                    No properties found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION SECTION */}
        <div className="px-6 py-5 border-t border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#6B7280] font-medium">
            Showing <span className="text-[#1a1a1a] font-bold">{filteredProperties.length}</span> of <span className="text-[#1a1a1a] font-bold">{initialProperties.length}</span> properties
          </p>
          <div className="flex items-center gap-2">
            <PaginationButton icon={<RiArrowLeftSLine />} disabled />
            <PaginationButton label="1" active />
            <PaginationButton label="2" />
            <PaginationButton icon={<RiArrowRightSLine />} />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- HELPER SUB-COMPONENTS ---

const FilterSelect = ({ name, value, onChange, options }) => (
  <div className="relative min-w-[140px]">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="appearance-none w-full bg-white border border-[#E5E7EB] rounded-lg px-4 py-2.5 pr-10 text-sm font-semibold text-[#1a1a1a] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] transition-all shadow-sm"
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
  <button className={`p-2 rounded-lg text-gray-500 transition-all ${color}`}>
    {React.cloneElement(icon, { size: 18 })}
  </button>
);

const PaginationButton = ({ label, icon, active, disabled }) => (
  <button 
    disabled={disabled}
    className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold transition-all border ${
      active ? 'bg-[#1E5EFF] border-[#1E5EFF] text-white' : 'bg-white border-[#E5E7EB] text-[#1a1a1a] hover:bg-gray-50'
    } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    {label || icon}
  </button>
);

export default AdminPropertiesPage;