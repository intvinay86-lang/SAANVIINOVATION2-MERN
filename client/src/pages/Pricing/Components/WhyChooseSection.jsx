import { useSelector } from "react-redux";
import { FiAward, FiZap, FiHeadphones } from "react-icons/fi";
import WhyChooseSection from "../../../components/sections/WhyChooseSection";
import { selectSiteData } from "../../../features/siteData/siteDataSelectors";

export default function PricingWhyChoose() {
  const siteData = useSelector(selectSiteData);
  const pricingSettings = siteData?.pricingSettings || {};

  const defaultFeatures = [
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

  const iconMap = {
    "Quality Assured": FiAward,
    "Fast Delivery": FiZap,
    "24/7 Support": FiHeadphones,
  };

  const whyChooseFeatures =
    pricingSettings.whyChooseFeatures || defaultFeatures;

  const features = whyChooseFeatures.map((feature) => ({
    icon: iconMap[feature.title] || FiAward,
    title: feature.title,
    description: feature.description,
  }));

  const title = pricingSettings.whyChooseTitle || "Why Choose Us?";
  const subtitle =
    pricingSettings.whyChooseSubtitle ||
    "All plans include these amazing features";

  return (
    <WhyChooseSection title={title} subtitle={subtitle} features={features} />
  );
}
