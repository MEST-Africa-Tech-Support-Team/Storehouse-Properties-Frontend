import { FaFacebookF, FaTwitter, FaInstagram, FaHome } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../../images/storehouse-logo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-12">

        <section>
          <Link to="/">
          <div className="flex items-center mb-5">
              <img src={Logo} alt="Storehouse Logo" className="h-10 w-auto brightness-0" />
            <h2 className="text-gray-900 text-xl font-semibold">
              Storehouse Property
            </h2>
          </div>
          </Link>

          <p className="text-gray-600 leading-relaxed max-w-xs">
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
          <h3 className="text-gray-900 font-semibold mb-4">Support</h3>
          <p className="hover:text-primary transition-colors duration-200 cursor-pointer">
            Call Us: +233 20 687 9876
          </p>
          <p className="mt-2 hover:text-primary transition-colors duration-200 cursor-pointer">
            storehouse@gmail.com
          </p>
        </section>
      </div>

      <div className="border-t border-gray-200 mx-6"></div>

      <div className="text-center py-3 text-gray-600 text-sm">
        © 2026 Storehouse. All rights reserved.
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <section>
      <h3 className="text-gray-900 font-semibold mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li
            key={item}
            className="cursor-pointer hover:text-primary hover:translate-x-1 transition-all duration-200"
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
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-900 text-white cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
      <Icon />
    </div>
  );
};

export default Footer;
