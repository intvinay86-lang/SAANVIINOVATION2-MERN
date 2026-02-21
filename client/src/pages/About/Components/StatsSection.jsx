import { FiUsers, FiAward, FiTrendingUp, FiHeart } from "react-icons/fi";

function StatsSection() {
  const stats = [
    { icon: <FiAward size={32} />, value: "50+", label: "Projects Completed" },
    { icon: <FiHeart size={32} />, value: "30+", label: "Happy Clients" },
    {
      icon: <FiTrendingUp size={32} />,
      value: "5+",
      label: "Years Experience",
    },
    { icon: <FiUsers size={32} />, value: "15+", label: "Team Members" },
  ];

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl overflow-hidden">
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
        <div className="text-center mb-12">
          <span
            className="text-orange-500 font-semibold text-sm uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full inline-block mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Our Achievements
          </span>

          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Numbers That Speak for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Themselves
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-orange-500 shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="text-orange-600">{stat.icon}</div>
                </div>
              </div>

              {/* Value */}
              <div
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-2"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                className="text-gray-600 text-sm font-medium"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {stat.label}
              </div>

              {/* Bottom Line Accent */}
              <div className="mt-4 mx-auto w-12 h-1 bg-orange-500 rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
