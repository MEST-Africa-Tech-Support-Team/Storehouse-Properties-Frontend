import { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

// ✅ Lazy load Leaflet to reduce bundle size
const LocationSection = ({ location = {} }) => {
  const { address, city, region, country, coordinates } = location;
  const [mapReady, setMapReady] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Combine location parts into a single readable string
  const fullLocation = [address, city, region, country]
    .filter(Boolean)
    .join(', ');

  // ✅ Fallback coordinates if none provided (center of Ghana since your example is from Ghana)
  const defaultCenter = coordinates 
    ? [coordinates.lat, coordinates.lng] 
    : [7.9465, -1.0232]; // Ghana coordinates

  useEffect(() => {
    // ✅ Dynamically load Leaflet only when needed
    let isMounted = true;

    const loadMap = async () => {
      try {
        // ✅ Load Leaflet CSS dynamically
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        // ✅ Load Leaflet JS dynamically
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => {
          if (isMounted) {
            setMapReady(true);
            setLoading(false);
          }
        };
        script.onerror = () => {
          if (isMounted) {
            setError('Failed to load map');
            setLoading(false);
          }
        };
        document.body.appendChild(script);

        return () => {
          document.head.removeChild(link);
          document.body.removeChild(script);
        };
      } catch (err) {
        if (isMounted) {
          setError('Failed to initialize map');
          setLoading(false);
        }
      }
    };

    loadMap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (mapReady && typeof window !== 'undefined') {
      // ✅ Initialize the map
      const L = window.L;
      const mapContainer = document.getElementById('property-map');

      if (mapContainer) {
        // ✅ Clear any existing map
        if (mapContainer._leaflet_id) {
          mapContainer._leaflet_id = null;
        }

        // ✅ Create map
        const map = L.map(mapContainer).setView(defaultCenter, 14);

        // ✅ Add OpenStreetMap tile layer (free, international)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        // ✅ Add marker
        const marker = L.marker(defaultCenter).addTo(map);
        
        // ✅ Add popup with location info
        marker.bindPopup(`
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <strong>${city || 'Property Location'}</strong><br/>
            ${address ? `${address}<br/>` : ''}
            ${region ? `${region}, ` : ''}${country || ''}
          </div>
        `);

        // ✅ Cleanup on unmount
        return () => {
          map.remove();
        };
      }
    }
  }, [mapReady, defaultCenter, city, address, region, country]);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* ✅ Map Container */}
        <div 
          id="property-map" 
          className="h-[300px] w-full relative"
          style={{ minHeight: '300px' }}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 flex-col gap-2 p-4">
              <FaMapMarkerAlt className="text-gray-400 text-4xl" />
              <p className="text-gray-600 text-sm text-center">
                Map unavailable. Location: {fullLocation || 'Not specified'}
              </p>
            </div>
          )}
        </div>

        {/* ✅ Location Details */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-primary text-xl flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-1">
                {fullLocation || 'No location available'}
              </p>
              {!coordinates && (
                <p className="text-xs text-gray-500">
                  Exact coordinates not available. Showing approximate location.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Map Attribution */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          Map data © <a href="https://openstreetmap.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenStreetMap</a> contributors
        </div>
      </div>
    </div>
  );
};

export default LocationSection;