import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  RiMapPin2Line, RiExternalLinkLine, 
  RiMailLine, RiPhoneLine, 
  RiFlagLine, RiRefreshLine, RiCustomerService2Line,
  RiCloseCircleLine, RiCheckboxCircleLine, RiTimeLine, RiInformationLine
} from "react-icons/ri";

const AdminBookingReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulated Data for a Pending Booking
  const booking = {
    id: id || "BK-1029",
    status: "pending",
    bookingDate: "Jan 12, 2026",
    created: "4 hours ago",
    property: {
      name: "Ocean View Villa",
      location: "Miami Beach, FL",
      price: "$1,250",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&h=200",
      childrenAllowed: "YES"
    },
    customer: {
      name: "Sarah Connor",
      email: "s.connor@sky.net",
      phone: "+1 (555) 999-8888",
      status: "Verified User"
    },
    stay: {
      checkIn: "Jan 15, 2026",
      checkOut: "Jan 22, 2026",
      nights: 7,
      adults: 2,
      children: 1,
      requests: "Need a high chair for the toddler and early check-in if possible. Celebrating a birthday."
    }
  };

  const CardWrapper = ({ children, className = "" }) => (
    <div className={`bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );

  const Label = ({ text }) => <p className="text-[#6b7280] text-[10px] font-bold uppercase tracking-widest mb-1">{text}</p>;
  const Value = ({ text }) => <p className="text-[#1a1a1a] font-bold text-sm">{text}</p>;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      
      {/* 1. TOP HEADER SUMMARY CARD (Removed Payment/Total) */}
      <CardWrapper className="flex flex-wrap items-center justify-between gap-6 bg-[#F9FAFB]/50">
        <div>
          <Label text="Request ID" />
          <Value text={`#${booking.id}`} />
        </div>
        <div>
          <Label text="Current Status" />
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
            {booking.status}
          </span>
        </div>
        <div>
          <Label text="Submission Date" />
          <Value text={booking.bookingDate} />
        </div>
        <div>
          <Label text="Wait Time" />
          <div className="flex items-center gap-1 text-[#D97706] font-bold text-sm">
            <RiTimeLine /> {booking.created}
          </div>
        </div>
      </CardWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: PRIMARY DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Property Details */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Property Requested</h3>
            <div className="flex flex-col sm:flex-row gap-5">
              <img src={booking.property.image} alt="Property" className="w-24 h-24 rounded-xl object-cover border border-[#E5E7EB]" />
              <div className="flex-1 space-y-1">
                <h4 className="text-lg font-bold text-[#1a1a1a]">{booking.property.name}</h4>
                <p className="text-[#6B7280] text-sm flex items-center gap-1">
                  <RiMapPin2Line /> {booking.property.location}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-[#1E5EFF] font-bold text-lg">{booking.property.price}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F3F4F6] text-[#4B5563] uppercase">
                    Children Allowed: {booking.property.childrenAllowed}
                  </span>
                </div>
              </div>
            </div>
          </CardWrapper>

          {/* Customer Details */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Guest Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
              <div className="space-y-4">
                <div>
                  <Label text="Full Name" />
                  <Value text={booking.customer.name} />
                </div>
                <div>
                  <Label text="Email Address" />
                  <div className="flex items-center gap-2">
                    <Value text={booking.customer.email} />
                    <button className="text-[#1E5EFF] text-xs font-bold flex items-center gap-1 hover:underline">
                      <RiExternalLinkLine /> Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4 sm:pl-10">
                <div>
                  <Label text="Verification Status" />
                  <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#DCFCE7] text-[#15803D]">
                    {booking.customer.status}
                  </span>
                </div>
                <div>
                  <Label text="Phone Number" />
                  <Value text={booking.customer.phone} />
                </div>
              </div>
            </div>
          </CardWrapper>

          {/* Stay Details */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Stay Requirements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-6 border-b border-[#E5E7EB]">
              <div>
                <Label text="Check-In" />
                <Value text={booking.stay.checkIn} />
              </div>
              <div>
                <Label text="Check-Out" />
                <Value text={booking.stay.checkOut} />
              </div>
              <div>
                <Label text="Duration" />
                <Value text={`${booking.stay.nights} Nights`} />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-b border-[#E5E7EB]">
              <div>
                <Label text="Adults" />
                <Value text={booking.stay.adults} />
              </div>
              <div>
                <Label text="Children" />
                <Value text={booking.stay.children} />
              </div>
            </div>
            <div className="pt-6">
              <Label text="Guest's Note" />
              <p className="text-sm text-[#4B5563] leading-relaxed bg-[#F4F8FF] p-4 rounded-lg italic border border-blue-50">
                "{booking.stay.requests}"
              </p>
            </div>
          </CardWrapper>

          {/* ACTION BUTTONS: APPROVE OR DECLINE */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-[#EF4444] text-[#EF4444] font-bold text-sm hover:bg-[#EF4444] hover:text-white transition-all duration-300">
              <RiCloseCircleLine size={20} />
              Decline Request
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#22C55E] text-white font-bold text-sm hover:bg-[#16a34a] transition-all duration-300 shadow-lg shadow-green-100">
              <RiCheckboxCircleLine size={20} />
              Approve & Confirm
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-6">
          
          {/* Review Instructions (Replaced Payment) */}
          {/* <CardWrapper className="bg-[#1E5EFF] text-white border-none">
            <h3 className="text-base font-bold mb-3 flex items-center gap-2">
              <RiInformationLine /> Admin Note
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Please ensure the property is cleaned and ready for the requested dates before approving. Approving will automatically send a confirmation email and payment link to the guest.
            </p>
          </CardWrapper> */}

          {/* Booking Timeline */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">History</h3>
            <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E5E7EB]">
              <div className="relative pl-7">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#D97706] border-4 border-white shadow-sm" />
                <p className="text-sm font-bold text-[#1a1a1a]">Awaiting Review</p>
                <p className="text-[11px] text-[#6B7280]">Current Stage</p>
              </div>
              <div className="relative pl-7">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#9CA3AF] border-4 border-white shadow-sm" />
                <p className="text-sm font-bold text-[#1a1a1a]">Request Submitted</p>
                <p className="text-[11px] text-[#6B7280]">Jan 12, 2026 • 10:28 AM</p>
              </div>
            </div>
          </CardWrapper>

          {/* Quick Actions */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Review Tools</h3>
            <div className="flex flex-col gap-2">
              {/* <ActionButton icon={<RiCustomerService2Line />} label="Message Guest" /> */}
              <ActionButton icon={<RiRefreshLine />} label="Check Availability" />
              <ActionButton icon={<RiFlagLine />} label="Flag for Follow-up" />
            </div>
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, color = "text-[#1a1a1a] hover:bg-gray-50" }) => (
  <button className={`flex items-center gap-3 w-full p-3 rounded-lg border border-[#E5E7EB] text-[13px] font-bold transition-all ${color}`}>
    <span className="text-lg opacity-70">{icon}</span>
    {label}
  </button>
);

export default AdminBookingReviewPage;