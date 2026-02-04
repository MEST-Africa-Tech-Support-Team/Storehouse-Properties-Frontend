import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Country } from "country-state-city";
import {
  FiUpload,
  FiX,
  FiCalendar,
  FiClock,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { bookingService } from '../../services/bookingService';
import { toast } from 'react-hot-toast';

export default function GuestInformation({
  onSubmit,
  property,
  checkIn,
  checkOut,
  guests,
  pricePerNight,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "+233",
    country: "GH",
    guests: guests || 1,
    checkIn: checkIn || "",
    checkOut: checkOut || "",
    arrivalTime: "",
    specialRequests: "",
    agreedToTerms: false,
    confirmedAccuracy: false,
  });

  const [errors, setErrors] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

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

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value || "+233" });
    if (errors.phone) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  const handleCountryChange = (value) => {
    setFormData({ ...formData, country: value });
    if (errors.country) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.country;
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
    if (!formData.phone || formData.phone === "+233")
      newErrors.phone = "Phone number is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (!formData.confirmedAccuracy)
      newErrors.confirmedAccuracy = "You must confirm accuracy";
    if (!formData.agreedToTerms)
      newErrors.agreedToTerms = "You must agree to terms";
    if (uploadedFiles.length === 0)
      newErrors.upload = "Please upload at least one ID document";
    return newErrors;
  };

  const isFormValid = () => {
    return Object.keys(getValidationErrors()).length === 0;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (uploadedFiles.length + files.length > 2) {
      alert("You can upload a maximum of 2 files.");
      return;
    }
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (indexToRemove) => {
    setUploadedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = getValidationErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // keep existing parent callback for downstream flows (payment screen etc.)
    const payload = { ...formData, idDocuments: uploadedFiles.map((f) => f.file) };

    // attempt to call booking endpoint (POST /bookings/:propertyId) but don't change UI flow — parent still receives callback
    const propertyId = property?.id || property?._id || property?.propertyId;
    if (!propertyId) {
      toast.error('Missing property identifier — cannot create booking');
      onSubmit(payload);
      return;
    }

    setIsSubmitting(true);
    const t = toast.loading('Creating booking...');
    try {
      const res = await bookingService.createBooking(propertyId, payload);
      toast.dismiss(t);
      toast.success(res?.message || 'Booking created');
      onSubmit(res);
    } catch (err) {
      toast.dismiss(t);
      toast.error(err?.message || 'Failed to create booking');
      // still call parent so UI can handle offline / alternate flows
      onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Guest Information
      </h3>

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
          className={`w-full px-3 py-2.5 border ${
            errors.fullName ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.fullName && (
          <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
        )}
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
          className={`w-full px-3 py-2.5 border ${
            errors.email ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          international
          defaultCountry="GH"
          value={formData.phone}
          onChange={handlePhoneChange}
          placeholder="Enter phone number"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 [&>input]:p-0 [&>input]:text-gray-700 [&>input]:placeholder:text-gray-400"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country of Residence <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.country}
          onChange={(e) => handleCountryChange(e.target.value)}
          className={`w-full px-3 py-2.5 border ${
            errors.country ? "border-red-300" : "border-gray-300"
          } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
        >
          <option value="">Select your country</option>
          {Country.getAllCountries().map((c) => (
            <option key={c.isoCode} value={c.isoCode}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-red-500 text-xs mt-1">{errors.country}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload ID Document (Ghana Card / Passport){" "}
          <span className="text-gray-500">(Max 2 files)</span>
        </label>

        {uploadedFiles.length > 0 && (
          <div className="mb-3 flex gap-3 flex-wrap">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="relative w-45 h-45 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
              >
                <img
                  src={file.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-1.5 -right-1.5 bg-white text-red-500 rounded-full p-1 shadow-md hover:bg-red-50 transition-colors"
                  aria-label="Remove image"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={triggerFileInput}
          disabled={uploadedFiles.length >= 2}
          className={`w-full py-3 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
            uploadedFiles.length >= 2
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          <FiUpload className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-sm text-gray-600">
            {uploadedFiles.length === 0
              ? "Click to upload"
              : uploadedFiles.length === 1
              ? "Add another (1/2)"
              : "Maximum reached (2/2)"}
          </span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          className="hidden"
        />
        {errors.upload && (
          <p className="text-red-500 text-xs mt-1">{errors.upload}</p>
        )}
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">Stay Details</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Guests <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center justify-between w-full max-w-[180px] h-10 px-2 bg-white border border-gray-300 rounded-lg">
          <button
            type="button"
            onClick={() => {
              if (formData.guests > 1) {
                setFormData({ ...formData, guests: formData.guests - 1 });
                if (errors.guests) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.guests;
                    return newErrors;
                  });
                }
              }
            }}
            disabled={formData.guests <= 1}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease guests"
          >
            <FiMinus className="w-3.5 h-3.5" />
          </button>

          <span className="text-base font-medium text-gray-800 min-w-[20px] text-center">
            {formData.guests}
          </span>

          <button
            type="button"
            onClick={() => {
              if (formData.guests < 10) {
                setFormData({ ...formData, guests: formData.guests + 1 });
                if (errors.guests) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.guests;
                    return newErrors;
                  });
                }
              }
            }}
            disabled={formData.guests >= 10}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase guests"
          >
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        </div>
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
              className={`w-full pl-3 pr-9 py-2.5 border ${
                errors.checkIn ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>
          {errors.checkIn && (
            <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>
          )}
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
              className={`w-full pl-3 pr-9 py-2.5 border ${
                errors.checkOut ? "border-red-300" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>
          {errors.checkOut && (
            <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expected Arrival Time{" "}
          <span className="text-gray-400">(Optional)</span>
        </label>
        <div className="relative">
          <input
            type="time"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full pl-3 pr-9 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-4">Special Requests</h3>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Information{" "}
          <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any special requests or information the property should know?"
          rows={4}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
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
            I confirm that the information provided is accurate and complete.
          </label>
        </div>
        {errors.confirmedAccuracy && (
          <p className="text-red-500 text-xs ml-6">
            {errors.confirmedAccuracy}
          </p>
        )}

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
            I have read and agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              terms and conditions
            </a>
          </label>
        </div>
        {errors.agreedToTerms && (
          <p className="text-red-500 text-xs ml-6">{errors.agreedToTerms}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid() || isSubmitting}
        aria-busy={isSubmitting}
        className={`w-full py-3 rounded-xl font-medium text-white transition ${
          isFormValid() && !isSubmitting
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-300 cursor-not-allowed"
        }`}
      >
        Continue to payment
      </button> 
    </form>
  );
}