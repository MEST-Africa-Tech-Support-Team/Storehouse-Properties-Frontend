import { useState, useRef, useEffect } from "react";
import {
  FaHandHoldingHeart,
  FaChartLine,
  FaClipboardCheck,
  FaBullhorn,
  FaUserTie,
  FaTools,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const WhyChooseStorehouse = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const carouselRef = useRef(null);

  const features = [
    {
      icon: <FaHandHoldingHeart />,
      title: "Hassle-Free Property Management",
      description: "We take away the daily stress of property ownership by handling everything from tenant relations to maintenance, allowing you to enjoy your investment without the usual headaches.",
    },
    {
      icon: <FaChartLine />,
      title: "Maximized Returns on Your Investment",
      description: "Our management approach is focused on increasing income while controlling costs through efficient operations, smart maintenance decisions, and strategic pricing.",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Professional & Transparent Operations",
      description: "Built on professionalism, integrity, and accountability, our systems ensure clear reporting, proper documentation, and full transparency for property owners at all times.",
    },
    {
      icon: <FaBullhorn />,
      title: "Strong Marketing & High Visibility",
      description: "We give your property continuous exposure using Airbnb, Booking.com, social media, and other innovative marketing channels to secure quality tenants and guests quickly.",
    },
    {
      icon: <FaUserTie />,
      title: "Experienced & Reliable Team",
      description: "With over 10 years of experience in property management, our trained staff and professional maintenance team ensure your property is well managed and well protected.",
    },
    {
      icon: <FaTools />,
      title: "Quality Maintenance & Property Protection",
      description: "We maintain high standards through regular inspections, preventive maintenance, and contingency planning, keeping your property attractive, safe, and profitable.",
    },
  ];

  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [visibleCards, setVisibleCards] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getCardsPerView();
      setVisibleCards(newVisibleCards);
      const newMaxIndex = Math.max(0, features.length - newVisibleCards);
      if (currentIndex > newMaxIndex) {
        setCurrentIndex(newMaxIndex);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, features.length]);

  const maxIndex = Math.max(0, features.length - visibleCards);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const getPositionX = (event) => {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartPos(getPositionX(e));
    setPrevTranslate(currentIndex * -(100 / visibleCards));
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startPos;
    const containerWidth = carouselRef.current?.offsetWidth || 1;
    const translatePercent = (diff / containerWidth) * 100;
    
    const newTranslate = prevTranslate + translatePercent;
    const minTranslate = -(maxIndex * (100 / visibleCards));
    const constrainedTranslate = Math.max(minTranslate, Math.min(0, newTranslate));
    
    setCurrentTranslate(constrainedTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const movedBy = currentTranslate - prevTranslate;
    const threshold = 10; // percentage threshold for swipe

    if (movedBy < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    
    setCurrentTranslate(currentIndex * -(100 / visibleCards));
  };

  return (
    <section className="bg-white py-10 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-20 text-center">
          <h2 className="text-2xl sm:text-5xl lg:text-4xl font-bold text-[#222222] mb-6 tracking-tight">
            Why Choose Storehouse Property and Consult Ltd?
          </h2>
          <p className="text-lg sm:text-xl text-[#717171] leading-relaxed">
            Experience hassle-free property rental with our trusted platform
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full 
                         border border-[#DDDDDD] hover:border-[#222222] items-center justify-center hover:shadow-md
                         transition-all duration-200"
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-[#222222] text-sm" />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={handleNext}
              className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full 
                         border border-[#DDDDDD] items-center justify-center hover:border-[#222222] hover:shadow-md
                         transition-all duration-200"
              aria-label="Next slide"
            >
              <FaChevronRight className="text-[#222222] text-sm" />
            </button>
          )}

          {/* Carousel Track */}
          <div 
            ref={carouselRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div
              className={`flex gap-5 sm:gap-6 lg:gap-8 pb-2 ${isDragging ? '' : 'transition-transform duration-400 ease-out'}`}
              style={{
                transform: `translateX(${isDragging ? currentTranslate : -(currentIndex * (100 / visibleCards))}%)`,
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ 
                    width: visibleCards === 1 ? '100%' : 
                           visibleCards === 2 ? 'calc(50% - 12px)' : 
                           'calc(33.333% - 21.333px)'
                  }}
                >
                  <FeatureCard {...feature} isDragging={isDragging} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {maxIndex > 0 && (
            <div className="flex justify-center lg:justify-start gap-2 mt-12">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                    currentIndex === index
                      ? "bg-[#222222] w-8"
                      : "bg-[#DDDDDD] w-1.5 hover:bg-[#B0B0B0]"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Mobile swipe hint */}
        {maxIndex > 0 && (
          <div className="lg:hidden text-left mt-8">
            <p className="text-sm text-[#717171]">
              Swipe to see more
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description, isDragging, index }) => {
  return (
    <div
      className={`group relative bg-white rounded-xl p-8 sm:p-10 lg:p-12
                 border border-light-primary hover:border-hover hover:shadow-lg
                 transition-all duration-200 ease-out
                 ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}
                 focus:outline-none focus:ring-2 focus:ring-[#222222] focus:ring-offset-2 h-full`}
      tabIndex={0}
    >
      {/* Number indicator */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl 
                        bg-light-primary/30 group-hover:bg-hover transition-all duration-200">
          <span className="text-primary text-2xl sm:text-3xl group-hover:text-white transition-colors duration-200">
            {icon}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-[#DDDDDD] group-hover:text-hover transition-colors duration-200">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-xl group-hover:text-hover sm:text-2xl font-semibold text-[#222222] leading-tight tracking-tight pr-4 transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <div className="overflow-hidden">
          <p className="text-[15px] sm:text-base text-[#717171] leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Hover indicator line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-hover scale-x-0 group-hover:scale-x-100 
                      transition-transform duration-300 origin-left rounded-b-xl" />
    </div>
  );
};

export default WhyChooseStorehouse;