import { FiAward } from "react-icons/fi";

function OurStory() {
  return (
    <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center mb-28">
      {/* Left - Content with bolder typography */}
      <div className="space-y-8">
        <div>
          <span
            className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] inline-block mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Our Story
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Transforming Businesses Through Innovation
          </h2>
        </div>

        {/* Bolder, more readable paragraphs */}
        <div className="space-y-6">
          <p
            className="text-gray-900 text-lg md:text-xl leading-relaxed font-medium"
            style={{
              fontFamily: "'Roboto', 'Arial', sans-serif",
              lineHeight: "1.7",
            }}
          >
            SAANVI INNOVATION is a leading software and web development company
            established with a vision to transform businesses through innovative
            digital solutions.
          </p>

          <p
            className="text-gray-800 text-base md:text-lg leading-relaxed font-normal"
            style={{
              fontFamily: "'Roboto', 'Arial', sans-serif",
              lineHeight: "1.7",
            }}
          >
            We specialize in creating scalable, modern applications that help
            businesses grow and succeed in the digital landscape.
          </p>
        </div>

        {/* Quality Badge */}
        <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-xl">
          <div className="w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
            <FiAward className="text-white" size={28} />
          </div>
          <div>
            <p
              className="font-bold text-gray-900 text-lg mb-1"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              Quality First
            </p>
            <p
              className="text-sm text-gray-700 font-medium"
              style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}
            >
              Excellence in every project we deliver
            </p>
          </div>
        </div>
      </div>

      {/* Right - Large Clean Image */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Digital innovation"
            loading="lazy"
            className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
}

export default OurStory;
