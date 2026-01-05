import {
  FaShieldAlt,
  FaCheckCircle,
  FaCalendarCheck,
  FaHeadset,
} from "react-icons/fa";

const WhyChooseStorehouse = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-[36px] font-bold text-[#0f172a] mb-4">
          Why Choose Storehouse?
        </h2>

        <p className="text-gray-500 text-[16px] max-w-2xl mx-auto mb-14">
          Experience hassle-free property rental with our trusted platform
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          <FeatureCard
            icon={<FaShieldAlt />}
            title="Secure Payments"
            description="Your transactions are protected with bank-level encryption and secure payment gateways."
          />

          <FeatureCard
            icon={<FaCheckCircle />}
            title="Verified Properties"
            description="Every property is thoroughly verified and inspected before listing on our platform."
          />

          <FeatureCard
            icon={<FaCalendarCheck />}
            title="Easy Booking"
            description="Book your perfect stay in just a few clicks with our streamlined booking process."
          />

          <FeatureCard
            icon={<FaHeadset />}
            title="24/7 Support"
            description="Our dedicated support team is always available to assist you with any queries."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center hover:shadow-lg p-6 rounded-2xl transition-shadow shadow-blue-200 duration-300">
      
      <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-blue-50 mb-6">
        <span className="text-blue-600 text-[28px]">
          {icon}
        </span>
      </div>

      <h3 className="text-[18px] font-semibold text-[#0f172a] mb-3">
        {title}
      </h3>

      <p className="text-gray-500 text-[14px] leading-relaxed max-w-[260px]">
        {description}
      </p>
    </div>
  );
};

export default WhyChooseStorehouse;
