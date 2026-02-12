import React, { useState, useEffect } from "react";
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

    const rawLocation = b.property?.location || b.location;
    let locationString = '—';
    if (typeof rawLocation === 'object' && rawLocation !== null) {
      locationString = [rawLocation.address, rawLocation.city, rawLocation.region, rawLocation.country]
        .filter(Boolean).join(', ');
    } else if (typeof rawLocation === 'string') {
      locationString = rawLocation;
    }

    const rawAmount = b.totalAmount || b.total || b.amount || b.price || 0;
    const formattedAmount = typeof rawAmount === 'number' ? `₵${rawAmount.toLocaleString()}` : rawAmount;

    return {
      _id: idVal || b._id || b.id,
      id: idVal ? (String(idVal).startsWith('#') ? String(idVal) : `#${String(idVal).slice(-6)}`) : `#${String(b._id || id).slice(-6)}`,
      status: (b.status || b.bookingStatus || b.state) || 'pending',
      totalAmount: formattedAmount,
      paymentStatus: b.paymentStatus || b.payment || 'pending',
      bookingDate: fmt(b.createdAt || b.bookingDate || b.created),
      property: {
        name: b.property?.title || b.property?.name || '—',
        location: locationString,
        price: b.property?.price || (b.pricePerNight ? `₵${b.pricePerNight.toLocaleString()}` : '₵0.00'),
        image: b.property?.image || '',
        childrenAllowed: b.property?.childrenAllowed ? 'YES' : 'NO'
      },
      customer: {
        // FIX: Prioritize fullName and phone from the top-level response
        name: b.fullName || b.customer?.name || b.user?.email || '—',
        email: b.email || b.customer?.email || b.user?.email || '—',
        phone: b.phone || b.customer?.phone || '—',
        status: b.customer?.status || 'Active'
      },
      stay: {
        checkIn: fmt(b.checkIn || b.startDate),
        checkOut: fmt(b.checkOut || b.endDate),
        nights: b.nights || '—',
        adults: b.guests || b.adults || '—',
        children: b.children || '0',
        requests: b.requests || 'No special requests'
      },
      payment: {
        method: b.payment?.method || 'Visa',
        transactionId: b.payment?.transactionId || '—',
        date: fmt(b.payment?.date)
      }
    };
  };

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) {
        toast.error('Missing booking id');
        setLoadingBooking(false);
        return;
      }
      setLoadingBooking(true);
      try {
        const res = await bookingService.getBookingById(id);
        if (!mounted) return;
        const mapped = mapDetail(res);
        setBooking(mapped);
        setLocalStatus(mapped.status || 'pending');
      } catch (err) {
        toast.error(err?.message || 'Failed to load booking');
        navigate('/admin/bookings', { replace: true });
      } finally {
        if (mounted) setLoadingBooking(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [id, navigate]);

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
    <div className="max-w-[1200px] mx-auto space-y-6 pb-10">
      {/* 1. TOP HEADER SUMMARY */}
      <CardWrapper className="flex flex-wrap items-center justify-between gap-6">
        <div><Label text="Booking ID" /><Value text={booking.id} /></div>
        <div>
          <Label text="Status" />
          <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase ${localStatus === 'confirmed' || localStatus === 'active' ? 'bg-[#DCFCE7] text-[#15803D]' : localStatus === 'pending' ? 'bg-[#FEF3C7] text-[#D97706]' : 'bg-[#FEE2E2] text-[#B91C1C]'}`}>
            {String(localStatus).toUpperCase()}
          </span>
        </div>
        <div><Label text="Total Amount" /><Value text={booking.totalAmount} /></div>
        <div>
          <Label text="Payment Status" />
          <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-[#DCFCE7] text-[#15803D]">
            {booking.paymentStatus}
          </span>
        </div>
        <div><Label text="Booking Date" /><Value text={booking.bookingDate} /></div>
      </CardWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Property Details</h3>
            <div className="flex flex-col sm:flex-row gap-5">
              <img src={booking.property.image || 'https://via.placeholder.com/150'} alt="Property" className="w-24 h-24 rounded-xl object-cover border border-[#E5E7EB]" />
              <div className="flex-1 space-y-1">
                <h4 className="text-lg font-bold text-[#1a1a1a]">{booking.property.name}</h4>
                <p className="text-[#6B7280] text-sm flex items-center gap-1"><RiMapPin2Line /> {booking.property.location}</p>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-[#1E5EFF] font-bold text-lg">{booking.property.price}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 uppercase">Children: {booking.property.childrenAllowed}</span>
                </div>
              </div>
            </div>
          </CardWrapper>

          <CardWrapper>
  <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Customer Details</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
    <div className="space-y-4">
      {/* Uses booking.customer.name mapped from b.fullName */}
      <div><Label text="Full Name" /><Value text={booking.customer.name} /></div>
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
      <div><Label text="Account Status" /><span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-700">{booking.customer.status}</span></div>
      {/* Uses booking.customer.phone mapped from b.phone */}
      <div><Label text="Phone Number" /><Value text={booking.customer.phone} /></div>
    </div>
  </div>
</CardWrapper>

          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Stay Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pb-6 border-b border-[#E5E7EB]">
              <div><Label text="Check-In" /><Value text={booking.stay.checkIn} /></div>
              <div><Label text="Check-Out" /><Value text={booking.stay.checkOut} /></div>
              <div><Label text="Nights" /><Value text={`${booking.stay.nights} Nights`} /></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-b border-[#E5E7EB]">
              <div><Label text="Guest" /><Value text={booking.stay.adults} /></div>
              {/* <div><Label text="Guest" /><Value text={booking.stay.guests} /></div> */}
            </div>
            <div className="pt-6">
              <Label text="Special Requests" />
              <p className="text-sm text-[#4B5563] leading-relaxed bg-gray-50 p-4 rounded-lg italic">"{booking.stay.requests}"</p>
            </div>
          </CardWrapper>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={async () => {
                if (!window.confirm('Reject this booking?')) return;
                setIsRejecting(true);
                const bid = String(booking._id).replace('#', '');
                const t = toast.loading('Rejecting...');
                try {
                  const res = await bookingService.rejectBooking(bid);
                  toast.success(res?.message || 'Booking rejected');
                  setLocalStatus('rejected');
                } catch (err) {
                  toast.error(err?.message || 'Failed to reject');
                } finally {
                  toast.dismiss(t);
                  setIsRejecting(false);
                }
              }}
              disabled={isRejecting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-red-500 text-red-500 font-bold hover:bg-red-50 transition-all disabled:opacity-50"
            >
              <RiCloseCircleLine size={20} /> {isRejecting ? 'Rejecting...' : 'Cancel Booking'}
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1E5EFF] text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              <RiMoneyDollarCircleLine size={20} /> Process Refund
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Payment Info</h3>
            <div className="space-y-5">
              <div><Label text="Method" /><div className="flex items-center gap-2 font-bold text-sm"><RiVisaFill size={20} className="text-[#1434CB]" /> {booking.payment.method}</div></div>
              <div><Label text="Transaction ID" /><Value text={booking.payment.transactionId} /></div>
              <div><Label text="Date Paid" /><Value text={booking.payment.date} /></div>
            </div>
          </CardWrapper>

          <CardWrapper>
            <h3 className="text-base font-bold text-[#1a1a1a] mb-5">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <ActionButton icon={<RiCustomerService2Line />} label="Contact Customer" />
              <ActionButton icon={<RiRefreshLine />} label="Resend Confirmation" />
              <ActionButton icon={<RiDownload2Line />} label="Download Invoice" />
            </div>
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }) => (
  <button className="flex items-center gap-3 w-full p-3 rounded-lg border border-[#E5E7EB] text-sm font-bold hover:bg-gray-50 transition-all text-[#1a1a1a]">
    <span className="text-lg opacity-70">{icon}</span>
    {label}
  </button>
);

export default BookingDetailPage;