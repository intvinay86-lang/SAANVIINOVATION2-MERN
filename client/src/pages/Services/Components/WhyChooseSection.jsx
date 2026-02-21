import { FiCheck } from "react-icons/fi";

function WhyChooseSection() {
  const features = [
    "Experienced & Certified Developers",
    "24/7 Technical Support",
    "Advanced Technology Stack",
    "Client-Centric Approach",
    "Seamless Project Management",
  ];

  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Large Clean Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                alt="Professional workspace"
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right - Content with bolder typography */}
          <div className="space-y-8">
            <div>
              <span
                className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] inline-block mb-6"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                Why Choose Us
              </span>

              <h2
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                Your Success is Our Commitment
              </h2>

              <p
                className="text-gray-900 text-lg md:text-xl leading-relaxed font-medium"
                style={{
                  fontFamily: "'Roboto', 'Arial', sans-serif",
                  lineHeight: "1.7",
                }}
              >
                Here's what makes us the right technology partner for your
                business.
              </p>
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
            <div className="pt-4">
              <p
                className="text-gray-800 text-base md:text-lg leading-relaxed font-normal"
                style={{
                  fontFamily: "'Roboto', 'Arial', sans-serif",
                  lineHeight: "1.7",
                }}
              >
                Welcome to SAANVI INNOVATION, where innovation meets
                reliability. We provide scalable digital solutions tailored to
                your business needs — from web development to advanced technical
                systems — delivered with expertise, precision, and long-term
                vision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
