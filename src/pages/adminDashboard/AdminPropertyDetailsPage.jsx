import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../../services/propertyService';
import { toast } from 'react-hot-toast';
import { 
  RiArrowLeftSLine, 
  RiEditLine, 
  RiMapPinLine, 
  RiHotelBedLine, 
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
  RiFocus3Line
} from "react-icons/ri";

const AdminPropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await propertyService.getPropertyById(id);
        // If your API returns { property: {...} }, use data.property
        setProperty(data.property || data);
      } catch (err) {
        toast.error("Could not load property details");
        navigate('/admin/properties');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate]);

  if (loading) return <div className="p-20 text-center animate-pulse font-bold text-gray-400">Loading Property Details...</div>;
  if (!property) return <div className="p-20 text-center font-bold">Property not found.</div>;

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <Link to="/admin/properties" className="flex items-center text-sm font-bold text-[#1E5EFF] mb-2 hover:gap-2 transition-all w-fit">
            <RiArrowLeftSLine size={20} /> Back to List
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">{property.title}</h1>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <RiMapPinLine className="text-[#1E5EFF]" />
            {property.location?.address}, {property.location?.city}, {property.location?.region}
          </div>
        </div>
        
        <Link 
          to={`/admin/properties/edit/${id}`}
          className="flex items-center justify-center gap-2 bg-[#1E5EFF] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <RiEditLine size={18} />
          Edit Property
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Gallery */}
          <section className="bg-white p-2 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[450px]">
              <div className="col-span-3 row-span-2 overflow-hidden rounded-l-xl">
                <img src={property.images?.[0]} className="w-full h-full object-cover" alt="Main" />
              </div>
              <div className="col-span-1 overflow-hidden rounded-tr-xl">
                <img src={property.images?.[1] || property.images?.[0]} className="w-full h-full object-cover" alt="Sub" />
              </div>
              <div className="col-span-1 overflow-hidden rounded-br-xl">
                <img src={property.images?.[2] || property.images?.[0]} className="w-full h-full object-cover" alt="Sub" />
              </div>
            </div>
          </section>

          {/* Details & Amenities */}
          <section className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Description</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{property.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-50 mb-8">
              <DetailItem icon={<RiHotelBedLine />} label="Type" value={property.propertyType} />
              <DetailItem icon={<RiUserLine />} label="Guests" value={`${property.maxGuests} Max`} />
              <DetailItem icon={<RiMoneyDollarCircleLine />} label="Price" value={`₵${property.pricePerNight}`} />
              <DetailItem icon={<RiFocus3Line />} label="Status" value={property.status} />
            </div>

            {/* Amenities Section */}
            <h3 className="font-bold text-[#1a1a1a] mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
              {property.amenities?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <RiCheckboxCircleLine className="text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rules Card */}
          <section className="bg-white p-6 rounded-2xl border border-[#E5E7EB] shadow-sm">
            <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
              <RiErrorWarningLine className="text-orange-500" />
              House Rules
            </h3>
            <div className="space-y-4">
              <RuleRow label="Children Allowed" value={property.rules?.childrenAllowed} />
              <RuleRow label="Pets Allowed" value={property.rules?.petsAllowed} />
              <RuleRow label="Minimum Age" value={`${property.rules?.minimumAge}+ years`} />
            </div>
          </section>

          {/* Status Card */}
          <section className="bg-[#1a1a1a] text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4">Listing Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Featured</span>
                <span className={property.featured ? "text-blue-400 font-bold" : ""}>
                  {property.featured ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gray-400">Slug</span>
                <span className="text-xs truncate ml-4">{property.slug}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-400">ID</span>
                <span className="text-[10px] text-gray-500 uppercase">{property._id}</span>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

// Helper Components
const DetailItem = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center gap-2 text-gray-400 mb-1">
      {React.cloneElement(icon, { size: 16 })}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </div>
    <span className="text-sm font-bold text-[#1a1a1a] capitalize">{value}</span>
  </div>
);

const RuleRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-bold text-[#1a1a1a]">
      {typeof value === 'boolean' ? (value ? "Yes" : "No") : value}
    </span>
  </div>
);

export default AdminPropertyDetailsPage;