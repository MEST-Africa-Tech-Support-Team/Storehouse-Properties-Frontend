import React from 'react';
import TestimonialCard from '../../components/ui/testimonyCard';

const Testimonials = () => {
  const testimonialData = [
    {
      id: 1,
      author: "Sarah Mitchell",
      role: "Business Traveler",
      quote: "Storehouse made finding my perfect apartment so easy! The verification process gave me peace of mind, and the booking was seamless.",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      id: 2,
      author: "Michael Chen",
      role: "Family Vacationer",
      quote: "Outstanding service! The property was exactly as described, and the support team was incredibly helpful throughout my stay.",
      avatar: "https://i.pravatar.cc/150?u=michael"
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      role: "Digital Nomad",
      quote: "I've used many rental platforms, but Storehouse stands out with its user-friendly interface and quality properties. Highly recommend!",
      avatar: "https://i.pravatar.cc/150?u=emma"
    }
  ];

  return (
    <section className="bg-[#F4F8FF] py-10 px-18 flex flex-col items-center">
      <header className="text-center mb-12">
        <h2 className="text-[#0f1d37] text-[40px] font-bold mb-2 tracking-tight">
          What Our Guests Say
        </h2>
        <p className="text-gray-500 text-xl font-medium">
          Real experiences from real people
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full justify-items-center">
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
    </section>
  );
};

export default Testimonials;