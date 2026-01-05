import { FaFacebookF, FaTwitter, FaInstagram, FaHome } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f2a44] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-blue-500 p-2 rounded-lg">
              <FaHome className="text-white text-lg" />
            </div>
            <h2 className="text-white text-xl font-semibold">
              Storehouse
            </h2>
          </div>

          <p className="text-gray-400 leading-relaxed max-w-xs">
            Find your perfect rental property with ease and confidence.
          </p>

          <div className="flex gap-4 mt-6">
            <SocialIcon icon={FaFacebookF} />
            <SocialIcon icon={FaTwitter} />
            <SocialIcon icon={FaInstagram} />
          </div>
        </section>

        <FooterColumn
          title="Properties"
          links={["Apartments", "Houses", "Condos", "Luxury"]}
        />

        <FooterColumn
          title="Company"
          links={["Home", "Explore", "About Us", "Contact"]}
        />

        <section>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <p className="hover:text-white transition-colors duration-200 cursor-pointer">
            Call Us: +233 20 687 9876
          </p>
          <p className="mt-2 hover:text-white transition-colors duration-200 cursor-pointer">
            storehouse@gmail.com
          </p>
        </section>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mx-6"></div>

      <div className="text-center py-3 text-gray-400 text-sm">
        © 2026 Storehouse. All rights reserved.
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <section>
      <h3 className="text-white font-semibold mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li
            key={item}
            className="cursor-pointer hover:text-white hover:translate-x-1 transition-all duration-200"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

const SocialIcon = ({ icon: Icon }) => {
  return (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#0f2a44] cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-300">
      <Icon />
    </div>
  );
};

export default Footer;
