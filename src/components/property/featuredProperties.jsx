import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router'; 
import PropertyCard from '../../components/ui/propertyCard'; 

const FeaturedStays = () => {
  const featuredProperties = [
    {
      id: 1, 
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      title: 'Sky View Studio',
      location: 'Downtown, New York',
      rating: 4.9,
      price: 120,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlbnRob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      title: 'Ocean Breeze Penthouse',
      location: 'Miami Beach, FL',
      rating: 5.0,
      price: 350,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWx5JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      title: 'Garden Family Home',
      location: 'Austin, Texas',
      rating: 4.8,
      price: 180,
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGxvZnQlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      title: 'Industrial Loft',
      location: 'Brooklyn, NY',
      rating: 4.7,
      price: 145,
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

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id} // CRITICAL: Passing the ID for navigation
              image={property.image}
              title={property.title}
              location={property.location}
              rating={property.rating}
              price={property.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStays;