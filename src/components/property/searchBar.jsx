import { IoLocationSharp, IoSearch } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const locationInputRef = useRef(null);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!window.google?.maps?.places) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      locationInputRef.current,
      {
        types: ["(cities)"],
        fields: ["formatted_address", "address_components"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        // Extract city name from address components
        let city = "";
        if (place.address_components) {
          const cityComponent = place.address_components.find(comp =>
            comp.types.includes("locality") ||
            comp.types.includes("administrative_area_level_2")
          );
          city = cityComponent ? cityComponent.long_name : "";
        }
        setLocation(city || place.formatted_address);
      }
    });

    return () => autocomplete.unbindAll();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }

    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      toast.error("Check-out must be after check-in");
      return;
    }

    // Format dates as YYYY-MM-DD for backend
    const formattedCheckIn = checkInDate.toISOString().split('T')[0];
    const formattedCheckOut = checkOutDate.toISOString().split('T')[0];

    setLoading(true);
    const toastId = toast.loading("Searching available properties...");

    try {
      // Build query params
      const params = new URLSearchParams({
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
      });

      // Optional: include city if provided
      if (location.trim()) {
        params.append('city', location.trim());
      }

      // Redirect to explore page with filters
      // Example: /explore?checkIn=2026-02-10&checkOut=2026-02-13&city=Lekki
      navigate(`/explore?${params.toString()}`);

      toast.success("Searching...", { id: toastId });
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // Helper: Convert MM/DD/YYYY ↔ YYYY-MM-DD
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const [m, d, y] = dateStr.split("/");
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  };

  const formatInputForDisplay = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(
      d.getDate()
    ).padStart(2, "0")}/${d.getFullYear()}`;
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-4 sm:p-5 shadow-xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:grid sm:grid-cols-5"
      >
        {/* Location */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Location
          </label>
          <div className="relative">
            <IoLocationSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              ref={locationInputRef}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you going?"
              className="w-full rounded-xl border border-gray-300 py-3 pl-9 pr-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Check-in
            </label>
            <input
              type="date"
              value={formatDateForInput(checkIn)}
              onChange={(e) => setCheckIn(formatInputForDisplay(e.target.value))}
              className="w-full rounded-xl border border-gray-300 py-3 px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Check-out
            </label>
            <input
              type="date"
              value={formatDateForInput(checkOut)}
              onChange={(e) => setCheckOut(formatInputForDisplay(e.target.value))}
              className="w-full rounded-xl border border-gray-300 py-3 px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="sm:col-span-1 flex items-end">
          <button
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 text-sm font-medium text-white shadow-md transition hover:bg-hover disabled:opacity-70"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                <IoSearch className="h-5 w-5" />
              )}
              Search
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}