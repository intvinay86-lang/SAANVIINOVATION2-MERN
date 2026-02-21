function ServiceCard({ service, index }) {
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
            className={`inline-flex w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-lg items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-md`}
          >
            <div className="text-white">{service.icon}</div>
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
