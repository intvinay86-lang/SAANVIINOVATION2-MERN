import { FiCheck } from "react-icons/fi";
import IconCard from "../cards/IconCard";

function WhyChooseSection({
  variant = "default",
  title = "Why Choose Us?",
  subtitle,
  features = [],
  image,
  description,
}) {
  // Image variant (Services page style)
  if (variant === "image") {
    return (
      <section className="py-24 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left - Large Clean Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={
                    image ||
                    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt="Professional workspace"
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right - Content with bolder typography */}
            <div className="space-y-8">
              <div>
                <span className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] inline-block mb-6">
                  Why Choose Us
                </span>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  {title}
                </h2>

                {subtitle && (
                  <p
                    className="text-gray-900 text-lg md:text-xl leading-relaxed font-medium"
                    style={{
                      fontFamily: "'Roboto', 'Arial', sans-serif",
                      lineHeight: "1.7",
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Bolder feature list */}
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                      <FiCheck className="text-white" size={16} />
                    </div>
                    <span
                      className="text-gray-900 text-base md:text-lg font-medium"
                      style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description with better readability */}
              {description && (
                <div className="pt-4">
                  <p
                    className="text-gray-800 text-base md:text-lg leading-relaxed font-normal"
                    style={{
                      fontFamily: "'Roboto', 'Arial', sans-serif",
                      lineHeight: "1.7",
                    }}
                  >
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Cards variant (About page style)
  if (variant === "cards") {
    return (
      <div className="mb-20">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full inline-block mb-6">
            Why Choose Us
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>

          {subtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-8 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:shadow-xl"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-orange-600">{item.icon}</div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600">{item.description}</p>

                {/* Bottom Line Accent */}
                <div className="mt-6 w-12 h-1 bg-orange-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default variant (Pricing page style - simple feature cards)
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 uppercase tracking-wide">
          {title}
        </h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <IconCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

export default WhyChooseSection;
