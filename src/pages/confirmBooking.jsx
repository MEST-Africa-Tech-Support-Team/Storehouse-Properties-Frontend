import React from "react";
import { Link } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import BookingSummary from "../components/property/bookingSummary.jsx";
import GuestInformation from "../components/property/guestInformation.jsx";

export default function CompleteBookingPage() {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/explore"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors group"
          >
            <IoMdArrowBack className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium group-hover:underline">Back to Properties</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">Complete your booking</h1>
        <p className="text-gray-500 mb-6">Provide the details required to reserve this property.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 px-4">
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

          <div className="static">
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