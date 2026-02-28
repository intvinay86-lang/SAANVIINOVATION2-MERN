import { FiCheck, FiStar } from "react-icons/fi";

function PricingCard({ plan }) {
  // Ensure features is always an array
  const features = Array.isArray(plan.features)
    ? plan.features
    : typeof plan.features === "string"
      ? plan.features.split("\n").filter((f) => f.trim())
      : [];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col ${
        plan.highlighted
          ? "bg-white border-2 border-orange-500 shadow-2xl transform lg:scale-105"
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
      <div className="p-6 sm:p-8 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          {plan.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
          {plan.description}
        </p>

        {/* Price */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-baseline mb-2">
            <span className="text-base sm:text-lg text-gray-600">₹</span>
            <span className="text-4xl sm:text-5xl font-bold text-gray-900 ml-1">
              {plan.price}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500">{plan.period}</p>
        </div>

        {/* CTA Button */}
        <a
          href="/contact"
          className={`block w-full text-center py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 mb-6 sm:mb-8 text-sm sm:text-base ${
            plan.highlighted
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              : "bg-gray-100 text-gray-900 hover:bg-orange-500 hover:text-white"
          }`}
        >
          Get Started
        </a>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6 sm:mb-8"></div>

        {/* Subtitle */}
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 sm:mb-6">
          {plan.subtitle}
        </p>

        {/* Features */}
        <ul className="space-y-3 sm:space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2 sm:mr-3 mt-0.5">
                <FiCheck className="text-orange-600" size={12} />
              </div>
              <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
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
