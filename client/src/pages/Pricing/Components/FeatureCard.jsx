function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-200">
      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-orange-600" size={24} />
      </div>
      <h3
        className="text-lg font-bold text-gray-800 mb-2"
        style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
      >
        {title}
      </h3>
      <p
        className="text-sm text-gray-600"
        style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
      >
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
