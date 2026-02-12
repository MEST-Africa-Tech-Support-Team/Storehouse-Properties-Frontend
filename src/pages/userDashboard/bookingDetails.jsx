import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import UserSidebar from '../../components/userDashboard/userSidebar';
import BookingDetailsHeader from '../../components/userDashboard/bookingDetailsHeader';
import BookingPropertyInfo from '../../components/userDashboard/bookingPropertyInfo';
import BookingStayDetails from '../../components/userDashboard/bookingStayDetails';
import BookingPropertyRules from '../../components/userDashboard/bookingPropertyRules';
import BookingSpecialRequests from '../../components/userDashboard/bookingSpecialRequests';
import BookingPaymentSummary from '../../components/userDashboard/bookingPaymentSummary';
import BookingActions from '../../components/userDashboard/bookingActions';

const BookingDetails = () => {
  const location = useLocation();
  const { id } = useParams();
  const propertyFromState = location.state?.property;

  // Use property data from location state if available, otherwise use default data
  const bookingData = {
    property: {
      name: propertyFromState?.title || "Skyline Modern Apartment",
      location: propertyFromState?.location || "Downtown Manhattan, New York, NY",
      bookingId: `BK-2024-${String(id).padStart(6, '0')}`,
      images: propertyFromState?.images || [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800"
      ]
    },
    stayDetails: {
      checkIn: {
        date: "March 15, 2024",
        time: "After 3:00 PM"
      },
      checkOut: {
        date: "March 20, 2024",
        time: "Before 11:00 AM"
      },
      guests: {
        count: 4,
        breakdown: "2 bedrooms"
      },
      arrivalTime: {
        time: "4:30 PM",
        date: "March 15, 2024"
      }
    },
    rules: {
      childrenAllowed: true,
      smokingAllowed: false,
      petsAllowed: true
    },
    specialRequests: "Please prepare a crib for our infant and ensure the apartment is on a higher floor with a good view. We would also appreciate early check-in if possible.",
    payment: {
      status: "Confirmed",
      propertyPrice: 1250.00,
      serviceFee: 87.50,
      taxes: 133.75,
      total: 1471.25,
      paidDate: "September 08, 2024",
      paymentMethod: "securely"
    }
  };

  const handleContactSupport = () => {
    // Handle contact support action
    console.log("Contact support clicked");
    // You can add modal, navigation, or API call here
  };

  const handleCancelBooking = () => {
    // Handle cancel booking action
    console.log("Cancel booking clicked");
    // You can add confirmation modal or navigation here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <UserSidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <BookingDetailsHeader 
              title="Booking Details"
              subtitle="Review the information for your reservation."
            />

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Property Info */}
                <BookingPropertyInfo property={bookingData.property} />

                {/* Stay Details */}
                <BookingStayDetails stayDetails={bookingData.stayDetails} />

                {/* Property Rules */}
                <BookingPropertyRules rules={bookingData.rules} />

                {/* Special Requests */}
                <BookingSpecialRequests requests={bookingData.specialRequests} />
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Payment Summary */}
                <BookingPaymentSummary payment={bookingData.payment} />

                {/* Actions */}
                <BookingActions 
                  onContactSupport={handleContactSupport}
                  onCancelBooking={handleCancelBooking}
                  cancellationWarning="Cancellation penalties apply. See full cancellation policy in booking terms & conditions."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
