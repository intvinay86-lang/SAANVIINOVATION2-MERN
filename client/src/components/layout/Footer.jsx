import { NavLink, Link } from "react-router-dom";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
  FiLogIn,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const socialLinks = [
  {
    icon: <FiFacebook size={18} />,
    url: "#",
    label: "Facebook",
    bgColor: "bg-[#1877F2] hover:bg-[#0C63D4]",
  },
  {
    icon: <FiTwitter size={18} />,
    url: "#",
    label: "Twitter",
    bgColor: "bg-[#1DA1F2] hover:bg-[#0C8BD9]",
  },
  {
    icon: <FiLinkedin size={18} />,
    url: "#",
    label: "LinkedIn",
    bgColor: "bg-[#0A66C2] hover:bg-[#004182]",
  },
  {
    icon: <FiInstagram size={18} />,
    url: "#",
    label: "Instagram",
    bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  },
  {
    icon: <FiYoutube size={18} />,
    url: "#",
    label: "YouTube",
    bgColor: "bg-[#FF0000] hover:bg-[#CC0000]",
  },
  {
    icon: <FaWhatsapp size={18} />,
    url: "#",
    label: "WhatsApp",
    bgColor: "bg-[#25D366] hover:bg-[#1DA851]",
  },
];

const usefulLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Term & Condition", path: "/terms" },
];

const serviceLinks = [
  { name: "Web Design", path: "/services" },
  { name: "Web Development", path: "/services" },
  { name: "Product Management", path: "/services" },
  { name: "Marketing", path: "/services" },
  { name: "Graphic Design", path: "/services" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              SAANVI INNOVATION
            </h3>

            {/* Address */}
            <div className="flex items-start gap-3 mb-4">
              <FiMapPin className="text-orange-400 w-5 h-5 flex-shrink-0 mt-1" />
              <div className="text-base text-gray-300 leading-relaxed">
                21, Nehru Colony, Near Vivekanand Chauraha,
                <br />
                Thatipur, Gwalior (M.P)
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 mb-4">
              <FiPhone className="text-orange-400 w-5 h-5 flex-shrink-0 mt-1" />
              <div className="text-base text-gray-300">
                <a
                  href="tel:+917999840475"
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  +91 7999840475
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <FiMail className="text-orange-400 w-5 h-5 flex-shrink-0 mt-1" />
              <div className="text-base text-gray-300">
                <a
                  href="mailto:ceo@saanviinnovation.com"
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  ceo@saanviinnovation.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Useful Links
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className="text-base text-gray-300 hover:text-orange-400 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-base text-gray-300 hover:text-orange-400 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About / Contact CTA */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-base text-gray-300 leading-relaxed mb-6">
              SAANVI INNOVATION delivers innovative digital solutions designed
              to help businesses grow and succeed in the modern digital world.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
            >
              Get in Touch
            </Link>

            {/* Social Media Icons */}
            <div className="mt-6">
              <h4 className="text-base font-semibold text-white mb-3">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 rounded-full ${social.bgColor} flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-base text-gray-300">
              © {currentYear} SAANVI INNOVATION. All Rights Reserved.
            </p>

            {/* Admin Login Button */}
            <Link
              to="/login"
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg"
            >
              <FiLogIn size={16} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
