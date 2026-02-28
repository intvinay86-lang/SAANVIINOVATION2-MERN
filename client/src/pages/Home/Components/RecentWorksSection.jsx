import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import ProjectCard from "../../../components/cards/ProjectCard";
import { selectSiteData } from "../../../features/siteData/siteDataSelectors";

function RecentWorksSection() {
  const siteData = useSelector(selectSiteData);

  // Get portfolio projects from Redux store
  const portfolioProjects = siteData?.portfolioProjects || [];

  // Get only the first 3 projects for recent works
  const recentWorks = portfolioProjects.slice(0, 3);

  // Don't render section if no projects
  if (recentWorks.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="text-orange-500 font-semibold text-lg uppercase tracking-wider bg-orange-50 px-4 py-2 rounded-full">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Recent Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl">
            Explore our latest projects and see how we've helped businesses
            achieve their digital transformation goals.
          </p>
        </div>

        {/* Works Grid - Modern Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recentWorks.map((work) => (
            <ProjectCard key={work.id} project={work} />
          ))}
        </div>

        {/* View All Button - Only show if there are more projects */}
        {portfolioProjects.length > 3 && (
          <div className="text-center mt-12 md:mt-16">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>View All Projects</span>
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentWorksSection;
