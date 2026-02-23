import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "SERVICES", path: "/services" },
  { name: "PORTFOLIO", path: "/portfolio" },
  { name: "PRICING", path: "/pricing" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-orange-500/20">
      {/* Binary code background */}
      <div className="absolute inset-0 opacity-5 font-mono text-xs text-orange-500 overflow-hidden pointer-events-none">
        <div className="whitespace-nowrap">
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i}>
              {Array.from({ length: 300 }, () =>
                Math.random() > 0.5 ? "1" : "0",
              ).join("")}
            </span>
          ))}
        </div>
      </div>

      <nav className="relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2 group">
              <div className="flex items-center">
                {/* Logo Icon */}
                <div className="relative">
                  <div className="w-10 h-10 border-2 border-orange-500 transform rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
                  <div className="absolute inset-0 w-10 h-10 border-2 border-orange-500/50 transform rotate-45 scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                </div>

                {/* Logo Text */}
                <div className="ml-3">
                  <div
                    className="text-xl md:text-2xl font-bold text-orange-500 tracking-wider"
                    style={{
                      fontFamily: "'Orbitron', 'Courier New', monospace",
                    }}
                  >
                    SAANVI
                  </div>
                  <div
                    className="text-[10px] text-gray-400 tracking-widest -mt-1"
                    style={{
                      fontFamily: "'Orbitron', 'Courier New', monospace",
                    }}
                  >
                    INNOVATION
                  </div>
                </div>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm tracking-wider transition-all duration-300 ${
                      isActive
                        ? "text-orange-500"
                        : "text-gray-300 hover:text-orange-500"
                    } group`
                  }
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{item.name}</span>
                      {/* Animated underline */}
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      ></span>
                      {/* Hover background */}
                      <span className="absolute inset-0 bg-orange-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-orange-500 hover:text-orange-400 transition-colors duration-300 relative z-10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="py-6 space-y-1 border-t border-orange-500/20">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm tracking-wider transition-all duration-300 border-l-2 ${
                      isActive
                        ? "text-orange-500 border-orange-500 bg-orange-500/10"
                        : "text-gray-300 border-transparent hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/5"
                    }`
                  }
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Scan line effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </header>
  );
}

export default Header;
