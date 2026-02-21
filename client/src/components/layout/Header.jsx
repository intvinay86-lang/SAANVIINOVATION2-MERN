import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiMail,
  FiPhone,
  FiLogIn,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  {
    icon: <FiFacebook size={16} />,
    url: "#",
    label: "Facebook",
    bgColor: "bg-[#1877F2] hover:bg-[#0C63D4]",
  },
  {
    icon: <FiTwitter size={16} />,
    url: "#",
    label: "Twitter",
    bgColor: "bg-[#1DA1F2] hover:bg-[#0C8BD9]",
  },
  {
    icon: <FiLinkedin size={16} />,
    url: "#",
    label: "LinkedIn",
    bgColor: "bg-[#0A66C2] hover:bg-[#004182]",
  },
  {
    icon: <FiInstagram size={16} />,
    url: "#",
    label: "Instagram",
    bgColor: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  },
  {
    icon: <FiYoutube size={16} />,
    url: "#",
    label: "YouTube",
    bgColor: "bg-[#FF0000] hover:bg-[#CC0000]",
  },
  {
    icon: <FaWhatsapp size={16} />,
    url: "#",
    label: "WhatsApp",
    bgColor: "bg-[#25D366] hover:bg-[#1DA851]",
  },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10">
      {/* Top Bar - Hidden on Mobile */}
      <div className="relative bg-black/60 backdrop-blur-sm overflow-hidden hidden md:block">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="flex flex-wrap justify-between items-center py-3 gap-3">
            {/* Left: Contact Info */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 lg:gap-5 text-sm md:text-base text-gray-300">
              <a
                href="tel:+917999840475"
                className="flex items-center gap-2"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                <div className="w-7 h-7 rounded-full bg-[#ff8c42] flex items-center justify-center">
                  <FiPhone size={14} className="text-white flex-shrink-0" />
                </div>
                <span>+91 7999840475</span>
              </a>

              <span className="text-gray-500">|</span>

              <a
                href="tel:+918305233223"
                className="text-gray-300"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                <span>+91 8305233223</span>
              </a>
              <a
                href="mailto:ceo@saanviinnovation.com"
                className="hidden lg:flex items-center gap-2"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                <div className="w-7 h-7 rounded-full bg-[#ff8c42] flex items-center justify-center">
                  <FiMail size={14} className="text-white flex-shrink-0" />
                </div>
                <span>ceo@saanviinnovation.com</span>
              </a>
            </div>

            {/* Right: Social Media Icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-[#ff8c42] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="py-3 md:py-4 bg-transparent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-bold">
              <NavLink
                to="/"
                className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-orange-700 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,140,66,0.5)]"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                <span>SAANVI INNOVATION</span>
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative transition-all duration-300 hover:text-orange-500 font-bold tracking-wider ${
                      isActive ? "text-orange-600" : "text-gray-200"
                    } after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-0.5 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full ${
                      isActive ? "after:w-full" : ""
                    }`
                  }
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-200 hover:text-orange-500 transition-all duration-300"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-[600px] opacity-100 mt-4"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="py-4 space-y-4 border-t border-white/20 bg-black/40 backdrop-blur-sm rounded-lg px-4">
              {/* Mobile Contact Info */}
              <div className="space-y-2 pb-4 border-b border-white/20">
                <a
                  href="tel:+917999840475"
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-orange-500"
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  <FiPhone size={14} />
                  <span>+91 7999840475</span>
                </a>
                <a
                  href="tel:+918305233223"
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-orange-500"
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  <FiPhone size={14} />
                  <span>+91 8305233223</span>
                </a>
                <a
                  href="mailto:ceo@saanviinnovation.com"
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-orange-500"
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  <FiMail size={14} />
                  <span>ceo@saanviinnovation.com</span>
                </a>
              </div>

              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 transition-all duration-300 hover:text-orange-500 font-bold tracking-wider ${
                      isActive
                        ? "text-orange-600 font-extrabold"
                        : "text-gray-200"
                    }`
                  }
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-3 pt-4 border-t border-white/20">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-9 h-9 rounded-full ${social.bgColor} flex items-center justify-center text-white transition-all duration-300 shadow-md`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
