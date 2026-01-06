// src/components/ReviewsSection.jsx
import { FaStar } from 'react-icons/fa';

export default function ReviewsSection({ reviews }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews <span className="text-sm text-gray-600">★ {reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length} ({reviews.length} reviews)</span></h2>
      
      <div className="space-y-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{review.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}