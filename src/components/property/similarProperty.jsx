import React, { useEffect, useState } from 'react';
import PropertyCard from '../ui/propertyCard';
import { propertyService } from '../../services/propertyService';
import { toast } from 'react-hot-toast';

const SimilarProperties = ({ propertyId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Removed hard-coded fallback data — do not inject dummy properties.
  // When no similar properties are available we show an empty state (or nothing).

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!propertyId) {
        // no property provided — render nothing
        setItems([]);
        return;
      }

      setLoading(true);
      try {
        const data = await propertyService.getSimilarProperties(propertyId);
        if (!mounted) return;
        setItems((data && data.length) ? data : []);
      } catch (err) {
        console.error('Similar properties load failed:', err);
        toast.error('Could not load similar properties');
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, [propertyId]);

  return (
    <section className="bg-white py-6 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#0f1d37] text-2xl font-bold mb-12 tracking-tight">
          Similar properties
        </h2>

        <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 no-scrollbar">
          {loading ? (
            [1,2,3,4].map((s) => (
              <div key={s} className="min-w-[280px] md:min-w-0">
                <div className="animate-pulse bg-gray-100 rounded-lg h-[220px] mb-3"></div>
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse"></div>
              </div>
            ))
          ) : (
            items && items.length > 0 ? (
              items.map((property) => (
                <div key={property._id || property.id} className="min-w-[280px] md:min-w-0">
                  <PropertyCard
                    id={property._id || property.id}
                    images={property.images || property.image ? (property.images || [property.image]) : undefined}
                    title={property.title}
                    location={property.location?.city || property.location || property.locationString}
                    rating={property.rating || property.averageRating}
                    pricePerNight={property.pricePerNight || property.price}
                  />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-8 text-sm text-gray-500">No similar properties found.</div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default SimilarProperties;