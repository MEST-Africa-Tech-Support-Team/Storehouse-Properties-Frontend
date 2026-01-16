import React from 'react';
import { Link } from 'react-router';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      title: "Beachfront Paradise Villa",
      viewed: "2 days ago",
      location: "Malibu, CA",
      rating: 4.9,
      price: 420,
      description: "Steps from the surf with open-plan living and ocean deck.",
      badge: "Beachfront",
      category: "Villa",
      images: [
        "https://images.unsplash.com/photo-1560448204-e62e497b1d04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ]
    },
    {
      id: 2,
      title: "Mountain Retreat Cabin",
      viewed: "5 days ago",
      location: "Aspen, CO",
      rating: 4.9,
      price: 290,
      description: "Cozy cabin surrounded by pines with fireplace and hot tub.",
      badge: "Scenic",
      category: "Cabin",
      images: [
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ]
    },
    {
      id: 3,
      title: "Urban Industrial Loft",
      viewed: "1 week ago",
      location: "Brooklyn, NY",
      rating: 4.7,
      price: 145,
      description: "Raw concrete, exposed beams, and artistic vibes in the heart of Brooklyn.",
      badge: "Trendy",
      category: "Loft",
      images: [
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1560448204-e62e497b1d04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {activities.map((item) => (
          <li
            key={item.id}
            className="flex items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0 cursor-pointer group"
            onClick={() => {
            }}
          >
            <Link
              to={`/property/${item.id}`}
              state={{
                property: {
                  id: item.id,
                  title: item.title,
                  location: item.location,
                  rating: item.rating,
                  price: item.price,
                  description: item.description,
                  badge: item.badge,
                  category: item.category,
                  images: item.images,
                }
              }}
              className="flex items-center w-full"
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-15 h-15 rounded-lg object-cover mr-3 transition-transform duration-300 ease-out group-hover:scale-105 group-hover:shadow-md"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80";
                }}
              />

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">{item.title}</h4>
                <p className="text-xs text-gray-500 mt-1">Viewed {item.viewed}</p>
              </div>

              <span className="px-3 py-1.5 bg-white text-[#1E5EFF] border-2 border-[#1E5EFF] text-xs font-medium rounded-full whitespace-nowrap group-hover:bg-[#1E5EFF] group-hover:text-white transition-colors">
                View
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;