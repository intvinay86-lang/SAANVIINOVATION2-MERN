import ServiceCard from "./ServiceCard";

export default function ServicesCardGrid({ services = [] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 uppercase tracking-wide"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Our Services
          </h2>

          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded"></div>

          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Comprehensive digital solutions tailored to your business needs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
