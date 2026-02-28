import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";
import { getMainSiteData } from "../../features/siteData/siteDataSlice";
import { getFullImageUrl } from "../../utils/imageUtils";

function PortfolioDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const navigate = useNavigate();

  // Fetch fresh data when component mounts
  useEffect(() => {
    dispatch(getMainSiteData());
  }, [dispatch, id]);

  // Get portfolio settings with fallbacks
  const portfolioSettings = siteData?.portfolioSettings || {};
  const portfolioProjects = siteData?.portfolioProjects || [];

  const backButtonText =
    portfolioSettings.detailsBackButtonText || "Back to Portfolio";
  const technologiesTitle =
    portfolioSettings.detailsTechnologiesTitle || "Technologies Used";
  const livePreviewText =
    portfolioSettings.detailsLivePreviewText || "Live Preview";
  const overviewTitle =
    portfolioSettings.detailsOverviewTitle || "Project Overview";
  const keyFeaturesTitle =
    portfolioSettings.detailsKeyFeaturesTitle || "Key Features";

  const project = portfolioProjects.find((p) => String(p.id) == String(id));

  useEffect(() => {
    // Only check after data is loaded
    if (portfolioProjects.length > 0 && !project) {
      navigate("/not-found", { replace: true });
    }
  }, [project, portfolioProjects, navigate]);

  // Show loading state while data is being fetched
  if (portfolioProjects.length === 0) {
    return null;
  }

  // If data is loaded but project not found, don't render
  if (!project) {
    return null;
  }

  // Use getFullImageUrl with Pexels fallback
  const projectImage = getFullImageUrl(
    project.image ||
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200",
  );

  return (
    <>
      <title>Portfolio Details | {project.title}</title>
      <meta
        name="description"
        content={
          project.fullDescription?.substring(0, 160) || project.description
        }
      />
      <meta
        name="keywords"
        content={`${project.title}, ${project.category}, ${project.technologies?.join(", ") || ""}`}
      />
      <meta property="og:title" content={`${project.title}`} />
      <meta property="og:description" content={project.description} />
      <meta property="og:image" content={projectImage} />

      <div className="min-h-screen bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors duration-300 mb-10"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="text-base font-semibold">{backButtonText}</span>
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Left Column - Image (40%) */}
              <div className="lg:col-span-2 p-10 lg:p-14 flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50/20">
                <div className="w-full">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-orange-200 transition-all duration-300">
                    <img
                      src={projectImage}
                      alt={project.title}
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Content (60%) */}
              <div className="lg:col-span-3 p-10 lg:p-14">
                {/* Category Badge */}
                <div className="inline-block mb-5">
                  <span className="text-sm font-bold text-orange-600 bg-orange-100 px-4 py-2 rounded-full border-2 border-orange-200">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {project.title}
                </h1>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-10 text-lg">
                  {project.description}
                </p>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
                      {technologiesTitle}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="text-sm font-semibold text-gray-800 bg-gradient-to-br from-gray-100 to-gray-50 px-4 py-2.5 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 transition-all duration-200 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-base hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <FiExternalLink className="w-5 h-5" />
                      <span>{livePreviewText}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details Section */}
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            {/* Project Overview */}
            {project.fullDescription && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-orange-200 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
                  <span className="w-1.5 h-8 bg-orange-500 rounded-full mr-3"></span>
                  {overviewTitle}
                </h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-orange-200 transition-all duration-300">
                <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
                  <span className="w-1.5 h-8 bg-orange-500 rounded-full mr-3"></span>
                  {keyFeaturesTitle}
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start text-base text-gray-700"
                    >
                      <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PortfolioDetails;
