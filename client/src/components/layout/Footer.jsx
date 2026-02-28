import { useSelector } from "react-redux";
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
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  selectSiteData,
  selectFooterData,
} from "../../features/siteData/siteDataSelectors";
import { getFullImageUrl } from "../../utils/imageUtils";

const usefulLinks = [
  { name: "HOME", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "SERVICES", path: "/services" },
  { name: "PORTFOLIO", path: "/portfolio" },
  { name: "PRICING", path: "/pricing" },
  { name: "CONTACT", path: "/contact" },
];

const serviceLinks = [
  { name: "WEB DESIGN", path: "/services" },
  { name: "WEB DEVELOPMENT", path: "/services" },
  { name: "MOBILE APPS", path: "/services" },
  { name: "DIGITAL MARKETING", path: "/services" },
  { name: "E-COMMERCE", path: "/services" },
];

// Social media icon mapping
const socialIconMap = {
  Facebook: <FiFacebook size={18} />,
  Twitter: <FiTwitter size={18} />,
  LinkedIn: <FiLinkedin size={18} />,
  Instagram: <FiInstagram size={18} />,
  YouTube: <FiYoutube size={18} />,
  WhatsApp: <FaWhatsapp size={18} />,
};

function Footer() {
  const siteData = useSelector(selectSiteData);
  const footerData = useSelector(selectFooterData);

  // Get site info data
  const siteInfo = siteData?.siteinfo || {};

  // Extract data with fallbacks
  const siteName = siteInfo.siteName || "SAANVI";
  const companyName = siteInfo.siteName || "SAANVI INNOVATION";
  const tagline =
    footerData?.tagline ||
    siteInfo.tagline ||
    "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES";
  const useLogo = siteInfo.useLogo || false;
  const logoUrl = siteInfo.logoUrl || "";
  const phone = siteInfo.phone || "+91 7999840475";
  const email = siteInfo.email || "CEO@SAANVIINNOVATION.COM";
  const address =
    siteInfo.address || "21, NEHRU COLONY, THATIPUR\nGWALIOR (M.P)";
  const socialLinks = siteInfo.socialLinks || [];

  const currentYear = new Date().getFullYear();

  // Render logo or text
  const renderLogo = () => {
    if (useLogo && logoUrl) {
      const fullLogoUrl = getFullImageUrl(logoUrl);

      return (
        <div className="flex items-center space-x-2">
          <img
            src={fullLogoUrl}
            alt={companyName}
            className="h-8 w-auto"
            onError={(e) => {
              console.error("Logo failed to load:", fullLogoUrl);
              // Hide the image if it fails to load
              e.target.style.display = "none";
            }}
          />
        </div>
      );
    }

    // Default text logo
    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <div className="w-8 h-8 border-2 border-orange-500 transform rotate-45"></div>
          <div className="absolute inset-0 w-8 h-8 border-2 border-orange-500/50 transform rotate-45 scale-110"></div>
        </div>
        <div>
          <div className="text-lg font-bold text-orange-500 tracking-wider">
            {siteName}
          </div>
        </div>
      </div>
    );
  };

  return (
    <footer className="relative bg-black border-t border-orange-500/20">
      {/* Binary code background */}
      <div className="absolute inset-0 opacity-5 font-mono text-sm text-orange-500 overflow-hidden pointer-events-none">
        <div className="whitespace-nowrap">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i}>
              {Array.from({ length: 300 }, () =>
                Math.random() > 0.5 ? "1" : "0",
              ).join("")}
            </span>
          ))}
        </div>
      </div>

      {/* Top scan line effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-6">
            {/* Logo */}
            {renderLogo()}

            <p className="text-gray-400 text-sm leading-relaxed">{tagline}</p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-orange-500 w-4 h-4 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-400 leading-relaxed">
                  {address.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < address.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-orange-500 w-4 h-4 flex-shrink-0" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-orange-500 w-4 h-4 flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-orange-500 mb-6 tracking-wider">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-sm tracking-wider transition-all duration-300 inline-block ${
                        isActive
                          ? "text-orange-500"
                          : "text-gray-400 hover:text-orange-500 hover:translate-x-1"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm font-bold text-orange-500 mb-6 tracking-wider">
              SERVICES
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-sm text-gray-400 hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-300 tracking-wider"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-sm font-bold text-orange-500 mb-6 tracking-wider">
              CONNECT
            </h3>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="inline-block mb-6 px-6 py-3 bg-orange-500 text-black font-bold text-sm tracking-wider hover:bg-orange-400 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">GET IN TOUCH</span>
              <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>

            {/* Social Media Icons */}
            {socialLinks.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-gray-400 mb-3 tracking-wider">
                  FOLLOW US
                </h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.type}
                      className="w-9 h-9 rounded border border-orange-500/30 bg-orange-500/5 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-black transition-all duration-300 hover:scale-110"
                    >
                      {socialIconMap[social.type] || <FiFacebook size={18} />}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative z-10 border-t border-orange-500/20">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-sm text-gray-400 tracking-wider">
              © {currentYear} {companyName.toUpperCase()}. ALL RIGHTS RESERVED.
            </p>

            <div className="flex items-center gap-4">
              <Link
                to="/terms"
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300 tracking-wider"
              >
                TERMS & CONDITIONS
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                to="/privacy"
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-300 tracking-wider"
              >
                PRIVACY POLICY
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scan line effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </footer>
  );
}

export default Footer;
