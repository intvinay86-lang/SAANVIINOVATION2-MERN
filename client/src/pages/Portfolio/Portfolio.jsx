import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProjectCard from "../../components/cards/ProjectCard";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";
import { getMainSiteData } from "../../features/siteData/siteDataSlice";

function Portfolio() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // 3x3 grid

  // Fetch fresh data when component mounts
  useEffect(() => {
    dispatch(getMainSiteData());
  }, [dispatch]);

  // Get portfolio settings with fallbacks
  const portfolioSettings = siteData?.portfolioSettings || {};
  const portfolioProjects = siteData?.portfolioProjects || [];

  const heroTitle = portfolioSettings.heroTitle || "OUR PORTFOLIO";
  const heroSubtitle =
    portfolioSettings.heroSubtitle ||
    "EXPLORE OUR RECENT PROJECTS AND SEE HOW WE'VE HELPED BUSINESSES ACHIEVE THEIR DIGITAL TRANSFORMATION GOALS";

  // Pagination calculations
  const totalPages = Math.ceil(portfolioProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = portfolioProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-wide">
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
              <p className="text-gray-600 text-sm md:text-base tracking-wide">
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-orange-500 hover:text-white border border-gray-300"
                    }`}
                  >
                    <FiChevronLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof page === "number" && handlePageChange(page)
                        }
                        disabled={page === "..."}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                          page === currentPage
                            ? "bg-orange-500 text-white shadow-lg"
                            : page === "..."
                              ? "bg-transparent text-gray-400 cursor-default"
                              : "bg-white text-gray-700 hover:bg-orange-100 border border-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-orange-500 hover:text-white border border-gray-300"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Portfolio;
