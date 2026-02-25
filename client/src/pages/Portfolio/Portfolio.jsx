import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../components/cards/ProjectCard";
import { getMainSiteData } from "../../features/siteData/siteDataSlice";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";

function Portfolio() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);

  // Get portfolio settings with fallbacks
  const portfolioSettings = siteData?.portfolioSettings || {};
  const portfolioProjects = siteData?.portfolioProjects || [];

  const heroTitle = portfolioSettings.heroTitle || "OUR PORTFOLIO";
  const heroSubtitle =
    portfolioSettings.heroSubtitle ||
    "EXPLORE OUR RECENT PROJECTS AND SEE HOW WE'VE HELPED BUSINESSES ACHIEVE THEIR DIGITAL TRANSFORMATION GOALS";

  useEffect(() => {
    dispatch(getMainSiteData());
  }, [dispatch]);

  return (
    <>
      <title>Our Portfolio - Recent Projects</title>
      <meta
        name="description"
        content="Explore our portfolio of successful web development, mobile app, and software projects. See how we've helped businesses achieve their digital goals."
      />
      <meta
        name="keywords"
        content="portfolio, web projects, mobile apps, case studies, client work, project showcase"
      />
      <meta property="og:title" content="Portfolio" />
      <meta
        property="og:description"
        content="View our recent projects and success stories."
      />

      <div className="min-h-screen bg-white">
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
                    {word === "PORTFOLIO" ? (
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

        {/* Projects Grid */}
        <div className="container mx-auto px-4 md:px-8 py-16">
          {portfolioProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {portfolioProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Portfolio;
