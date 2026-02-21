import { FiCheck, FiStar } from "react-icons/fi";

function PricingCard({ plan }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
        plan.highlighted
          ? "bg-white border-2 border-orange-500 shadow-2xl transform md:scale-105"
          : "bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:border-orange-300"
      }`}
    >
      {/* Badge for highlighted plan */}
      {plan.badge && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl flex items-center gap-1 shadow-lg">
          <FiStar size={12} />
          {plan.badge}
        </div>
      )}

      {/* Card Content */}
      <div className="p-8">
        {/* Title */}
        <h3
          className="text-2xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {plan.title}
        </h3>

        <p
          className="text-sm text-gray-600 mb-8"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {plan.description}
        </p>

        {/* Price */}
        <div className="mb-8">
          <div className="flex items-baseline mb-2">
            <span
              className="text-lg text-gray-600"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              ₹
            </span>
            <span
              className="text-5xl font-bold text-gray-900 ml-1"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              {plan.price}
            </span>
          </div>
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {plan.period}
          </p>
        </div>

        {/* CTA Button */}
        <a
          href="/contact"
          className={`block w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 mb-8 ${
            plan.highlighted
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              : "bg-gray-100 text-gray-900 hover:bg-orange-500 hover:text-white"
          }`}
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          Get Started
        </a>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-8"></div>

        {/* Subtitle */}
        <p
          className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {plan.subtitle}
        </p>

        {/* Features */}
        <ul className="space-y-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-3 mt-0.5">
                <FiCheck className="text-orange-600" size={14} />
              </div>
              <span
                className="text-sm text-gray-700"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PricingCard;
