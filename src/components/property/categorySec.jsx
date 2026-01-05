import React from "react";
import { HiHome, HiCurrencyDollar } from "react-icons/hi2";
import { FaBuilding, FaRegClock } from "react-icons/fa6";
import { MdDiamond } from "react-icons/md";
import CategoryCard from "../../components/ui/categoryCard";

const BrowseByCategory = () => {
  const categories = [
    { id: 1, label: "Apartments", icon: FaBuilding },
    { id: 2, label: "Short Stays", icon: FaRegClock },
    { id: 3, label: "Family Homes", icon: HiHome },
    { id: 4, label: "Luxury Homes", icon: MdDiamond },
    { id: 5, label: "Budget Rentals", icon: HiCurrencyDollar },
  ];

  return (
    <section className="bg-[#E5E7EB] py-12 px-4 flex flex-col cols-5 items-center justify-center">
      <div className="text-center mb-8">
        <h2 className="text-[#0f1d37] text-4xl font-bold mb-4 tracking-tight">
          Browse by Category
        </h2>
        <p className="text-gray-500 text-lg">
          Find the perfect property type for your needs
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-7xl">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            icon={category.icon}
            label={category.label}
          />
        ))}
      </div>
    </section>
  );
};

export default BrowseByCategory;
