import {
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiShoppingCart,
  FiCloud,
  FiTrendingUp,
} from "react-icons/fi";
import ServiceHero from "./Components/ServiceHero";
import WhyChooseSection from "./Components/WhyChooseSection";
import TeamSection from "./Components/TeamSection";
import CTASection from "./Components/CTASection";
import ServicesGrid from "./Components/ServicesCardGrid";

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
        <WhyChooseSection />

        {/* Services Grid Section */}
        <ServicesGrid services={services} />

        {/* CTA Section */}
        <CTASection />
      </div>
    </>
  );
}

export default Services;
