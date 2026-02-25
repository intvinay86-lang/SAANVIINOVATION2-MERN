import {
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiShoppingCart,
  FiCloud,
  FiTrendingUp,
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
} from "react-icons/fi";
import ServiceCard from "../../components/cards/ServiceCard";
import WhyChooseSection from "../../components/sections/WhyChooseSection";
import CTASection from "../../components/sections/CTASection";

// Hero Section Component
function ServiceHero() {
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

// Services Grid Component
function ServicesGrid({ services = [] }) {
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

// Why Choose Section Wrapper
function ServicesWhyChoose() {
  const features = [
    "Experienced & Certified Developers",
    "24/7 Technical Support",
    "Advanced Technology Stack",
    "Client-Centric Approach",
    "Seamless Project Management",
  ];

  return (
    <WhyChooseSection
      variant="image"
      title="Your Success is Our Commitment"
      subtitle="Here's what makes us the right technology partner for your business."
      features={features}
      description="Welcome to SAANVI INNOVATION, where innovation meets reliability. We provide scalable digital solutions tailored to your business needs — from web development to advanced technical systems — delivered with expertise, precision, and long-term vision."
    />
  );
}

// Main Services Component
function Services() {
  const services = [
    {
      icon: <FiGlobe className="w-10 h-10" />,
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies and best practices for optimal performance.",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: <FiSmartphone className="w-10 h-10" />,
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android with seamless user experience.",
      gradient: "from-orange-400 to-orange-500",
    },
    {
      icon: <FiCode className="w-10 h-10" />,
      title: "Software Development",
      description:
        "Enterprise software solutions tailored to your business needs with scalable architecture.",
      gradient: "from-orange-500 to-orange-700",
    },
    {
      icon: <FiShoppingCart className="w-10 h-10" />,
      title: "E-commerce Solutions",
      description:
        "Complete e-commerce platforms with payment integration and inventory management systems.",
      gradient: "from-orange-600 to-orange-500",
    },
    {
      icon: <FiCloud className="w-10 h-10" />,
      title: "Cloud Services",
      description:
        "Cloud infrastructure setup, migration, and management for improved scalability and security.",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: <FiTrendingUp className="w-10 h-10" />,
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies to grow your online presence and reach target audience.",
      gradient: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <>
      <title>
        Our Services - Web Development, Mobile Apps & Digital Solutions | SAANVI
        INNOVATION
      </title>
      <meta
        name="description"
        content="Explore our comprehensive digital services including web development, mobile app development, e-commerce solutions, cloud services, and digital marketing."
      />
      <meta
        name="keywords"
        content="web development services, mobile app development, e-commerce solutions, cloud services, digital marketing, software development"
      />
      <meta property="og:title" content="Our Services - SAANVI INNOVATION" />
      <meta
        property="og:description"
        content="Professional digital services for modern businesses."
      />
      <link rel="canonical" href="https://saanviinnovation.com/services" />

      <div className="bg-white">
        {/* Hero Section */}
        <ServiceHero />

        {/* Why Choose Section */}
        <ServicesWhyChoose />

        {/* Services Grid Section */}
        <ServicesGrid services={services} />

        {/* CTA Section */}
        <CTASection
          title="Ready to Elevate Your Business?"
          subtitle="Partner with experienced professionals to build scalable, modern digital solutions tailored to your business goals."
          image="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
        />
      </div>
    </>
  );
}

export default Services;
