import { FiUsers, FiAward, FiTrendingUp, FiHeart } from "react-icons/fi";

function WhyChooseUs() {
  const whyChooseUs = [
    {
      title: "Expert Development Team",
      description: "Skilled professionals with years of industry experience",
      icon: <FiUsers size={28} />,
    },
    {
      title: "Modern Technology Stack",
      description: "Using cutting-edge tools and frameworks",
      icon: <FiTrendingUp size={28} />,
    },
    {
      title: "Scalable Solutions",
      description: "Built to grow with your business needs",
      icon: <FiAward size={28} />,
    },
    {
      title: "24/7 Support",
      description: "Always available to assist you",
      icon: <FiHeart size={28} />,
    },
  ];

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <span
          className="text-orange-500 font-semibold text-sm uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full inline-block mb-6"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          Why Choose Us
        </span>

        <h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          We Combine Expertise, Innovation,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            and Dedication
          </span>
        </h2>

        <p
          className="text-gray-600 max-w-2xl mx-auto text-lg"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          To deliver exceptional results for your business
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {whyChooseUs.map((item, index) => (
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

              <h3
                className="text-lg font-bold text-gray-900 mb-3"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {item.title}
              </h3>

              <p
                className="text-sm text-gray-600"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {item.description}
              </p>

              {/* Bottom Line Accent */}
              <div className="mt-6 w-12 h-1 bg-orange-500 rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyChooseUs;
