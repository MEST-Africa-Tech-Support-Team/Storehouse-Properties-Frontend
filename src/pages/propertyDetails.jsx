import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import PropertyImageGallery from '../components/property/propertyImageGallery';
import PropertyHeader from '../components/property/propertyHeader';
import PropertyDescription from '../components/property/propertyDescription';
import AmenitiesSection from '../components/property/amenitiesSec';
import ReviewsSection from '../components/property/reviewSec';
import LocationSection from '../components/property/locationSec';
import BookingForm from '../components/property/bookingForm';
import SimilarProperties from '../components/property/similarProperty';

export default function PropertyDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ Get property ID from URL
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch property from API using ID from URL
  const fetchProperty = async (propertyId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Failed to load property (${response.status})`;
        throw new Error(errorMessage);
      }

      const propertyData = await response.json();
      setProperty(propertyData);
      
      // Check if it's a favorite
      const saved = localStorage.getItem(`favorite_${propertyId}`);
      setIsFavorite(saved === 'true');
      
    } catch (error) {
      console.error('Fetch property error:', error);
      setError(error.message || 'Failed to load property details.');
      toast.error(error.message || 'Failed to load property details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Priority 1: Use ID from URL params
    if (id) {
      fetchProperty(id);
    } 
    // ✅ Fallback: Use property from location state (for navigation from ExplorePage)
    else if (location.state?.property) {
      const propFromState = location.state.property;
      setProperty(propFromState);
      
      // Check if it's a favorite
      const saved = localStorage.getItem(`favorite_${propFromState._id || propFromState.id}`);
      setIsFavorite(saved === 'true');
      
      setLoading(false);
    } 
    // ✅ No property data available
    else {
      setLoading(false);
      setError('Property not found');
    }
  }, [id, location.state?.property]);

  const handleToggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    const propertyId = property?._id || property?.id || id;
    if (propertyId) {
      localStorage.setItem(`favorite_${propertyId}`, String(newState));
    }
    toast(newState ? 'Added to favorites' : 'Removed from favorites', {
      icon: '❤️',
      duration: 2000,
      position: 'top-center',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property not found</h2>
          <p className="text-gray-600 mb-6">
            {error || "The property you're looking for doesn’t exist or wasn’t loaded properly."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const fallbackAmenities = [
    'High-speed WiFi',
    'Air conditioning',
    'Kitchen',
    'Free parking',
  ];
  const fallbackReviews = [
    {
      name: 'Guest',
      avatar: '',
      rating: property.rating || 4.5,
      date: 'Recent',
      text: property.description || 'Great stay! Highly recommended.',
    },
  ];

  return (
    <div className="bg-white min-h-screen px-4 sm:px-6 md:px-8 py-6">
      <div className="mb-8">
        <PropertyImageGallery images={property.images || [property.image]} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-20">
            <PropertyHeader
              title={property.title}
              location={property.location}
              rating={property.rating || 4.5}
              reviewCount={property.reviewCount || 0}
              isSuperhost={property.isSuperhost || false}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />

            <PropertyDescription 
              description={property.description || 'No description available.'} 
            />

            <AmenitiesSection 
              amenities={property.amenities || fallbackAmenities} 
            />

            <ReviewsSection 
              reviews={property.reviews || fallbackReviews} 
            />

            <LocationSection 
              location={property.location} 
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <BookingForm 
                price={property.pricePerNight || property.price || 0} 
              />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <SimilarProperties />
        </div>
      </div>
    </div>
  );
}