import { useSelector } from "react-redux";
import {
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiShoppingCart,
  FiCloud,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import ServiceCard from "../../components/cards/ServiceCard";
import WhyChooseSection from "../../components/sections/WhyChooseSection";
import CTASection from "../../components/sections/CTASection";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";
import { getFullImageUrl } from "../../utils/imageUtils";

// Hero Section Component
function ServiceHero({ settings }) {
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
                {settings.heroTitle}
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
              {settings.heroDescription}
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
                src={settings.heroImage}
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
function ServicesGrid({ services = [], settings }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 uppercase tracking-wide"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {settings.servicesGridTitle}
          </h2>

          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6 rounded"></div>

          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {settings.servicesGridSubtitle}
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
function ServicesWhyChoose({ settings }) {
  const features = [
    settings.whyChooseFeature1,
    settings.whyChooseFeature2,
    settings.whyChooseFeature3,
    settings.whyChooseFeature4,
    settings.whyChooseFeature5,
  ];

  return (
    <WhyChooseSection
      variant="image"
      title={settings.whyChooseTitle}
      subtitle={settings.whyChooseSubtitle}
      features={features}
      description={settings.whyChooseDescription}
      image={settings.whyChooseImage}
    />
  );
}

// Main Services Component
function Services() {
  const siteData = useSelector(selectSiteData);

  // Get services settings with fallbacks
  const servicesSettings = siteData?.servicesSettings || {};
  const servicesData = siteData?.services || [];

  const settings = {
    heroTitle:
      servicesSettings.heroTitle || "Dedicated to Your Digital Success",
    heroDescription:
      servicesSettings.heroDescription ||
      "We deliver scalable and modern digital solutions tailored to your business goals. Partner with experienced professionals committed to long-term growth and measurable success.",
    heroImage: servicesSettings.heroImage
      ? getFullImageUrl(servicesSettings.heroImage)
      : "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    servicesGridTitle: servicesSettings.servicesGridTitle || "Our Services",
    servicesGridSubtitle:
      servicesSettings.servicesGridSubtitle ||
      "Comprehensive digital solutions tailored to your business needs.",
    whyChooseTitle:
      servicesSettings.whyChooseTitle || "Your Success is Our Commitment",
    whyChooseSubtitle:
      servicesSettings.whyChooseSubtitle ||
      "Here's what makes us the right technology partner for your business.",
    whyChooseDescription:
      servicesSettings.whyChooseDescription ||
      "Welcome to SAANVI INNOVATION, where innovation meets reliability. We provide scalable digital solutions tailored to your business needs — from web development to advanced technical systems — delivered with expertise, precision, and long-term vision.",
    whyChooseFeature1:
      servicesSettings.whyChooseFeature1 ||
      "Experienced & Certified Developers",
    whyChooseFeature2:
      servicesSettings.whyChooseFeature2 || "24/7 Technical Support",
    whyChooseFeature3:
      servicesSettings.whyChooseFeature3 || "Advanced Technology Stack",
    whyChooseFeature4:
      servicesSettings.whyChooseFeature4 || "Client-Centric Approach",
    whyChooseFeature5:
      servicesSettings.whyChooseFeature5 || "Seamless Project Management",
    whyChooseImage: servicesSettings.whyChooseImage
      ? getFullImageUrl(servicesSettings.whyChooseImage)
      : "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ctaTitle: servicesSettings.ctaTitle || "Ready to Elevate Your Business?",
    ctaSubtitle:
      servicesSettings.ctaSubtitle ||
      "Partner with experienced professionals to build scalable, modern digital solutions tailored to your business goals.",
    ctaImage: servicesSettings.ctaImage
      ? getFullImageUrl(servicesSettings.ctaImage)
      : "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
  };

  // Default services if none are configured
  const defaultServices = [
    {
      id: 1,
      icon: "FiGlobe",
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies and best practices for optimal performance.",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: 2,
      icon: "FiSmartphone",
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android with seamless user experience.",
      gradient: "from-orange-400 to-orange-500",
    },
    {
      id: 3,
      icon: "FiCode",
      title: "Software Development",
      description:
        "Enterprise software solutions tailored to your business needs with scalable architecture.",
      gradient: "from-orange-500 to-orange-700",
    },
    {
      id: 4,
      icon: "FiShoppingCart",
      title: "E-commerce Solutions",
      description:
        "Complete e-commerce platforms with payment integration and inventory management systems.",
      gradient: "from-orange-600 to-orange-500",
    },
    {
      id: 5,
      icon: "FiCloud",
      title: "Cloud Services",
      description:
        "Cloud infrastructure setup, migration, and management for improved scalability and security.",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: 6,
      icon: "FiTrendingUp",
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies to grow your online presence and reach target audience.",
      gradient: "from-orange-400 to-orange-600",
    },
  ];

  const services = servicesData.length > 0 ? servicesData : defaultServices;

  return (
    <>
      <title>Our Services</title>
      <meta
        name="description"
        content="Explore our comprehensive digital services including web development, mobile app development, e-commerce solutions, cloud services, and digital marketing."
      />
      <meta
        name="keywords"
        content="web development services, mobile app development, e-commerce solutions, cloud services, digital marketing, software development"
      />
      <meta property="og:title" content="Our Services" />
      <meta
        property="og:description"
        content="Professional digital services for modern businesses."
      />
      <link rel="canonical" href="https://saanviinnovation.com/services" />

      <div className="bg-white">
        {/* Hero Section */}
        <ServiceHero settings={settings} />

        {/* Why Choose Section */}
        <ServicesWhyChoose settings={settings} />

        {/* Services Grid Section */}
        <ServicesGrid services={services} settings={settings} />

        {/* CTA Section */}
        <CTASection
          title={settings.ctaTitle}
          subtitle={settings.ctaSubtitle}
          image={settings.ctaImage}
        />
      </div>
    </>
  );
}

export default Services;
