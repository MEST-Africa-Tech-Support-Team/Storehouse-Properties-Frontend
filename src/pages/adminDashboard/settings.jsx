import React, { useState } from "react";
import { 
  RiHomeGearLine, 
  RiGlobalLine, 
  RiSave3Line, 
  RiDraftLine,
  RiArrowDownSLine 
} from "react-icons/ri";

const AdminSettingsPage = () => {
  // State for form management (optional integration later)
  const [platformName, setPlatformName] = useState("Storehouse");

  const PaperCard = ({ children, title, icon: Icon }) => (
    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB] flex items-center gap-2">
        {Icon && <Icon className="text-[#1E5EFF]" size={18} />}
        <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">{title}</h3>
      </div>
      <div className="p-6 space-y-5 flex-1">{children}</div>
    </div>
  );

  const InputLabel = ({ label, htmlFor }) => (
    <label htmlFor={htmlFor} className="block text-sm font-bold text-[#1a1a1a] mb-1.5">
      {label}
    </label>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: Platform Identity */}
        <PaperCard title="Platform Identity" icon={RiHomeGearLine}>
          <div>
            <InputLabel label="Platform Name" htmlFor="platformName" />
            <input
              id="platformName"
              type="text"
              defaultValue="Storehouse"
              className="w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] outline-none transition-all"
              placeholder="Enter platform name"
            />
          </div>

          <div>
            <InputLabel label="Support Email Address" htmlFor="supportEmail" />
            <input
              id="supportEmail"
              type="email"
              defaultValue="support@storehouse.com"
              className="w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] outline-none transition-all"
              placeholder="e.g., support@example.com"
            />
          </div>

          <div>
            <InputLabel label="Support Phone Number" htmlFor="supportPhone" />
            <input
              id="supportPhone"
              type="tel"
              defaultValue="+233 24 000 0000"
              className="w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] outline-none transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </PaperCard>

        {/* RIGHT COLUMN: Regional Settings */}
        <PaperCard title="Regional Settings" icon={RiGlobalLine}>
          <div className="relative">
            <InputLabel label="Default Currency" htmlFor="currency" />
            <div className="relative">
              <select
                id="currency"
                className="appearance-none w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] outline-none cursor-pointer"
              >
                <option value="usd">USD - US Dollar</option>
                <option value="ghs">GHS - Ghanaian Cedis</option>
                <option value="ngn">NGN - Nigerian Naira</option>
                <option value="eur">EUR - Euro</option>
                <option value="gbp">GBP - British Pound</option>
              </select>
              <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <InputLabel label="Timezone" htmlFor="timezone" />
            <div className="relative">
              <select
                id="timezone"
                className="appearance-none w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] outline-none cursor-pointer"
              >
                <option value="utc">UTC (Coordinated Universal Time)</option>
                <option value="gmt">GMT (Greenwich Mean Time)</option>
                <option value="est">EST (Eastern Standard Time)</option>
                <option value="wat">WAT (West Africa Time)</option>
              </select>
              <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <InputLabel label="Default Language" htmlFor="language" />
            <div className="relative">
              <select
                id="language"
                className="appearance-none w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] outline-none cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="de">German</option>
              </select>
              <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </PaperCard>
      </div>

      {/* ACTION FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4">
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#F3F4F6] text-[#6B7280] rounded-lg font-bold text-sm hover:bg-gray-200 transition-all">
          <RiDraftLine size={18} />
          Save as Draft
        </button>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2.5 bg-[#1E5EFF] text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <RiSave3Line size={18} />
          Publish Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettingsPage;