import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GlobeLoader from "@/components/GlobeLoader";
import { getMainSiteData } from "../../../features/siteData/siteDataSlice";
import { selectSiteData } from "../../../features/siteData/siteDataSelectors";

const Globe3D = lazy(() => import("@/components/Globe3D"));

const FLOATING_KEYWORDS = [
  { text: "INNOVATIVE", position: "top-10 right-0" },
  { text: "RELIABLE", position: "top-1/4 left-0" },
  { text: "SCALABLE", position: "bottom-1/4 right-10" },
  { text: "PROFESSIONAL", position: "bottom-10 left-10" },
];

function TechHero() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);

  useEffect(() => {
    if (!siteData) {
      dispatch(getMainSiteData());
    }
  }, [dispatch, siteData]);

  // Get home settings from Redux
  const homeSettings = siteData?.homeSettings || {};

  const heroTitle1 = homeSettings.heroTitle1 || "WHERE INNOVATION";
  const heroTitle2 = homeSettings.heroTitle2 || "MEETS IMPACT";
  const heroDescription =
    homeSettings.heroDescription ||
    "CUTTING-EDGE TECHNOLOGY MEETS CREATIVE EXCELLENCE. TRANSFORMING IDEAS INTO DIGITAL REALITY — WEB DEVELOPMENT, MOBILE APPS, AND COMPREHENSIVE DIGITAL SOLUTIONS.";

  const STATS_DATA = [
    {
      value: homeSettings.heroStat1Value || "50+",
      label: homeSettings.heroStat1Label || "Projects Delivered",
      speed: "0.5",
    },
    {
      value: homeSettings.heroStat2Value || "30+",
      label: homeSettings.heroStat2Label || "Happy Clients",
      speed: "0.6",
    },
    {
      value: homeSettings.heroStat3Value || "5+",
      label: homeSettings.heroStat3Label || "Years Experience",
      speed: "0.7",
    },
  ];

  const renderBinaryBackground = () => (
    <div className="absolute inset-0 opacity-5 font-mono text-xs text-orange-500 overflow-hidden">
      <div className="whitespace-pre leading-tight">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>
            {Array.from({ length: 200 }, () =>
              Math.random() > 0.5 ? "1" : "0",
            ).join("")}
          </div>
        ))}
      </div>
    </div>
  );

  const renderGlobeSection = () => (
    <div className="relative" data-scroll data-scroll-speed="0.3">
      <div className="relative">
        <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full" />

        <div className="relative z-10 w-full h-full">
          <Suspense fallback={<GlobeLoader />}>
            <Globe3D />
          </Suspense>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-full h-full border-2 border-orange-500/20 rounded-full animate-ping"
            style={{ animationDuration: "3s" }}
          />
        </div>

        {FLOATING_KEYWORDS.map(({ text, position }) => (
          <div
            key={text}
            className={`absolute ${position} text-orange-500 font-mono text-[10px] sm:text-xs lg:text-xs opacity-50`}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTitle = () => (
    <div className="space-y-2 md:space-y-4 lg:space-y-4 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight">
        <div
          className="text-white font-mono tracking-wider animate-slide-up"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {heroTitle1}
        </div>
        <div
          className="text-orange-500 font-mono tracking-wider animate-slide-up animation-delay-200"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          {heroTitle2}
        </div>
      </h1>
    </div>
  );

  const renderStats = () => (
    <div
      className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 xl:gap-8"
      style={{
        perspective: "1000px",
      }}
    >
      {STATS_DATA.map(({ value, label }, index) => (
        <div
          key={label}
          className="space-y-1 md:space-y-2 border border-orange-500/30 p-2 sm:p-3 lg:p-4 rounded-lg bg-orange-500/5 backdrop-blur-sm hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300"
          style={{
            boxShadow:
              "0 0 20px rgba(249, 115, 22, 0.1), inset 0 0 20px rgba(249, 115, 22, 0.05)",
            transform: "translateZ(0)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            animationDelay: `${index * 0.1}s`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
            e.currentTarget.style.boxShadow =
              "0 8px 30px rgba(249, 115, 22, 0.3), inset 0 0 30px rgba(249, 115, 22, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateZ(0)";
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(249, 115, 22, 0.1), inset 0 0 20px rgba(249, 115, 22, 0.05)";
          }}
        >
          <div
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-500 font-mono"
            style={{
              fontFamily: "'Orbitron', monospace",
              textShadow:
                "0 0 10px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.3)",
              letterSpacing: "0.05em",
            }}
          >
            {value}
          </div>
          <div
            className="text-[10px] sm:text-xs lg:text-xs xl:text-sm text-gray-400 uppercase tracking-wider font-mono"
            style={{
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
              letterSpacing: "0.1em",
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDescription = () => (
    <div className="space-y-4 lg:space-y-6 animate-fade-in animation-delay-600">
      <p className="text-gray-300 text-xs sm:text-sm lg:text-sm xl:text-base leading-relaxed font-mono lg:max-w-xl">
        {heroDescription}
      </p>

      <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4">
        <Link
          to="/contact"
          className="group relative px-6 lg:px-8 py-3 lg:py-4 bg-orange-500 text-black font-bold font-mono text-xs lg:text-sm uppercase tracking-wider hover:bg-orange-400 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">Get Started</span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </Link>

        <Link
          to="/about"
          className="px-6 lg:px-8 py-3 lg:py-4 border-2 border-orange-500 text-orange-500 font-bold font-mono text-xs lg:text-sm uppercase tracking-wider hover:bg-orange-500 hover:text-black transition-all duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  );

  return (
    <div
      className="relative min-h-screen bg-black overflow-hidden"
      data-scroll-section
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_95%,#f97316_95%,#f97316_100%)] bg-[length:100%_20px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_95%,#f97316_95%,#f97316_100%)] bg-[length:20px_100%]" />
      </div>

      {renderBinaryBackground()}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="min-h-screen flex items-center">
          <div className="w-full py-16 md:py-20">
            <div className="lg:hidden space-y-8 text-center">
              {renderTitle()}
              {renderGlobeSection()}
              {renderStats()}
              {renderDescription()}
            </div>

            <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-12">
                {renderTitle()}
                {renderStats()}
                {renderDescription()}
              </div>
              {renderGlobeSection()}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-scan" />
      </div>
    </div>
  );
}

export default TechHero;
