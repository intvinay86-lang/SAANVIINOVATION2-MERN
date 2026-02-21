import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

function ProjectHero({ project }) {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors duration-300"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="max-w-4xl">
          <div className="inline-block bg-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-2 rounded-full mb-4 border border-orange-500/30">
            {project.category}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {project.description}
          </p>

          {/* Project Meta Info */}
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            {project.client && (
              <div>
                <span className="text-gray-400">Client:</span>
                <span className="text-white ml-2 font-medium">
                  {project.client}
                </span>
              </div>
            )}
            {project.duration && (
              <div>
                <span className="text-gray-400">Duration:</span>
                <span className="text-white ml-2 font-medium">
                  {project.duration}
                </span>
              </div>
            )}
            {project.year && (
              <div>
                <span className="text-gray-400">Year:</span>
                <span className="text-white ml-2 font-medium">
                  {project.year}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectHero;
