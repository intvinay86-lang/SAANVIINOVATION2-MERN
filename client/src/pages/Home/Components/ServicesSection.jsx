import { useSelector } from "react-redux";
import ServiceCard from "../../../components/cards/ServiceCard";
import { selectSiteData } from "../../../features/siteData/siteDataSelectors";

function ServicesSection() {
  const siteData = useSelector(selectSiteData);

  const servicesData = siteData?.services || [];

  // Default services if none are configured
  const defaultServices = [
    {
      id: 1,
      icon: "FiGlobe",
      title: "Web Development",
      description:
        "Custom web applications built with modern technologies and best practices for optimal performance.",
    },
    {
      id: 2,
      icon: "FiSmartphone",
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications with seamless user experience.",
    },
    {
      id: 3,
      icon: "FiCode",
      title: "Software Development",
      description:
        "Enterprise software solutions with scalable architecture and robust functionality.",
    },
    {
      id: 4,
      icon: "FiShoppingCart",
      title: "E-commerce Solutions",
      description:
        "Complete e-commerce platforms with payment integration and inventory management.",
    },
    {
      id: 5,
      icon: "FiCloud",
      title: "Cloud Services",
      description:
        "Cloud infrastructure setup and management for improved scalability and security.",
    },
    {
      id: 6,
      icon: "FiTrendingUp",
      title: "Digital Marketing",
      description:
        "Comprehensive strategies to grow your online presence and reach target audience.",
    },
  ];

  const services = servicesData.length > 0 ? servicesData : defaultServices;

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full inline-block mb-6">
            What We Offer
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Services
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive digital solutions to help your business thrive
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id || index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
