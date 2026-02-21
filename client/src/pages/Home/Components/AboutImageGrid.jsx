function AboutImageGrid() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content - Bolder, More Readable Typography */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span
                className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] inline-block mb-6"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                About Us
              </span>

              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                SAANVI INNOVATION
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
                Where we elevate digital experiences in web development, mobile
                applications, and enterprise solutions across India.
              </p>

              <p
                className="text-gray-800 text-base md:text-lg leading-relaxed font-normal"
                style={{
                  fontFamily: "'Roboto', 'Arial', sans-serif",
                  lineHeight: "1.7",
                }}
              >
                Our mission is to deliver innovative technology solutions that
                energize your business and enhance your digital presence.
              </p>

              <p
                className="text-gray-800 text-base md:text-lg leading-relaxed font-normal"
                style={{
                  fontFamily: "'Roboto', 'Arial', sans-serif",
                  lineHeight: "1.7",
                }}
              >
                We have a network of satisfied clients across multiple states
                including Madhya Pradesh, Maharashtra, and Gujarat.
              </p>
            </div>
          </div>

          {/* Right: Large Image Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image - Top */}
              <div className="col-span-2 overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Team Collaboration"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Left */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern Workspace"
                  className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Right */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Business Meeting"
                  className="w-full h-[250px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutImageGrid;
