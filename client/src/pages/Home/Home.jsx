// import ModernHero from "./Components/ModernHero";
import TechHero from "./Components/TechHero";
import AboutImageGrid from "./Components/AboutImageGrid";
import ServicesSection from "./Components/ServicesSection";
import RecentWorksSection from "./Components/RecentWorksSection";
import ClientsSection from "./Components/ClientsSection";

function Home() {
  return (
    <>
      <title>SAANVI INNOVATION | Home</title>
      <meta
        name="description"
        content="Delivers innovative digital solutions including web development, mobile apps, software development, and digital marketing services to help businesses grow."
      />
      <meta
        name="keywords"
        content="web development, mobile app development, software development, digital marketing, e-commerce solutions"
      />
      <meta property="og:title" content="Innovative Digital Solutions" />
      <meta
        property="og:description"
        content="Professional web development, mobile apps, and digital solutions for modern businesses."
      />
      <meta property="og:type" content="website" />
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
