import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Added useParams
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { propertyService } from '../../services/propertyService';
import { 
  RiArrowLeftSLine, 
  RiUploadCloud2Line, 
  RiUserFollowLine, 
  RiInformationLine 
} from "react-icons/ri";

const AdminAddPropertyPage = () => {
  const { id } = useParams(); // Get ID from URL
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [isChildrenAllowed, setIsChildrenAllowed] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('draft');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // Keep track of current images

  const [isLoading, setIsLoading] = useState(isEditMode); // Loading state for fetching
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // 1. Load data if in Edit Mode
  useEffect(() => {
    if (currentUser && currentUser.role !== 'admin') {
      toast.error('Admin access required', { duration: 3000 });
      navigate('/dashboard', { replace: true });
      return;
    }

    if (isEditMode) {
      const fetchProperty = async () => {
        try {
          const res = await propertyService.getPropertyById(id);
          const data = res.property || res; // Handle different API response shapes
          
          setTitle(data.title || '');
          setPropertyType(data.propertyType || 'Apartment');
          // Handle nested location object from your JSON
          setLocation(typeof data.location === 'object' ? data.location.address : data.location || '');
          setPrice(data.pricePerNight || '');
          setStatus(data.status?.toLowerCase() || 'draft');
          setIsChildrenAllowed(data.rules?.childrenAllowed || data.childrenAllowed || false);
          setIsFeatured(data.featured || false);
          setExistingImages(data.images || []);
        } catch (err) {
          toast.error("Failed to load property details");
          navigate('/admin/properties');
        } finally {
          setIsLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id, isEditMode, currentUser, navigate]);

  const validate = () => {
    if (!title.trim()) {
      toast.error('Property name is required');
      return false;
    }
    if (!location.trim()) {
      toast.error('Property location is required');
      return false;
    }
    return true;
  };

  const handleImageSelect = (files) => {
    const arr = Array.from(files || []);
    setImages(prev => [...prev, ...arr]);
  };

  // Build payload using your specific backend field names (pricePerNight)
  const buildPayload = () => {
    const payload = new FormData();
    payload.append('title', title.trim());
    payload.append('propertyType', propertyType);
    payload.append('location', location.trim());
    payload.append('pricePerNight', price);
    payload.append('childrenAllowed', isChildrenAllowed);
    payload.append('featured', isFeatured);
    payload.append('status', status);

    images.forEach((file) => {
        payload.append('images', file);
    });

    return payload;
  };

  // 2. Updated Save logic to handle both CREATE and UPDATE (PATCH)
  const handleSaveDraft = async () => {
    if (!validate()) return;
    setIsSaving(true);
    const t = toast.loading(isEditMode ? 'Updating property...' : 'Saving draft...');
    
    try {
      const payload = buildPayload();
      
      if (isEditMode) {
        // Use the PATCH endpoint for existing properties
        await propertyService.updateProperty(id, payload);
        toast.success('Property updated successfully');
      } else {
        await propertyService.createProperty(payload, { asDraft: true });
        toast.success('Property saved as draft');
      }
      
      navigate('/admin/properties', { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Action failed');
    } finally {
      setIsSaving(false);
      toast.dismiss(t);
    }
  };

  const handlePublish = async () => {
    if (!validate()) return;
    setIsPublishing(true);
    try {
      const payload = buildPayload();
      // Set status to active for publishing
      payload.set('status', 'active'); 

      if (isEditMode) {
        await propertyService.updateProperty(id, payload);
      } else {
        const createRes = await propertyService.createProperty(payload, { asDraft: false });
        // Optional: If your backend needs a second "publish" call:
        // const newId = createRes?.property?._id || createRes?.id;
        // await propertyService.publishProperty(newId);
      }

      toast.success('Property published');
      navigate('/admin/properties', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Failed to publish');
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) return <div className="p-20 text-center font-bold text-gray-400">Loading Property Data...</div>;

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Link to="/admin/properties" className="flex items-center text-sm font-bold text-[#1E5EFF] mb-6 hover:gap-2 transition-all w-fit">
        <RiArrowLeftSLine size={20} /> Back to Properties
      </Link>

      <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">
            {isEditMode ? `Edit Property: ${title}` : 'Add New Property'}
          </h1>
          {isEditMode && <p className="text-xs text-gray-400">ID: {id}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Property Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#374151]">Property Name</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] outline-none focus:border-[#1E5EFF]" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#374151]">Property Type</label>
                <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white">
                  <option>Apartment</option>
                  <option>Studio</option>
                  <option>House</option>
                  <option>Villa</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#374151]">Property Location</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] outline-none focus:border-[#1E5EFF]" />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Pricing</h2>
            <div className="mb-8">
              <label className="text-sm font-semibold text-[#374151] block mb-2">Price per night</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full md:w-1/2 px-4 py-2.5 rounded-lg border border-[#E5E7EB]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#F3F4F6] pt-8">
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-4 uppercase tracking-wider text-gray-500">Children Policy</h3>
                <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-xl border border-[#F3F4F6]">
                  <div className="flex items-center gap-3">
                    <RiUserFollowLine className="text-[#1E5EFF]" />
                    <div>
                      <p className="text-sm font-bold text-[#1a1a1a]">Children Allowed</p>
                    </div>
                  </div>
                  <button onClick={() => setIsChildrenAllowed(!isChildrenAllowed)} className={`w-11 h-6 rounded-full relative transition-colors ${isChildrenAllowed ? 'bg-[#1E5EFF]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isChildrenAllowed ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-4 uppercase tracking-wider text-gray-500">Property Status</h3>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-sm">
                  <option value="unlisted">Unlisted</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Property Media</h2>
            {isEditMode && existingImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {existingImages.map((img, i) => (
                        <img key={i} src={img} className="h-20 w-full object-cover rounded-lg border" alt="Existing" />
                    ))}
                </div>
            )}
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-[#F9FAFB]">
              <RiUploadCloud2Line size={32} className="text-[#1E5EFF] mb-2" />
              <h3 className="text-sm font-bold">Upload New Images</h3>
              <input id="file-input" type="file" accept="image/*" multiple onChange={e => handleImageSelect(e.target.files)} className="hidden" />
              <button type="button" onClick={() => document.getElementById('file-input')?.click()} className="mt-4 bg-[#1E5EFF] text-white px-6 py-2 rounded-lg font-semibold text-sm">
                Choose Files
              </button>
              {images.length > 0 && <p className="text-xs mt-2 text-blue-600">{images.length} new files selected</p>}
            </div>
          </section>

          <div className="flex items-center gap-4 pt-4">
            <button onClick={handleSaveDraft} disabled={isSaving} className="flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm bg-[#F3F4F6] text-[#1a1a1a]">
              {isSaving ? 'Saving...' : (isEditMode ? 'Update Property' : 'Save as Draft')}
            </button>
            
            {!isEditMode && (
                <button onClick={handlePublish} disabled={isPublishing} className="flex-1 md:flex-none px-8 py-3 rounded-xl font-bold text-sm bg-[#1E5EFF] text-white shadow-lg shadow-blue-200">
                    {isPublishing ? 'Publishing...' : 'Publish Property'}
                </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm sticky top-28">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-2">Featured Stays</h2>
            <div className="bg-[#F9FAFB] p-5 rounded-2xl border border-[#F3F4F6] mt-4">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <RiInformationLine className="text-[#1a1a1a]" size={18} />
                  <p className="text-sm font-bold">Display on featured stays</p>
                </div>
                <button onClick={() => setIsFeatured(!isFeatured)} className={`w-11 h-6 rounded-full relative transition-colors ${isFeatured ? 'bg-[#1E5EFF]' : 'bg-[#E5E7EB]'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isFeatured ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminAddPropertyPage;