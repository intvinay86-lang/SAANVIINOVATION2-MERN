import OurStory from "./Components/OurStory";
import WhyChooseUs from "./Components/WhyChooseUs";
import CoreValues from "./Components/CoreValues";
import StatsSection from "./Components/StatsSection";

function About() {
  return (
    <>
      <title>
        About Us - SAANVI INNOVATION | Leading Software Development Company
      </title>
      <meta
        name="description"
        content="Learn about SAANVI INNOVATION, a leading software and web development company in Gwalior. We deliver scalable, modern applications for business growth."
      />
      <meta
        name="keywords"
        content="about saanvi innovation, software company gwalior, web development company, IT services"
      />
      <meta property="og:title" content="About SAANVI INNOVATION" />
      <meta
        property="og:description"
        content="Leading software and web development company delivering exceptional digital solutions."
      />
      <link rel="canonical" href="https://saanviinnovation.com/about" />

      <div className="bg-white">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                ABOUT <span className="text-orange-500">US</span>
              </h1>
              <p
                className="text-gray-600 text-sm md:text-base tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                TRANSFORMING BUSINESSES THROUGH INNOVATIVE DIGITAL SOLUTIONS AND
                CUTTING-EDGE TECHNOLOGY
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8">
          <OurStory />
          <WhyChooseUs />
          <CoreValues />
          <StatsSection />
        </div>
      </div>
    </>
  );
}

export default About;
