import { FiArrowRight, FiMessageCircle } from "react-icons/fi";

function CTASection({
  variant = "default",
  title,
  subtitle,
  buttonText = "Contact Us",
  buttonLink = "/contact",
  image,
  icon: Icon = FiMessageCircle,
}) {
  // Custom solution variant (centered with icon)
  if (variant === "custom") {
    return (
      <div className="relative text-center bg-gradient-to-br from-white to-gray-50 rounded-2xl p-10 md:p-12 border border-gray-200 shadow-xl max-w-4xl mx-auto overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Icon className="text-white" size={36} />
          </div>

          <h3
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {title}
          </h3>

          <p
            className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {subtitle}
          </p>

          <a
            href={buttonLink}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {buttonText}
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    );
  }

  // Default variant (with image)
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200 rounded-2xl shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Image */}
            {image && (
              <div className="h-64 lg:h-auto">
                <img
                  src={image}
                  alt="CTA"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Right - Content */}
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <h2
                className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 uppercase tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {title}
              </h2>

              <p
                className="text-gray-600 mb-8 leading-relaxed max-w-lg"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {subtitle}
              </p>

              <div>
                <a
                  href={buttonLink}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition shadow-lg hover:shadow-xl"
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  {buttonText}
                  <FiArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
