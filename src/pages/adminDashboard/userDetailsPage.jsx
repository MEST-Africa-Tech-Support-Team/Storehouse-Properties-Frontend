import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  RiArrowLeftLine, RiUserLine, RiMailLine, RiPhoneLine, 
  RiCalendarLine, RiMapPinLine, RiShieldUserLine, 
  RiLockPasswordLine, RiStopCircleLine, RiExternalLinkLine,
  RiArrowDownSLine 
} from "react-icons/ri";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("User");

  // Simulated User Data
  const user = {
    id: id || "USR-9921",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "+1 (555) 000-1234",
    joinedDate: "Jan 23, 2033",
    location: "New York, USA",
    language: "English (US)",
    status: "active",
  };

  const PaperCard = ({ children, title, className = "" }) => (
    <div className={`bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. TOP BACK BUTTON */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#1E5EFF] transition-colors group"
      >
        <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
        Back to Users List
      </button>

      {/* 2. MAIN HORIZONTAL HEADER CARD */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-blue-50 text-[#1E5EFF] rounded-full flex items-center justify-center border border-blue-100">
            <RiUserLine size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[#6B7280] font-medium">
              <span className="flex items-center gap-1"><RiMailLine /> {user.email}</span>
              <span className="flex items-center gap-1"><RiPhoneLine /> {user.phone}</span>
              <span className="text-[#1E5EFF] font-bold underline">Joined: {user.joinedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-40">
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="appearance-none w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm font-bold text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer"
            >
              <option value="User">User Role</option>
              <option value="Admin">Admin Role</option>
            </select>
            <RiArrowDownSLine className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
            ● {user.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (4 units) */}
        <div className="lg:col-span-4 space-y-6">
          {/* User Information */}
          <PaperCard title="User Information">
            <div className="space-y-4">
              <InfoRow label="Full Name" value={user.name} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Phone" value={user.phone} />
              <InfoRow label="Location" value={user.location} />
              <InfoRow label="Language" value={user.language} />
              <InfoRow label="Account Type" value={role} />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium text-[#6B7280]">Status</span>
                <span className="bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded text-[10px] font-bold uppercase">{user.status}</span>
              </div>
            </div>
          </PaperCard>

          {/* Admin Controls */}
          <PaperCard title="Admin Controls">
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-[#FEE2E2] bg-[#FEF2F2] text-[#B91C1C] text-sm font-bold hover:bg-[#FEE2E2] transition-colors">
                <RiStopCircleLine size={18} />
                Suspend Account
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] text-sm font-bold hover:bg-gray-50 transition-colors">
                <RiLockPasswordLine size={18} />
                Force Password Reset
              </button>
            </div>
          </PaperCard>
        </div>

        {/* RIGHT COLUMN (8 units) - Booking History */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
            <h2 className="text-lg font-bold text-[#1a1a1a]">Booking History</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <select className="flex-1 sm:flex-none bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs font-bold text-[#6B7280]">
                <option>All Status</option>
                <option>Confirmed</option>
                <option>Pending</option>
              </select>
              <select className="flex-1 sm:flex-none bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-xs font-bold text-[#6B7280]">
                <option>Sort by: Newest</option>
                <option>Sort by: Price</option>
              </select>
            </div>
          </div>

          {/* Booking Cards */}
          <div className="space-y-4">
            <BookingCard 
              image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80"
              name="Grand Ocean Resort"
              location="Malibu, California"
              id="BK-88219"
              dates="Mar 15 - Mar 20, 2023"
              guests="2 Guests"
              childrenBadge={true}
            />
            <BookingCard 
              image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=80"
              name="Mountain View Cabin"
              location="Aspen, Colorado"
              id="BK-88225"
              dates="Dec 10 - Dec 15, 2023"
              guests="4 Guests"
              childrenBadge={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
    <span className="text-sm font-medium text-[#6B7280]">{label}</span>
    <span className="text-sm font-bold text-[#1a1a1a]">{value}</span>
  </div>
);

const BookingCard = ({ image, name, location, id, dates, guests, childrenBadge }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex flex-col md:flex-row gap-4 hover:shadow-md transition-shadow">
    <img src={image} alt={name} className="w-full md:w-32 h-24 object-cover rounded-lg border border-[#E5E7EB]" />
    
    <div className="flex-1 space-y-1">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-[#1a1a1a]">{name}</h4>
        <span className="text-[10px] font-bold text-[#6B7280] uppercase bg-gray-100 px-2 py-0.5 rounded">ID: {id}</span>
      </div>
      <p className="text-xs text-[#6B7280] flex items-center gap-1"><RiMapPinLine size={14}/> {location}</p>
      <p className="text-xs font-bold text-[#4B5563] mt-2 italic">{dates}</p>
      
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <span className="text-[11px] font-bold text-[#1a1a1a] flex items-center gap-1">
          <RiUserLine size={14}/> {guests}
        </span>
        {childrenBadge && (
          <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold px-2 py-0.5 rounded uppercase">Children: Yes</span>
        )}
      </div>
    </div>

    <div className="flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l border-[#E5E7EB] pt-3 md:pt-0 md:pl-4">
      <button className="flex items-center justify-center gap-1 text-sm font-bold text-[#1E5EFF] hover:underline whitespace-nowrap">
        View Details <RiExternalLinkLine />
      </button>
      <button className="text-sm font-bold text-gray-300 cursor-not-allowed whitespace-nowrap">
        Cancel Booking
      </button>
    </div>
  </div>
);

export default UserDetailPage;