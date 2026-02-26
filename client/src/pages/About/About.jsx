import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiAward,
  FiCheck,
  FiUsers,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";
import WhyChooseSection from "../../components/sections/WhyChooseSection";
import { getMainSiteData } from "../../features/siteData/siteDataSlice";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";
import { getFullImageUrl } from "../../utils/imageUtils";

// Our Story Component
function OurStory({ settings }) {
  return (
    <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center mb-28">
      {/* Left - Content with bolder typography */}
      <div className="space-y-8">
        <div>
          <span
            className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] inline-block mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Our Story
          </span>

          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {settings.storyTitle}
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
            {settings.storyParagraph1}
          </p>

          <p
            className="text-gray-800 text-base md:text-lg leading-relaxed font-normal"
            style={{
              fontFamily: "'Roboto', 'Arial', sans-serif",
              lineHeight: "1.7",
            }}
          >
            {settings.storyParagraph2}
          </p>
        </div>

        {/* Quality Badge */}
        <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-xl">
          <div className="w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
            <FiAward className="text-white" size={28} />
          </div>
          <div>
            <p
              className="font-bold text-gray-900 text-lg mb-1"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              {settings.qualityBadgeTitle}
            </p>
            <p
              className="text-sm text-gray-700 font-medium"
              style={{ fontFamily: "'Roboto', 'Arial', sans-serif" }}
            >
              {settings.qualityBadgeText}
            </p>
          </div>
        </div>
      </div>

      {/* Right - Large Clean Image */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <img
            src={settings.storyImage}
            alt="Digital innovation"
            loading="lazy"
            className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
    </div>
  );
}

// Why Choose Us Component
function WhyChooseUs() {
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

// Core Values Component
function CoreValues({ settings }) {
  const values = [
    {
      title: "Innovation",
      description: "Constantly pushing boundaries with creative solutions",
    },
    {
      title: "Quality",
      description: "Delivering excellence in every line of code",
    },
    {
      title: "Integrity",
      description: "Building trust through transparency and honesty",
    },
    {
      title: "Customer Success",
      description: "Your success is our ultimate goal",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center mb-28">
      {/* Left - Large Clean Image */}
      <div className="order-2 md:order-1 relative">
        <div className="overflow-hidden rounded-lg">
          <img
            src={settings.coreValuesImage}
            alt="Professional team"
            loading="lazy"
            className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Right - Content with bolder typography */}
      <div className="order-1 md:order-2 space-y-8">
        <div>
          <span
            className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] inline-block mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Core Values
          </span>

          <h3
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {settings.coreValuesTitle}
          </h3>
        </div>

        {/* Bolder list with better readability */}
        <ul className="space-y-6">
          {values.map((value, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mt-1">
                <FiCheck className="text-white" size={16} />
              </div>
              <div>
                <strong
                  className="text-gray-900 text-xl block mb-2"
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  {value.title}
                </strong>
                <p
                  className="text-gray-800 text-base leading-relaxed font-normal"
                  style={{
                    fontFamily: "'Roboto', 'Arial', sans-serif",
                    lineHeight: "1.7",
                  }}
                >
                  {value.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Stats Section Component
function StatsSection({ settings }) {
  const stats = [
    {
      icon: <FiAward size={32} />,
      value: settings.statsProjectsValue,
      label: settings.statsProjectsLabel,
    },
    {
      icon: <FiHeart size={32} />,
      value: settings.statsClientsValue,
      label: settings.statsClientsLabel,
    },
    {
      icon: <FiTrendingUp size={32} />,
      value: settings.statsExperienceValue,
      label: settings.statsExperienceLabel,
    },
    {
      icon: <FiUsers size={32} />,
      value: settings.statsTeamValue,
      label: settings.statsTeamLabel,
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-12">
          <span
            className="text-orange-500 font-semibold text-sm uppercase tracking-widest bg-orange-50 px-4 py-2 rounded-full inline-block mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Our Achievements
          </span>

          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {settings.statsTitle.split("Themselves")[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Themselves
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-orange-500 shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <div className="text-orange-600">{stat.icon}</div>
                </div>
              </div>

              {/* Value */}
              <div
                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-2"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                className="text-gray-600 text-sm font-medium"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {stat.label}
              </div>

              {/* Bottom Line Accent */}
              <div className="mt-4 mx-auto w-12 h-1 bg-orange-500 rounded-full group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);

  // Get about settings with fallbacks
  const aboutSettings = siteData?.aboutSettings || {};

  const heroTitle = aboutSettings.heroTitle || "ABOUT US";
  const heroSubtitle =
    aboutSettings.heroSubtitle ||
    "TRANSFORMING BUSINESSES THROUGH INNOVATIVE DIGITAL SOLUTIONS AND CUTTING-EDGE TECHNOLOGY";

  const settings = {
    storyTitle:
      aboutSettings.storyTitle || "Transforming Businesses Through Innovation",
    storyParagraph1:
      aboutSettings.storyParagraph1 ||
      "SAANVI INNOVATION is a leading software and web development company established with a vision to transform businesses through innovative digital solutions.",
    storyParagraph2:
      aboutSettings.storyParagraph2 ||
      "We specialize in creating scalable, modern applications that help businesses grow and succeed in the digital landscape.",
    storyImage: aboutSettings.storyImage
      ? getFullImageUrl(aboutSettings.storyImage)
      : "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200",
    qualityBadgeTitle: aboutSettings.qualityBadgeTitle || "Quality First",
    qualityBadgeText:
      aboutSettings.qualityBadgeText ||
      "Excellence in every project we deliver",
    coreValuesTitle:
      aboutSettings.coreValuesTitle || "Principles That Guide Us",
    coreValuesImage: aboutSettings.coreValuesImage
      ? getFullImageUrl(aboutSettings.coreValuesImage)
      : "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200",
    statsTitle: aboutSettings.statsTitle || "Numbers That Speak for Themselves",
    statsProjectsValue: aboutSettings.statsProjectsValue || "50+",
    statsProjectsLabel:
      aboutSettings.statsProjectsLabel || "Projects Completed",
    statsClientsValue: aboutSettings.statsClientsValue || "30+",
    statsClientsLabel: aboutSettings.statsClientsLabel || "Happy Clients",
    statsExperienceValue: aboutSettings.statsExperienceValue || "5+",
    statsExperienceLabel:
      aboutSettings.statsExperienceLabel || "Years Experience",
    statsTeamValue: aboutSettings.statsTeamValue || "15+",
    statsTeamLabel: aboutSettings.statsTeamLabel || "Team Members",
  };

  useEffect(() => {
    dispatch(getMainSiteData());
  }, [dispatch]);

  return (
    <>
      <title>About Us</title>
      <meta
        name="description"
        content="Learn about a leading software and web development company in Gwalior. We deliver scalable, modern applications for business growth."
      />
      <meta property="og:title" content="About Us" />
      <meta
        property="og:description"
        content="Leading software and web development company delivering exceptional digital solutions."
      />
      <div className="bg-white">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {heroTitle.split(" ").map((word, index) => (
                  <span key={index}>
                    {word === "US" ? (
                      <span className="text-orange-500">{word}</span>
                    ) : (
                      word
                    )}
                    {index < heroTitle.split(" ").length - 1 && " "}
                  </span>
                ))}
              </h1>
              <p
                className="text-gray-600 text-sm md:text-base tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {heroSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 md:px-8">
          <OurStory settings={settings} />
          <WhyChooseUs />
          <CoreValues settings={settings} />
          <StatsSection settings={settings} />
        </div>
      </div>
    </>
  );
}

export default About;
