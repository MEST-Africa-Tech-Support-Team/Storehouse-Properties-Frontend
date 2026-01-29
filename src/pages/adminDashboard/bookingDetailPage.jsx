import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  RiArrowLeftLine, RiMapPin2Line, RiExternalLinkLine, 
  RiVisaFill, RiCheckLine, RiMailLine, RiPhoneLine, 
  RiDownload2Line, RiFlagLine, RiRefreshLine, RiCustomerService2Line 
} from "react-icons/ri";

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulated Data based on your requirements
  const booking = {
    id: id || "BK-2334",
    status: "confirmed",
    totalAmount: "$3,434",
    paymentStatus: "paid",
    bookingDate: "Jan 12, 2025",
    created: "2 days ago",
    property: {
      name: "Sunset Villa",
      location: "Miami Beach, FL",
      price: "$3,434",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&h=200",
      childrenAllowed: "YES"
    },
    customer: {
      name: "Alex Johnson",
      email: "alex.j@example.com",
      phone: "+1 (555) 000-1234",
      status: "verified"
    },
    stay: {
      checkIn: "Jan 15, 2025",
      checkOut: "Jan 22, 2025",
      nights: 8,
      adults: 2,
      children: 1,
      requests: "Late check-in requested (around 10 PM). Celebrating anniversary - would appreciate any special touches if available."
    },
    payment: {
      method: "Visa ending in 4242",
      transactionId: "TRX-9928374",
      date: "Jan 12, 2025",
    }
  };

  const CardWrapper = ({ children, className = "" }) => (
    <div className={`bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );

  const Label = ({ text }) => <p className="text-[#6b7280] text-xs font-bold uppercase tracking-wider mb-1">{text}</p>;
  const Value = ({ text }) => <p className="text-[#1a1a1a] font-bold text-sm">{text}</p>;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* 1. TOP HEADER SUMMARY CARD */}
      <CardWrapper className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <Label text="Booking ID" />
          <Value text={`#${booking.id}`} />
        </div>
        <div>
          <Label text="Status" />
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#DCFCE7] text-[#15803D]">
            {booking.status}
          </span>
        </div>
        <div>
          <Label text="Total Amount" />
          <Value text={booking.totalAmount} />
        </div>
        <div>
          <Label text="Payment Status" />
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#DCFCE7] text-[#15803D]">
            {booking.paymentStatus}
          </span>
        </div>
        <div>
          <Label text="Booking Date" />
          <Value text={booking.bookingDate} />
        </div>
        <div>
          <Label text="Created" />
          <Value text={booking.created} />
        </div>
      </CardWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: PRIMARY DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Property Details */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Property Details</h3>
            <div className="flex flex-col sm:flex-row gap-5">
              <img src={booking.property.image} alt="Property" className="w-24 h-24 rounded-xl object-cover border border-[#E5E7EB]" />
              <div className="flex-1 space-y-1">
                <h4 className="text-lg font-bold text-[#1a1a1a]">{booking.property.name}</h4>
                <p className="text-[#6B7280] text-sm flex items-center gap-1">
                  <RiMapPin2Line /> {booking.property.location}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-[#1E5EFF] font-bold text-lg">{booking.property.price}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] uppercase">
                    Children Allowed: {booking.property.childrenAllowed}
                  </span>
                </div>
              </div>
            </div>
          </CardWrapper>

          {/* Customer Details */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Customer Details</h3>
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
                      <RiExternalLinkLine /> View User Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="space-y-4 sm:pl-10">
                <div>
                  <Label text="Account Status" />
                  <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#DBEAFE] text-[#1D4ED8]">
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
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Stay Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-6 border-b border-[#E5E7EB]">
              <div>
                <Label text="Check-In Date" />
                <Value text={booking.stay.checkIn} />
              </div>
              <div>
                <Label text="Check-Out Date" />
                <Value text={booking.stay.checkOut} />
              </div>
              <div>
                <Label text="Number of Nights" />
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
              <Label text="Special Requests" />
              <p className="text-sm text-[#4B5563] leading-relaxed bg-gray-50 p-4 rounded-lg italic">
                "{booking.stay.requests}"
              </p>
            </div>
          </CardWrapper>

          {/* Admin Notes */}
          <CardWrapper>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#1a1a1a]">Booking Notes (Admin Only)</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#22C55E] uppercase tracking-tighter">
                <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                Auto-save enabled
              </div>
            </div>
            <textarea 
              className="w-full h-32 p-4 text-sm bg-gray-50 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5EFF]/10 focus:border-[#1E5EFF] transition-all"
              placeholder="Add internal notes about this booking..."
            />
            <p className="text-[#6B7280] text-[11px] mt-3 font-medium">
              Last updated: Oct 24, 2025 • 02:45 PM
            </p>
          </CardWrapper>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-6">
          {/* Payment Details */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Payment Details</h3>
            <div className="space-y-5">
              <div>
                <Label text="Payment Method" />
                <div className="flex items-center gap-2 font-bold text-[#1a1a1a] text-sm">
                  <RiVisaFill size={24} className="text-[#1434CB]" /> {booking.payment.method}
                </div>
              </div>
              <div>
                <Label text="Transaction ID" />
                <Value text={booking.payment.transactionId} />
              </div>
              <div>
                <Label text="Amount Paid" />
                <Value text={booking.totalAmount} />
              </div>
              <div>
                <Label text="Payment Date" />
                <Value text={booking.payment.date} />
              </div>
              <div>
                <Label text="Status" />
                <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#DCFCE7] text-[#15803D]">
                  Completed
                </span>
              </div>
            </div>
          </CardWrapper>

          {/* Booking Timeline */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Booking Timeline</h3>
            <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E5E7EB]">
              <div className="relative pl-7">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#22C55E] border-4 border-white shadow-sm" />
                <p className="text-sm font-bold text-[#1a1a1a]">Payment Received</p>
                <p className="text-[11px] text-[#6B7280]">Jan 12, 2025 • 10:30 AM</p>
              </div>
              <div className="relative pl-7">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#3B82F6] border-4 border-white shadow-sm" />
                <p className="text-sm font-bold text-[#1a1a1a]">Booking Confirmed</p>
                <p className="text-[11px] text-[#6B7280]">Jan 12, 2025 • 10:35 AM</p>
              </div>
              <div className="relative pl-7">
                <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-[#9CA3AF] border-4 border-white shadow-sm" />
                <p className="text-sm font-bold text-[#1a1a1a]">Booking Created</p>
                <p className="text-[11px] text-[#6B7280]">Jan 12, 2025 • 10:28 AM</p>
              </div>
            </div>
          </CardWrapper>

          {/* Quick Actions */}
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <ActionButton icon={<RiCustomerService2Line />} label="Contact Customer" />
              <ActionButton icon={<RiRefreshLine />} label="Resend Confirmation" />
              <ActionButton icon={<RiDownload2Line />} label="Download Invoice" />
              <ActionButton icon={<RiFlagLine />} label="Flag Booking" color="text-red-600 hover:bg-red-50" />
            </div>
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, color = "text-[#1a1a1a] hover:bg-gray-50" }) => (
  <button className={`flex items-center gap-3 w-full p-3 rounded-lg border border-[#E5E7EB] text-sm font-bold transition-all ${color}`}>
    <span className="text-lg opacity-70">{icon}</span>
    {label}
  </button>
);

export default BookingDetailPage;