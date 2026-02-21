import {
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiShoppingCart,
  FiCloud,
  FiTrendingUp,
} from "react-icons/fi";

function ServicesSection() {
  const services = [
    {
      icon: <FiGlobe className="w-7 h-7" />,
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies and best practices for optimal performance.",
    },
    {
      icon: <FiSmartphone className="w-7 h-7" />,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications with seamless user experience.",
    },
    {
      icon: <FiCode className="w-7 h-7" />,
      title: "Software Development",
      description:
        "Enterprise software solutions with scalable architecture and robust functionality.",
    },
    {
      icon: <FiShoppingCart className="w-7 h-7" />,
      title: "E-commerce Solutions",
      description:
        "Complete e-commerce platforms with payment integration and inventory management.",
    },
    {
      icon: <FiCloud className="w-7 h-7" />,
      title: "Cloud Services",
      description:
        "Cloud infrastructure setup and management for improved scalability and security.",
    },
    {
      icon: <FiTrendingUp className="w-7 h-7" />,
      title: "Digital Marketing",
      description:
        "Comprehensive strategies to grow your online presence and reach target audience.",
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="text-orange-500 font-semibold text-sm uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full inline-block mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            What We Offer
          </span>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Services
            </span>
          </h2>

          <p
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Comprehensive digital solutions to help your business thrive
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl p-8 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:shadow-xl"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex w-14 h-14 bg-orange-100 rounded-lg items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
