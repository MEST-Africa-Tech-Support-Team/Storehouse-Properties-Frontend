import { useLocation, useNavigate } from 'react-router';
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
  const [isFavorite, setIsFavorite] = useState(false);

  const property = location.state?.property;

  useEffect(() => {
    if (property?.id) {
      const saved = localStorage.getItem(`favorite_${property.id}`);
      setIsFavorite(saved === 'true');
    }
  }, [property?.id]);

  const handleToggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (property?.id) {
      localStorage.setItem(`favorite_${property.id}`, String(newState));
    }
    toast(newState ? 'Added to favorites' : 'Removed from favorites', {
      icon: '❤️',
      duration: 2000,
      position: 'top-center',
    });
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Property not found</h2>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn’t exist or wasn’t loaded properly.
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
                price={property.price || 0} 
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