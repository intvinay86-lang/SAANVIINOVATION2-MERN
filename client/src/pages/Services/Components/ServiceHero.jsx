import { FiArrowRight } from "react-icons/fi";

export default function ServiceHero() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content - Bolder Typography */}
          <div className="space-y-8">
            <div>
              <span
                className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] inline-block mb-6"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                Our Services
              </span>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                Dedicated to Your Digital Success
              </h1>
            </div>

            {/* Bolder paragraph */}
            <p
              className="text-gray-900 text-lg md:text-xl leading-relaxed font-medium max-w-xl"
              style={{
                fontFamily: "'Roboto', 'Arial', sans-serif",
                lineHeight: "1.7",
              }}
            >
              We deliver scalable and modern digital solutions tailored to your
              business goals. Partner with experienced professionals committed
              to long-term growth and measurable success.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                Get Started
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-orange-500 transition-all duration-300"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                View Portfolio
              </a>
            </div>
          </div>

          {/* Right Content - Large Clean Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Professional team collaboration"
                className="w-full h-[500px] lg:h-[600px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
