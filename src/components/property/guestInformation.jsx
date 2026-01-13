import React, { useState } from "react";
import { FiUpload, FiCalendar, FiClock } from "react-icons/fi";

export default function GuestInformation({ onSubmit, property, checkIn, checkOut, guests, pricePerNight }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    guests: guests || 1,
    checkIn: checkIn || "",
    checkOut: checkOut || "",
    arrivalTime: "",
    specialRequests: "",
    agreedToTerms: false,
    confirmedAccuracy: false,
  });

  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const getValidationErrors = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (!formData.confirmedAccuracy) newErrors.confirmedAccuracy = "You must confirm accuracy";
    if (!formData.agreedToTerms) newErrors.agreedToTerms = "You must agree to terms";
    return newErrors;
  };

  const isFormValid = () => {
    return Object.keys(getValidationErrors()).length === 0;
  };

  const handleFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert("Document uploaded successfully!");
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = getValidationErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); 
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Guest Information</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className={`w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country of Residence <span className="text-red-500">*</span>
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${errors.country ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        >
          <option value="">Select your country</option>
          <option value="GH">Ghana</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="UK">United Kingdom</option>
          <option value="AU">Australia</option>
        </select>
        {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Ghana Card/Passport
        </label>
        <div
          onClick={handleFileUpload}
          className={`w-full px-4 py-6 border border-dashed ${isUploading ? 'border-blue-300 bg-blue-50' : 'border-gray-300'} rounded-lg cursor-pointer hover:border-blue-400 transition-colors flex flex-col items-center justify-center`}
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          ) : (
            <>
              <FiUpload className="w-6 h-6 text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm">Upload Ghana/Passport</p>
            </>
          )}
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">Stay Details</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Guests <span className="text-red-500">*</span>
        </label>
        <select
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className={`w-full pl-3 pr-10 py-2 border ${errors.checkIn ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className={`w-full pl-3 pr-10 py-2 border ${errors.checkOut ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
          </div>
          {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expected Arrival Time <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="relative">
          <input
            type="time"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <FiClock className="absolute right-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">Special Requests</h3>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Information <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any special requests or information the property should know?"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        ></textarea>
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="confirmedAccuracy"
            name="confirmedAccuracy"
            checked={formData.confirmedAccuracy}
            onChange={handleChange}
            className="mt-1 mr-2"
          />
          <label htmlFor="confirmedAccuracy" className="text-sm text-gray-700">
            I confirm that the information provided is accurate and
          </label>
        </div>
        {errors.confirmedAccuracy && <p className="text-red-500 text-xs ml-6">{errors.confirmedAccuracy}</p>}

        <div className="flex items-start">
          <input
            type="checkbox"
            id="agreedToTerms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1 mr-2"
          />
          <label htmlFor="agreedToTerms" className="text-sm text-gray-700">
            I have read and agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
          </label>
        </div>
        {errors.agreedToTerms && <p className="text-red-500 text-xs ml-6">{errors.agreedToTerms}</p>}
      </div>

      <button
        type="submit"
        disabled={!isFormValid()}
        className={`w-full py-3 rounded-xl font-medium text-white transition ${
          isFormValid()
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-300 cursor-not-allowed"
        }`}
      >
        Continue to payment
      </button>
    </form>
  );
}