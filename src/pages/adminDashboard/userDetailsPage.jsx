import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast
import { 
  RiArrowLeftLine, RiUserLine, RiMailLine, RiPhoneLine, 
  RiCalendarLine, RiMapPinLine, RiShieldUserLine, 
  RiLockPasswordLine, RiStopCircleLine, RiExternalLinkLine,
  RiArrowDownSLine, RiLoader4Line, RiCheckboxCircleLine
} from "react-icons/ri";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("User");

  const token = localStorage.getItem("authToken");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // 1. FETCH USER DETAIL
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch`);
        const data = await response.json();
        const userData = data.user || data; 
        setUser(userData);
        setRole(userData.role || "User");
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUserDetail();
  }, [id, token, API_BASE]);

  // 2. UPDATE ROLE (PROMOTION)
  const handleRoleChange = async (newRole) => {
    const loadingToast = toast.loading(`Updating role to ${newRole}...`);
    try {
      setProcessing(true);
      const response = await fetch(`${API_BASE}/users/promote/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole.toLowerCase() }),
      });

      if (!response.ok) throw new Error("Failed to update role");
      
      setRole(newRole);
      setUser(prev => ({ ...prev, role: newRole.toLowerCase() }));
      toast.success(`User promoted to ${newRole} successfully!`, { id: loadingToast });
    } catch (err) {
      toast.error(err.message, { id: loadingToast });
    } finally {
      setProcessing(false);
    }
  };

  // 3. TOGGLE ACCOUNT STATUS (DEACTIVATE/REACTIVATE)
  const toggleAccountStatus = async () => {
    const isCurrentlyActive = user.status === "active";
    const endpoint = isCurrentlyActive ? "deactivate" : "reactivate";
    const loadingToast = toast.loading(`${isCurrentlyActive ? 'Deactivating' : 'Reactivating'} account...`);
    
    try {
      setProcessing(true);
      const response = await fetch(`${API_BASE}/users/${endpoint}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to ${endpoint} user`);

      const newStatus = isCurrentlyActive ? "inactive" : "active";
      setUser(prev => ({ ...prev, status: newStatus }));
      toast.success(`Account ${newStatus === 'active' ? 'reactivated' : 'deactivated'} successfully!`, { id: loadingToast });
    } catch (err) {
      toast.error(err.message, { id: loadingToast });
    } finally {
      setProcessing(false);
    }
  };

  // --- HELPER COMPONENTS ---
  const PaperCard = ({ children, title }) => (
    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
          <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );

  const InfoRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm font-medium text-[#6B7280]">{label}</span>
      <span className="text-sm font-bold text-[#1a1a1a] truncate ml-4">
        {typeof value === 'object' ? JSON.stringify(value) : (value || "—")}
      </span>
    </div>
  );

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <RiLoader4Line className="animate-spin text-[#1E5EFF]" size={40} />
      <p className="text-sm font-medium text-gray-500">Retrieving user profile...</p>
    </div>
  );

  if (error || !user) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-gray-500">{error || "User not found."}</p>
      <button onClick={() => navigate(-1)} className="text-[#1E5EFF] font-bold text-sm hover:underline">Return</button>
    </div>
  );

  const displayName = user.username || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown User";

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#1E5EFF] group">
        <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" />
        Back to Users List
      </button>

      {/* HEADER CARD */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-blue-50 text-[#1E5EFF] rounded-full flex items-center justify-center border border-blue-100">
            <RiUserLine size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">{displayName}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-[#6B7280] font-medium">
              <span className="flex items-center gap-1"><RiMailLine /> {user.email}</span>
              <span className="flex items-center gap-1"><RiPhoneLine /> {user.phone || "No phone"}</span>
              <span className="text-[#1E5EFF] font-bold">Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-44">
            <select 
              disabled={processing}
              value={role} 
              onChange={(e) => handleRoleChange(e.target.value)} 
              className="appearance-none w-full bg-gray-50 border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm font-bold text-[#1a1a1a] focus:outline-none cursor-pointer disabled:opacity-50"
            >
              <option value="user">User Role</option>
              <option value="admin">Admin Role</option>
            </select>
            <RiArrowDownSLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border ${user.status === "active" ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]" : "bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]"}`}>
            ● {user.status || "active"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <PaperCard title="User Information">
            <div className="space-y-4">
              <InfoRow label="First Name" value={user.firstName} />
              <InfoRow label="Last Name" value={user.lastName} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Phone" value={user.phone} />
              <InfoRow label="Role" value={user.role} />
              <InfoRow label="Database ID" value={user._id} />
            </div>
          </PaperCard>

          <PaperCard title="Admin Controls">
            <div className="space-y-3">
              <button 
                disabled={processing}
                onClick={toggleAccountStatus}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border text-sm font-bold transition-colors ${
                  user.status === "active" 
                    ? "border-[#FEE2E2] bg-[#FEF2F2] text-[#B91C1C] hover:bg-[#FEE2E2]" 
                    : "border-[#DCFCE7] bg-[#F0FDF4] text-[#15803D] hover:bg-[#DCFCE7]"
                }`}
              >
                {processing ? <RiLoader4Line className="animate-spin" /> : user.status === "active" ? <RiStopCircleLine size={18} /> : <RiCheckboxCircleLine size={18} />}
                {user.status === "active" ? "Suspend Account" : "Activate Account"}
              </button>
              
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] text-sm font-bold hover:bg-gray-50 transition-colors">
                <RiLockPasswordLine size={18} /> Force Password Reset
              </button>
            </div>
          </PaperCard>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-lg font-bold text-[#1a1a1a]">User Bookings</h2>
          <div className="space-y-4">
            {user.bookings && user.bookings.length > 0 ? (
              user.bookings.map((booking) => (
                <div key={booking._id} className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-bold text-sm text-[#1a1a1a]">{booking.hotelName || "Booking Reference"}</p>
                    <p className="text-xs text-[#6B7280]">Status: {booking.status} • ID: {booking._id?.slice(-6)}</p>
                  </div>
                  <Link to={`/admin/bookings/${booking._id}`} className="text-[#1E5EFF] text-xs font-bold hover:underline">View Details</Link>
                </div>
              ))
            ) : (
              <div className="bg-white border border-dashed border-[#E5E7EB] rounded-xl py-20 flex flex-col items-center justify-center text-gray-400">
                <RiCalendarLine size={40} className="mb-2 opacity-20" />
                <p>No booking history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;