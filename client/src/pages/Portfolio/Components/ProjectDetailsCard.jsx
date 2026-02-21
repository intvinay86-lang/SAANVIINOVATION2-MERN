import { Link } from "react-router-dom";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";

function ProjectDetailsCard({ project }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          to="/portfolio"
          className="inline-flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors duration-300 mb-10"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="text-base font-semibold">Back to Portfolio</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left Column - Image (40%) */}
            <div className="lg:col-span-2 p-10 lg:p-14 flex items-center justify-center bg-gradient-to-br from-slate-50 to-orange-50/20">
              <div className="w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-orange-200 transition-all duration-300">
                  <img
                    src={project.image}
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
              <div className="mb-10">
                <h3 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Technologies Used
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
                    <span>Live Preview</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-base hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <FiGithub className="w-5 h-5" />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="mt-10 grid md:grid-cols-2 gap-8">
          {/* Project Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-orange-200 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
              <span className="w-1.5 h-8 bg-orange-500 rounded-full mr-3"></span>
              Project Overview
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200 hover:border-orange-200 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center">
              <span className="w-1.5 h-8 bg-orange-500 rounded-full mr-3"></span>
              Key Features
            </h2>
            <ul className="space-y-3">
              {project.features.slice(0, 6).map((feature, index) => (
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
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsCard;
