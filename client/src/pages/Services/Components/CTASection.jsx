import { FiArrowRight } from "react-icons/fi";

function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-br from-white to-orange-50 border-2 border-orange-200 rounded-2xl shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)] overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left - Image */}
            <div className="h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
                alt="Digital solutions"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right - Content */}
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <h2
                className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 uppercase tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                Ready to Elevate Your Business?
              </h2>

              <p
                className="text-gray-600 mb-8 leading-relaxed max-w-lg"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                Partner with experienced professionals to build scalable, modern
                digital solutions tailored to your business goals.
              </p>

              <div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition shadow-lg hover:shadow-xl"
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  Contact Us
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
