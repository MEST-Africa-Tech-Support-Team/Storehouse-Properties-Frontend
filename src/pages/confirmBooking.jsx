import React from "react";
import { useNavigate } from "react-router";
import BookingSummary from "../components/property/bookingSummary.jsx";
import GuestInformation from "../components/property/guestInformation.jsx";

export default function CompleteBookingPage() {
  const navigate = useNavigate();

  const property = {
    name: "Sunset Beach Villa",
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1560448204-e62e0799b871?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  };

  const initialCheckIn = "2024-12-15"; 
  const initialCheckOut = "2024-12-18";
  const initialGuests = 2;
  const pricePerNight = 450;

  const handleFormSubmit = (data) => {
    console.log("Booking submitted:", data);
    alert("Booking details saved! Redirecting to payment...");
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m7 7l7-7m-7 7v-7m7 7v7" />
            </svg>
            Back to Employers Management
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">Complete your booking</h1>
        <p className="text-gray-500 mb-6">Provide the details required to reserve this property.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GuestInformation
              onSubmit={handleFormSubmit}
              property={property}
              checkIn={initialCheckIn}
              checkOut={initialCheckOut}
              guests={initialGuests}
              pricePerNight={pricePerNight}
            />
          </div>

          <div>
            <BookingSummary
              property={property}
              checkIn={initialCheckIn}
              checkOut={initialCheckOut}
              guests={initialGuests}
              pricePerNight={pricePerNight}
            />
          </div>
        </div>
      </div>
    </div>
  );
}