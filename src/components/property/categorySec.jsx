import React from "react";
import { HiHome, HiCurrencyDollar } from "react-icons/hi2";
import { FaBuilding, FaRegClock } from "react-icons/fa6";
import { MdDiamond } from "react-icons/md";
import { Link } from 'react-router';
import CategoryCard from "../../components/ui/categoryCard";

const BrowseByCategory = () => {
  const categories = [
    { id: 1, label: "Apartments", icon: FaBuilding, slug: "apartments" },
    { id: 2, label: "Short Stays", icon: FaRegClock, slug: "short-stays" },
    { id: 3, label: "Family Homes", icon: HiHome, slug: "family-homes" },
    { id: 4, label: "Luxury Homes", icon: MdDiamond, slug: "luxury-homes" },
    { id: 5, label: "Budget Rentals", icon: HiCurrencyDollar, slug: "budget-rentals" },
  ];

  return (
    <section className="bg-[#F4F8FF] py-12 px-4 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h2 className="text-[#0f1d37] text-4xl font-bold mb-4 tracking-tight">
          Browse by Category
        </h2>
        <p className="text-gray-500 text-lg">
          Find the perfect property type for your needs
        </p>
      </div>

      {/* Desktop & Tablet: Wrap layout */}
      <div className="hidden sm:flex flex-wrap justify-center gap-6 max-w-7xl">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/explore?category=${encodeURIComponent(category.slug)}`}
            className="block transform transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] focus:outline-none"
          >
            <CategoryCard icon={category.icon} label={category.label} />
          </Link>
        ))}
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="sm:hidden w-full max-w-7xl">
        <div
          className="flex gap-6 pb-2 overflow-x-auto hide-scrollbar"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
          onScroll={(e) => {
            // Hide scrollbar in WebKit (Safari/Chrome) via inline style
            e.target.style.scrollbarWidth = 'none';
          }}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/explore?category=${encodeURIComponent(category.slug)}`}
              className="flex-shrink-0 w-32 block transform transition-all duration-200 hover:-translate-y-1 active:scale-[0.98] focus:outline-none"
            >
              <CategoryCard icon={category.icon} label={category.label} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;