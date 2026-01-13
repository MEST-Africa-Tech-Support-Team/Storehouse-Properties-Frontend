import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router'; 
import PropertyCard from '../ui/PropertyCard';

const FeaturedStays = () => {
  const featuredProperties = [
    {
      id: 1,
      title: 'Sky View Studio',
      location: 'Downtown, New York',
      rating: 4.9,
      price: 120,
      description: 'A sleek modern studio with panoramic city views and premium finishes.',
      badge: 'Top Rated',
      category: 'Studio',
      images: [
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZnQlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWx5JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZnQlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
         'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZnQlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      ],
    },
    {
      id: 2,
      title: 'Ocean Breeze Penthouse',
      location: 'Miami Beach, FL',
      rating: 5.0,
      price: 350,
      description: 'Luxury penthouse steps from the beach with private terrace and ocean views.',
      badge: 'Luxury',
      category: 'Penthouse',
      images: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      ],
    },
    {
      id: 3,
      title: 'Garden Family Home',
      location: 'Austin, Texas',
      rating: 4.8,
      price: 180,
      description: 'Spacious family home with backyard garden, perfect for groups and kids.',
      badge: 'Family Friendly',
      category: 'House',
      images: [
        'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWx5JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZnQlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      ],
    },
    {
      id: 4,
      title: 'Industrial Loft',
      location: 'Brooklyn, NY',
      rating: 4.7,
      price: 145,
      description: 'Raw concrete, exposed beams, and artistic vibes in the heart of Brooklyn.',
      badge: 'Trendy',
      category: 'Loft',
      images: [
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZnQlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      ],
    },
    {
      id: 5,
      title: 'Modern Downtown Loft',
      location: 'Chicago, IL',
      rating: 4.6,
      price: 160,
      description: 'Urban loft with skyline views and designer furnishings.',
      badge: 'New',
      category: 'Loft',
      images: [
        'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      ],
    },
    {
      id: 6,
      title: 'Mountain Cabin Retreat',
      location: 'Aspen, CO',
      rating: 4.9,
      price: 290,
      description: 'Cozy cabin surrounded by pines with fireplace and hot tub.',
      badge: 'Scenic',
      category: 'Cabin',
      images: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWx5JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      ],
    },
    {
      id: 7,
      title: 'Beachfront Bungalow',
      location: 'Malibu, CA',
      rating: 4.8,
      price: 420,
      description: 'Steps from the surf with open-plan living and ocean deck.',
      badge: 'Beachfront',
      category: 'Bungalow',
      images: [
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZnQlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      ],
    },
    {
      id: 8,
      title: 'Historic Townhouse',
      location: 'Charleston, SC',
      rating: 4.7,
      price: 210,
      description: 'Charming 19th-century townhouse with courtyard and period details.',
      badge: 'Historic',
      category: 'Townhouse',
      images: [
        'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWx5JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZnQlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      ],
    },
  ];

  return (
    <section className="py-20 px-4 md:px-20 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-[#0f1d37] text-[36px] font-extrabold tracking-tight">
            Featured Stays
          </h2>
          
          <Link 
            to="/explore" 
            className="flex items-center gap-3 text-[#2563eb] text-[16px] font-bold hover:text-blue-800 group transition-colors"
          >
            View All
            <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              image={property.images[0]} 
              images={property.images}    
              title={property.title}
              location={property.location}
              rating={property.rating}
              price={property.price}
              description={property.description}
              badge={property.badge}
              category={property.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStays;