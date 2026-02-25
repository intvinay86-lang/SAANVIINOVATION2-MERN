import React from "react";
import {
  FiGlobe,
  FiSmartphone,
  FiCode,
  FiShoppingCart,
  FiCloud,
  FiTrendingUp,
  FiDatabase,
  FiLayers,
  FiSettings,
  FiZap,
  FiShield,
  FiCpu,
} from "react-icons/fi";

// Icon mapping
const iconMap = {
  FiGlobe,
  FiSmartphone,
  FiCode,
  FiShoppingCart,
  FiCloud,
  FiTrendingUp,
  FiDatabase,
  FiLayers,
  FiSettings,
  FiZap,
  FiShield,
  FiCpu,
};

function ServiceCard({ service, index = 0 }) {
  // Render icon from string name or React element
  const renderIcon = () => {
    // If icon is a string (icon name), get the component from iconMap
    if (typeof service.icon === "string") {
      const IconComponent = iconMap[service.icon] || FiGlobe;
      return <IconComponent className="w-7 h-7" style={{ color: "inherit" }} />;
    }

    // If icon is already a React element
    if (React.isValidElement(service.icon)) {
      const iconClassName = service.icon.props.className || "w-7 h-7";
      return React.cloneElement(service.icon, {
        className: iconClassName,
        style: { color: "inherit" },
      });
    }

    // Fallback to Globe icon
    return <FiGlobe className="w-7 h-7" style={{ color: "inherit" }} />;
  };

  return (
    <div
      className="group relative bg-white rounded-xl p-8 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:shadow-xl"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6">
          <div
            className={`inline-flex w-14 h-14 ${service.gradient ? `bg-gradient-to-br ${service.gradient}` : "bg-gradient-to-br from-orange-500 to-orange-600"} rounded-lg items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md text-white`}
          >
            {renderIcon()}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className="text-gray-600 leading-relaxed text-sm"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {service.description}
        </p>

        {/* Bottom Line Accent */}
        <div className="mt-6 w-12 h-1 bg-orange-500 rounded-full group-hover:w-full transition-all duration-500"></div>
      </div>
    </div>
  );
}

export default ServiceCard;
