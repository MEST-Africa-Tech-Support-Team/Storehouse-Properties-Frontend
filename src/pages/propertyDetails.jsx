// src/pages/PropertyDetails.jsx
import { useParams, useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Import components
import PropertyImageGallery from '../components/property/propertyImageGallery';
import PropertyHeader from '../components/property/propertyHeader';
import PropertyDescription from '../components/property/propertyDescription';
import AmenitiesSection from '../components/property/amenitiesSec';
import ReviewsSection from '../components/property/reviewSec';
import LocationSection from '../components/property/locationSec';
import BookingForm from '../components/property/bookingForm';
import SimilarProperties from '../components/property/similarProperty';

// Mock data
const mockProperties = [
  {
    id: 1,
    title: 'Modern Downtown Loft',
    location: 'Downtown District, New York City',
    rating: 4.8,
    reviewCount: 124,
    isSuperhost: true,
    description: 'Experience luxury living in this stunning downtown loft featuring floor-to-ceiling windows, modern amenities, and breathtaking city views. Perfect for business travelers and couples seeking an upscale urban retreat.',
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: [
      'High-speed WiFi',
      'Free parking',
      'Child Included',
      'Full kitchen',
      'Air conditioning',
      'Smart TV',
      '24/7 security',
      'Gym access',
      'Concierge',
    ],
    reviews: [
      {
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        date: '2 weeks ago',
        text: 'Absolutely stunning property! The location is perfect and the amenities exceeded expectations. The host was incredibly responsive and helpful throughout our stay.',
      },
      {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        date: '1 month ago',
        text: 'Perfect for a business trip. The workspace was excellent and the building\'s amenities made my stay very comfortable. Highly recommend!',
      },
    ],
    price: 180,
  },
];

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const property = mockProperties.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="container py-6 text-center">
        <h2 className="text-2xl text-gray-700">Property not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:underline"
        >
          ← Back to home
        </button>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div className="bg-white min-h-screen px-8 py-2">
      <div className="mb-8">
        <PropertyImageGallery images={property.images} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-20">
            <PropertyHeader
              title={property.title}
              location={property.location}
              rating={property.rating}
              reviewCount={property.reviewCount}
              isSuperhost={property.isSuperhost}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />

            <PropertyDescription description={property.description} />

            <AmenitiesSection amenities={property.amenities} />

            <ReviewsSection reviews={property.reviews} />

            <LocationSection location={property.location} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <BookingForm price={property.price} />
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