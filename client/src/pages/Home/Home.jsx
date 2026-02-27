import { useSelector } from "react-redux";
import TechHero from "./Components/TechHero";
import AboutImageGrid from "./Components/AboutImageGrid";
import ServicesSection from "./Components/ServicesSection";
import RecentWorksSection from "./Components/RecentWorksSection";
import ClientsSection from "./Components/ClientsSection";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";

function Home() {
  const siteData = useSelector(selectSiteData);

  const seoSettings = siteData?.homeSettings?.seo || {
    title: "SAANVI INNOVATION | Home",
    description:
      "Delivers innovative digital solutions including web development, mobile apps, software development, and digital marketing services to help businesses grow.",
    keywords:
      "web development, mobile app development, software development, digital marketing, e-commerce solutions",
    ogTitle: "Innovative Digital Solutions",
    ogDescription:
      "Professional web development, mobile apps, and digital solutions for modern businesses.",
    ogType: "website",
  };

  return (
    <>
      <title>{seoSettings.title}</title>
      <meta name="description" content={seoSettings.description} />
      <meta name="keywords" content={seoSettings.keywords} />
      <meta property="og:title" content={seoSettings.ogTitle} />
      <meta property="og:description" content={seoSettings.ogDescription} />
      <meta property="og:type" content={seoSettings.ogType} />
      <div>
        <TechHero />
        <div className="bg-white">
          <AboutImageGrid />
          <ServicesSection />
          <RecentWorksSection />
          <ClientsSection />
        </div>
      </div>
    </>
  );
}

export default Home;
