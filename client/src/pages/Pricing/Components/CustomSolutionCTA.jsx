import { FiMessageCircle, FiArrowRight } from "react-icons/fi";

function CustomSolutionCTA() {
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
          <FiMessageCircle className="text-white" size={36} />
        </div>

        <h3
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          Need a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            Custom Solution?
          </span>
        </h3>

        <p
          className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          We can create a tailored package that perfectly fits your specific
          requirements and budget
        </p>

        <a
          href="/contact"
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          Contact Us for Custom Quote
          <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}

export default CustomSolutionCTA;
