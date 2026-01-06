import CatergorySec from "../components/property/categorySec";
import SearchBar from "../components/property/searchBar";
import WhyUs from "../components/property/whyUs"; 
import Hero from "../components/property/hero";
import FeaturedStays from "../components/property/featuredProperties";
import Testimonials from "../components/property/testimonials";
import Aboutsec from "../components/property/aboutSec";
import Faq from "../components/property/faq";
import CTA from "../components/property/cta";


export default function Home() {
  return (
    <div className="relative">
      <Hero />
      
      
      <div className="relative -mt-10 md:-mt-16 lg:-mt-18 z-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SearchBar />
        </div>
      </div>

      <div className="">
        <FeaturedStays />
        <CatergorySec />
        <WhyUs />
        <Testimonials />
        <Aboutsec />
        <Faq />
        <CTA />
      </div>
    </div>
  );
}