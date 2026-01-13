import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const locationInputRef = useRef(null);

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      locationInputRef.current,
      {
        types: ['(cities)'], 
        fields: ['address_components', 'formatted_address'],
      }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setLocation(place.formatted_address);
      }
    });

    return () => {
      if (autocomplete) autocomplete.unbindAll();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location || !checkIn || !checkOut) {
      toast.error('Please fill in all fields');
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out must be after check-in');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Searching...');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log({ location, checkIn, checkOut });

      toast.success('Properties found!', { id: toastId });
    } catch (err) {
      toast.error('Search failed. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const [month, day, year] = dateStr.split('/');
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const formatInputForDisplay = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-white rounded-xl sm:p-4 shadow-lg max-w-4xl mx-auto w-full">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        <div className="sm:col-span-2">
          <label htmlFor="location" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <input
              ref={locationInputRef}
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you going..."
              className="w-full pl-8 pr-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 text-sm"
              inputMode="text"
              enterKeyHint="next"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.995 1.995 0 01-2.828 0l-4.244-4.244a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>

        <div>
          <label htmlFor="checkIn" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Check-in
          </label>
          <input
            id="checkIn"
            type="date"
            value={formatDateForInput(checkIn)}
            onChange={(e) => setCheckIn(formatInputForDisplay(e.target.value))}
            className="w-full py-2.5 sm:py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div>
          <label htmlFor="checkOut" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Check-out
          </label>
          <input
            id="checkOut"
            type="date"
            value={formatDateForInput(checkOut)}
            onChange={(e) => setCheckOut(formatInputForDisplay(e.target.value))}
            className="w-full py-2.5 sm:py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 sm:py-2 px-4 rounded-lg flex items-center justify-center gap-1.5 transition ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            <span className="text-sm">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}