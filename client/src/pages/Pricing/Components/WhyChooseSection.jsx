import { FiAward, FiZap, FiHeadphones } from "react-icons/fi";
import FeatureCard from "./FeatureCard";

function WhyChooseSection() {
  const features = [
    {
      icon: FiAward,
      title: "Quality Assured",
      description:
        "Professional design and development with attention to detail",
    },
    {
      icon: FiZap,
      title: "Fast Delivery",
      description: "Quick turnaround time without compromising on quality",
    },
    {
      icon: FiHeadphones,
      title: "24/7 Support",
      description: "Dedicated support team ready to help you anytime",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold text-gray-800 mb-3 uppercase tracking-wide"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          Why Choose Us?
        </h2>
        <p
          className="text-gray-600"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          All plans include these amazing features
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}

export default WhyChooseSection;
