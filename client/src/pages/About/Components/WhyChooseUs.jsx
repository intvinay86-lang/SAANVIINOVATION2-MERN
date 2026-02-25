import { FiUsers, FiAward, FiTrendingUp, FiHeart } from "react-icons/fi";
import WhyChooseSection from "../../../components/sections/WhyChooseSection";

export default function WhyChooseUs() {
  const whyChooseUs = [
    {
      title: "Expert Development Team",
      description: "Skilled professionals with years of industry experience",
      icon: <FiUsers size={28} />,
    },
    {
      title: "Modern Technology Stack",
      description: "Using cutting-edge tools and frameworks",
      icon: <FiTrendingUp size={28} />,
    },
    {
      title: "Scalable Solutions",
      description: "Built to grow with your business needs",
      icon: <FiAward size={28} />,
    },
    {
      title: "24/7 Support",
      description: "Always available to assist you",
      icon: <FiHeart size={28} />,
    },
  ];

  return (
    <WhyChooseSection
      variant="cards"
      title={
        <>
          We Combine Expertise, Innovation,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            and Dedication
          </span>
        </>
      }
      subtitle="To deliver exceptional results for your business"
      features={whyChooseUs}
    />
  );
}
