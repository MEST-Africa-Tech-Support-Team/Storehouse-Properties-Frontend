import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookingService } from "../../services/bookingService";
import { toast } from "react-hot-toast";
import { 
  RiMapPin2Line, RiExternalLinkLine, 
  RiVisaFill, RiMailLine, RiPhoneLine, 
  RiDownload2Line, RiFlagLine, RiRefreshLine, RiCustomerService2Line,
  RiCloseCircleLine, RiMoneyDollarCircleLine
} from "react-icons/ri";

const BookingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // booking loaded from API (admin single-booking endpoint)
  const [booking, setBooking] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(true);
  const [localStatus, setLocalStatus] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);

  const mapDetail = (b = {}) => {
    const idVal = b.bookingId || b.id || b._id || b._doc?._id || b._doc?.id || null;
    const fmt = (d) => {
      if (!d) return '—';
      try { return new Date(d).toLocaleDateString(); } catch { return String(d); }
    };

    return {
      _id: idVal || b._id || b.id,
      id: idVal ? (String(idVal).startsWith('#') ? String(idVal) : `#${String(idVal).slice(-6)}`) : `#${String(b._id || id).slice(-6)}`,
      status: (b.status || b.bookingStatus || b.state) || 'pending',
      totalAmount: b.total || b.amount || b.price || '₵0.00',
      paymentStatus: b.paymentStatus || b.payment || 'pending',
      bookingDate: fmt(b.createdAt || b.bookingDate || b.created),
      created: b.createdAgo || b.created || fmt(b.createdAt),
      property: {
        name: b.property?.title || b.property?.name || b.propertyTitle || '—',
        location: b.property?.location || b.location || '—',
        price: b.property?.price || b.price || '₵0.00',
        image: b.property?.image || b.property?.coverPhoto || b.propertyImage || '' ,
        childrenAllowed: (b.property?.childrenAllowed || b.childrenAllowed) ? 'YES' : 'NO'
      },
      customer: {
        name: b.customer?.name || `${b.customer?.firstName || ''} ${b.customer?.lastName || ''}`.trim() || b.user?.email || '—',
        email: b.customer?.email || b.user?.email || '—',
        phone: b.customer?.phone || b.user?.phone || '—',
        status: b.customer?.status || b.user?.status || '—'
      },
      stay: {
        checkIn: fmt(b.startDate || b.checkIn || b.from),
        checkOut: fmt(b.endDate || b.checkOut || b.to),
        nights: b.nights || b.duration || '—',
        adults: b.adults || b.guests || '—',
        children: b.children || b.childrenCount || '—',
        requests: b.requests || b.specialRequests || ''
      },
      payment: {
        method: b.payment?.method || b.paymentMethod || '—',
        transactionId: b.payment?.transactionId || b.transactionId || '—',
        date: fmt(b.payment?.date || b.paymentDate || b.paidAt)
      }
    };
  };

  // fetch booking on mount
  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) {
        toast.error('Missing booking id');
        setLoadingBooking(false);
        return;
      }
      setLoadingBooking(true);
      const t = toast.loading('Loading booking...');
      try {
        const res = await bookingService.getBookingById(id);
        if (!mounted) return;
        const mapped = mapDetail(res);
        setBooking(mapped);
        setLocalStatus(mapped.status || 'pending');
        toast.dismiss(t);
      } catch (err) {
        toast.dismiss(t);
        toast.error(err?.message || 'Failed to load booking');
        // navigate back to list if booking not found
        navigate('/admin/bookings', { replace: true });
      } finally {
        if (mounted) setLoadingBooking(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [id]);

  const CardWrapper = ({ children, className = "" }) => (
    <div className={`bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );

  const Label = ({ text }) => <p className="text-[#6b7280] text-xs font-bold uppercase tracking-wider mb-1">{text}</p>;
  const Value = ({ text }) => <p className="text-[#1a1a1a] font-bold text-sm">{text}</p>;

  if (loadingBooking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!booking) return null;

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
          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase ${localStatus === 'confirmed' ? 'bg-[#DCFCE7] text-[#15803D]' : localStatus === 'pending' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#FEE2E2] text-[#B91C1C]'}`}>
            {String(localStatus).toUpperCase()}
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

          {/* REPLACED SECTION: ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={async () => {
                if (!window.confirm('Reject this booking? This will notify the customer and update the booking status.')) return;
                setIsRejecting(true);
                const bid = String(booking.id || booking._id || id).replace('#', '');
                const t = toast.loading('Rejecting booking...');
                try {
                  const res = await bookingService.rejectBooking(bid);
                  toast.dismiss(t);
                  toast.success(res?.message || 'Booking rejected');
                  setLocalStatus(res?.status || 'rejected');
                } catch (err) {
                  toast.dismiss(t);
                  toast.error(err?.message || 'Failed to reject booking');
                } finally {
                  setIsRejecting(false);
                }
              }}
              disabled={isRejecting}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-[#EF4444] text-[#EF4444] font-bold text-sm transition-all ${isRejecting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#EF4444]/5'}`}
            >
              <RiCloseCircleLine size={20} />
              {isRejecting ? 'Rejecting…' : 'Cancel Booking'}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1E5EFF] text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              <RiMoneyDollarCircleLine size={20} />
              Process Refund
            </button>
          </div>
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
                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase ${localStatus === 'confirmed' ? 'bg-[#DCFCE7] text-[#15803D]' : localStatus === 'pending' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#FEE2E2] text-[#B91C1C]'}`}>
                  {String(localStatus).toUpperCase()}
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
              {/* <ActionButton icon={<RiFlagLine />} label="Flag Booking" color="text-red-600 hover:bg-red-50" /> */}
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