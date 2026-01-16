import React, { useState } from "react";
import { useOutletContext } from "react-router";

import UserSidebar from "../../components/userDashboard/userSidebar.jsx";
import PropertyCard from "../../components/ui/propertyCard.jsx";
import FavoritesFilterBar from "../../components/userDashboard/favouritesFilterBar.jsx";
import FavoritesHeader from "../../components/userDashboard/favouritesHeader.jsx";

const FavoritesPage = () => {
  const { userName } = useOutletContext();

  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "The Avery Apartment",
      location: "Greater Accra, Ghana",
      price: 180,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60&sig=1",
      badge: "Price Drop",
      isFavorite: true,
    },
    {
      id: 2,
      title: "The Avery Apartment",
      location: "Greater Accra, Ghana",
      price: 180,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60&sig=2",
      badge: null,
      isFavorite: true,
    },
    {
      id: 3,
      title: "The Avery Apartment",
      location: "Greater Accra, Ghana",
      price: 180,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60&sig=3",
      badge: "New Listing",
      isFavorite: true,
    },
    {
      id: 4,
      title: "The Avery Apartment",
      location: "Greater Accra, Ghana",
      price: 180,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60&sig=4",
      badge: "New Listing",
      isFavorite: true,
    },
  ]);

  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  const handleApplyFilters = (filters) => {
    let result = [...favorites];
    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "Rating") {
      result.sort((a, b) => b.rating - a.rating);
    }
    setFilteredFavorites(result);
  };

  const handleResetFilters = () => {
    setFilteredFavorites(favorites);
  };

  return (
    <div className="flex">
      <UserSidebar />
      <div className="ml-64 p-6 max-w-[1400px] w-full">
        <FavoritesHeader count={favorites.length} />

        <FavoritesFilterBar
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFavorites.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              image={property.image}
              title={property.title}
              location={property.location}
              rating={property.rating}
              price={property.price}
              badge={property.badge}
              category=""
              images={[property.image]}
              isFavorite={true} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;