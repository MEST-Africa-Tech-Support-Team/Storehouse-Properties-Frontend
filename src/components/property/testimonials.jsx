import React from "react";
import TestimonialCard from "../../components/ui/testimonyCard";

const Testimonials = () => {
  const testimonialData = [
    {
      id: 1,
      author: "Sarah Mitchell",
      role: "Business Traveler",
      quote:
        "Storehouse made finding my perfect apartment so easy! The verification process gave me peace of mind, and the booking was seamless.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      id: 2,
      author: "Michael Chen",
      role: "Family Vacationer",
      quote:
        "Outstanding service! The property was exactly as described, and the support team was incredibly helpful throughout my stay.",
      avatar: "https://i.pravatar.cc/150?u=michael",
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      role: "Digital Nomad",
      quote:
        "I've used many rental platforms, but Storehouse stands out with its user-friendly interface and quality properties. Highly recommend!",
      avatar: "https://i.pravatar.cc/150?u=emma",
    },
  ];

  return (
    <section className="bg-light-primary/20 py-16 px-4 sm:px-6 lg:px-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-[#0f1d37] text-4xl md:text-5xl font-bold tracking-tight">
          What Our Guests Say
        </h2>
        <p className="mt-3 text-gray-500 text-lg">
          Real experiences from real people
        </p>
      </div>

      {/* Desktop / Tablet */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonialData.map((item) => (
          <TestimonialCard
            key={item.id}
            quote={item.quote}
            author={item.author}
            role={item.role}
            avatar={item.avatar}
          />
        ))}
      </div>

      {/* Mobile horizontal scroll */}
      <div className="md:hidden max-w-7xl mx-auto">
        <div
          className="
            flex gap-6 overflow-x-auto scroll-smooth
            snap-x snap-mandatory
            scrollbar-none
            px-1
          "
        >
          {[...testimonialData, ...testimonialData].map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="snap-center flex-shrink-0 w-[85%]"
            >
              <TestimonialCard
                quote={item.quote}
                author={item.author}
                role={item.role}
                avatar={item.avatar}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
