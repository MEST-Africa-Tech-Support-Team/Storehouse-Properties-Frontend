import {
  FaShieldAlt,
  FaCheckCircle,
  FaCalendarCheck,
  FaHeadset,
} from "react-icons/fa";

const WhyChooseStorehouse = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level encryption and secure payment gateways.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Verified Properties",
      description: "Every property is thoroughly verified and inspected before listing on our platform.",
    },
    {
      icon: <FaCalendarCheck />,
      title: "Easy Booking",
      description: "Book your perfect stay in just a few clicks with our streamlined booking process.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Our dedicated support team is always available to assist you with any queries.",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-[36px] font-bold text-[#0f172a] mb-4">
          Why Choose Storehouse?
        </h2>

        <p className="text-gray-500 text-[16px] max-w-2xl mx-auto mb-14">
          Experience hassle-free property rental with our trusted platform
        </p>

        {/* Desktop & Tablet: Grid layout */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Mobile: Horizontal scroll */}
        <div className="sm:hidden w-full">
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE/Edge
            }}
            className="gap-8 pb-4 -mx-6 px-6"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex-shrink-0 w-64">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div
      className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-200 ease-out
                 hover:shadow-lg active:scale-[0.98] active:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50
                 hover:shadow-primary cursor-pointer"
      tabIndex={0}
    >
      <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-light-primary/30 mb-6">
        <span className="text-primary text-[28px]">{icon}</span>
      </div>

      <h3 className="text-[18px] font-semibold text-[#0f172a] mb-3">{title}</h3>

      <p className="text-gray-500 text-[14px] leading-relaxed max-w-[260px]">
        {description}
      </p>
    </div>
  );
};

export default WhyChooseStorehouse;