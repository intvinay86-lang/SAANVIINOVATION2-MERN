import { FiAward, FiZap, FiHeadphones } from "react-icons/fi";
import WhyChooseSection from "../../../components/sections/WhyChooseSection";

export default function PricingWhyChoose() {
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
    <WhyChooseSection
      title="Why Choose Us?"
      subtitle="All plans include these amazing features"
      features={features}
    />
  );
}
