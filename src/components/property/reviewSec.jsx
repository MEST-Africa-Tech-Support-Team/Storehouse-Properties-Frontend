import { useState } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

export default function ReviewsSection({ location = {} }) {
  const { city = 'Koforidua' } = location;
  
  const [reviews] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
      rating: 5,
      date: 'Nov 2023',
      text: `An exceptional stay in ${city}! The property exceeded all expectations with its thoughtful amenities and prime location. Waking up to the serene views each morning made our business trip feel like a retreat. The host's attention to detail created a truly memorable experience.`,
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      rating: 5,
      date: 'Dec 2023',
      text: `Perfect base for exploring ${city}! This property combines luxury with authentic local charm. The spacious layout accommodated our family comfortably, and the location put us steps away from the city's best dining and cultural sites. Immaculate cleanliness and responsive host.`,
      verified: true
    }
  ]);

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  const totalReviews = reviews.length;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Guest reviews</h2>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({totalReviews})</span>
        </div>
      </div>

      <div className="space-y-5">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="border-b border-gray-200 pb-5 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900 text-sm">{review.name}</h3>
                  {review.verified && (
                    <span className="flex items-center text-xs text-primary">
                      <FaCheckCircle className="w-3 h-3 mr-0.5" />
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed">
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Reviews are from verified guests who stayed at this property in {city}.
        </p>
      </div>
    </div>
  );
}