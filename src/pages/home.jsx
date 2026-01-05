import CatergorySec from "../components/property/categorySec";
import SearchBar from "../components/property/searchBar";
import WhyUs from "../components/property/whyUs"; 
import Hero from "../components/property/hero";
import FeaturedStays from "../components/property/featuredProperties";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      
      
      <div className="relative -mt-10 md:-mt-16 lg:-mt-18 z-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Add top padding to prevent overlap */}
      <div className="">
        <FeaturedStays />
        <CatergorySec />
        <WhyUs />
      </div>
    </div>
  );
}