import React from 'react';
import PropertyCard from '../ui/propertyCard'; 

const SimilarProperties = () => {
 
  const similarData = [
    {
      id: 101,
      title: "Urban Studio",
      location: "Midtown District",
      rating: 4.6,
      price: 150,
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 102,
      title: "Urban Studio",
      location: "Midtown District",
      rating: 4.6,
      price: 150,
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 103,
      title: "Luxury Penthouse",
      location: "Upper East Side",
      rating: 4.9,
      price: 320,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 104,
      title: "Cozy Apartment",
      location: "Brooklyn Heights",
      rating: 4.7,
      price: 120,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 105,
      title: "Industrial Loft",
      location: "SoHo District",
      rating: 4.8,
      price: 200,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="bg-white py-6 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#0f1d37] text-2xl font-bold mb-12 tracking-tight">
          Similar properties
        </h2>

        <div className="flex overflow-x-auto pb-6 md:pb-0 md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 no-scrollbar">
          {similarData.map((property) => (
            <div key={property.id} className="min-w-[280px] md:min-w-0">
              <PropertyCard
                id={property.id}
                title={property.title}
                location={property.location}
                rating={property.rating}
                price={property.price}
                image={property.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProperties;