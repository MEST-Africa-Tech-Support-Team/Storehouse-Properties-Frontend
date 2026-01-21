import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  RiArrowLeftSLine, 
  RiUploadCloud2Line, 
  RiUserFollowLine, 
  RiInformationLine 
} from "react-icons/ri";

const AdminAddPropertyPage = () => {
  const [isChildrenAllowed, setIsChildrenAllowed] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Back Button */}
      <Link 
        to="/admin/properties" 
        className="flex items-center text-sm font-bold text-[#1E5EFF] mb-6 hover:gap-2 transition-all w-fit"
      >
        <RiArrowLeftSLine size={20} />
        Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - MAIN FORM (2/3 Width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Property Information */}
          <section className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Property Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#374151]">Property Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Blue Lagoon Villa"
                  className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/20 focus:border-[#1E5EFF] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#374151]">Property Type</label>
                <select className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/20 focus:border-[#1E5EFF] bg-white">
                  <option>Apartment</option>
                  <option>Studio</option>
                  <option>House</option>
                  <option>Villa</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#374151]">Property Location</label>
                <input 
                  type="text" 
                  placeholder="Enter full address"
                  className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/20 focus:border-[#1E5EFF]"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Pricing & Policies */}
          <section className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Pricing</h2>
            <div className="mb-8">
              <label className="text-sm font-semibold text-[#374151] block mb-2">Price per night</label>
              <input 
                type="text" 
                placeholder="$0.00"
                className="w-full md:w-1/2 px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/20 focus:border-[#1E5EFF]"
              />
              <p className="text-xs text-[#6B7280] mt-2 italic">Displayed to customers during booking</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#F3F4F6] pt-8">
              {/* Children Policy */}
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-4 uppercase tracking-wider text-gray-500">Children Policy</h3>
                <div className="flex items-center justify-between bg-[#F9FAFB] p-4 rounded-xl border border-[#F3F4F6]">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <RiUserFollowLine className="text-[#1E5EFF]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1a1a1a]">Children Allowed</p>
                      <p className="text-[11px] text-[#6B7280]">This will affect booking eligibility</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsChildrenAllowed(!isChildrenAllowed)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${isChildrenAllowed ? 'bg-[#1E5EFF]' : 'bg-[#E5E7EB]'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isChildrenAllowed ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              </div>

              {/* Property Status */}
              <div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-4 uppercase tracking-wider text-gray-500">Property Status</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-[#6B7280]">Status</label>
                  <select className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/20 focus:border-[#1E5EFF] bg-white text-sm font-medium">
                    <option>Unlisted</option>
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Property Media */}
          <section className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1a1a] mb-6">Property Media</h2>
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-2xl p-10 flex flex-col items-center justify-center text-center group hover:border-[#1E5EFF] transition-colors cursor-pointer bg-[#F9FAFB]">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <RiUploadCloud2Line size={32} className="text-[#1E5EFF]" />
              </div>
              <h3 className="text-sm font-bold text-[#1a1a1a]">Upload Property Images</h3>
              <p className="text-xs text-[#6B7280] mt-1 mb-6">Drag and drop images here or click to browse</p>
              <button className="bg-[#1E5EFF] text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-md hover:bg-blue-700 transition-all">
                Choose File
              </button>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button className="flex-1 md:flex-none px-8 py-3 bg-[#F3F4F6] text-[#1a1a1a] rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
              Save as Draft
            </button>
            <button className="flex-1 md:flex-none px-8 py-3 bg-[#1E5EFF] text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Publish Property
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN - SIDEBAR (1/3 Width) */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm sticky top-28">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Featured Stays</h2>
              <span className="text-xs font-bold bg-blue-50 text-[#1E5EFF] px-2 py-1 rounded-md">4/8</span>
            </div>
            <p className="text-xs text-[#6B7280] mb-6">Display on landing page featured section</p>
            
            <div className="bg-[#F9FAFB] p-5 rounded-2xl border border-[#F3F4F6]">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <RiInformationLine className="text-[#1a1a1a]" size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1a1a]">Display on featured stays</p>
                    <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                      Property will appear on landing page featured grid. 
                      Limited to 8 active properties.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${isFeatured ? 'bg-[#1E5EFF]' : 'bg-[#E5E7EB]'}`}
                >
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