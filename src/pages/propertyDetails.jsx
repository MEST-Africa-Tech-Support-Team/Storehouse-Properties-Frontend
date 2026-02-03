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
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperty = async (propertyId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/properties/${propertyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Failed to load property (${response.status})`;
        throw new Error(errorMessage);
      }

      const propertyData = await response.json();
      
      // ✅ Normalize property data to match exact API structure
      const normalizedProperty = normalizePropertyData(propertyData);
      setProperty(normalizedProperty);
      
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

  const normalizePropertyData = (data) => {
    const propertyData = data.property || data.data || data;
    
    const amenitiesArray = propertyData.amenities 
      ? (Array.isArray(propertyData.amenities) 
          ? propertyData.amenities 
          : propertyData.amenities.split(',').map(item => item.trim()))
      : [];
    
    const rules = propertyData.rules || {};
    
    const location = propertyData.location || {};
    
    return {
      _id: propertyData._id || propertyData.id,
      id: propertyData._id || propertyData.id,
      title: propertyData.title || 'Untitled Property',
      description: propertyData.description || '',
      propertyType: propertyData.propertyType || 'house',
      pricePerNight: propertyData.pricePerNight || 0,
      maxGuests: propertyData.maxGuests || 2,
      amenities: amenitiesArray,
      rules: {
        childrenAllowed: rules.childrenAllowed || false,
        petsAllowed: rules.petsAllowed || false,
        minimumAge: rules.minimumAge || 0,
        ...rules
      },
      location: {
        address: location.address || '',
        city: location.city || 'Unknown',
        region: location.region || '',
        country: location.country || '',
        ...location
      },
      featured: propertyData.featured || false,
      images: Array.isArray(propertyData.images) ? propertyData.images : [propertyData.image].filter(Boolean),
      rating: propertyData.rating || propertyData.averageRating || 4.5,
      reviewCount: propertyData.reviewCount || propertyData.reviews?.length || 0,
      isSuperhost: propertyData.isSuperhost || false,
      reviews: propertyData.reviews || [],
      createdAt: propertyData.createdAt,
      updatedAt: propertyData.updatedAt
    };
  };

  useEffect(() => {
    if (id) {
      fetchProperty(id);
    } 
   
    else if (location.state?.property) {
      const propFromState = location.state.property;
      const normalizedProperty = normalizePropertyData(propFromState);
      setProperty(normalizedProperty);
      
      const saved = localStorage.getItem(`favorite_${propFromState._id || propFromState.id}`);
      setIsFavorite(saved === 'true');
      
      setLoading(false);
    } 
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
            {error || "The property you're looking for doesn't exist or wasn't loaded properly."}
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

  const locationString = property.location?.city && property.location?.region && property.location?.country
    ? `${property.location.city}, ${property.location.region}, ${property.location.country}`
    : property.location?.city && property.location?.region
    ? `${property.location.city}, ${property.location.region}`
    : property.location?.city || 'Location not available';

  return (
    <div className="bg-white min-h-screen px-4 sm:px-6 md:px-8 py-6">
      <div className="mb-8">
        <PropertyImageGallery images={property.images.length > 0 ? property.images : ['https://placehold.co/600x400/e2e8f0/64748b?text=No+Image']} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-20">
            <PropertyHeader
              title={property.title}
              location={locationString} 
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
              amenities={property.amenities.length > 0 ? property.amenities : fallbackAmenities} 
            />

            <ReviewsSection 
              reviews={property.reviews.length > 0 ? property.reviews : fallbackReviews} 
            />

            <LocationSection 
              location={property.location} 
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <BookingForm 
                price={property.pricePerNight || 0}
                propertyId={property.id || property._id}
                propertyTitle={property.title}
                propertyImage={property.images?.[0]}
                propertyLocation={property.location}
              />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <SimilarProperties propertyId={property.id || property._id} />
        </div>
      </div>
    </div>
  );
}