import { Link } from "react-router-dom";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";

function ProjectCard({ project }) {
  return (
    <Link
      to={`/portfolio/${project.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Gradient Overlay - Always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {project.category}
          </span>
        </div>

        {/* Arrow Icon - Appears on Hover */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <FiExternalLink className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Content on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white z-10">
          <h3
            className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors duration-300"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm sm:text-base text-gray-200 mb-4 line-clamp-2 opacity-90"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="text-xs bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full border border-white/20"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span
                className="text-xs text-orange-400 font-semibold px-2 py-1"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* View Details Link */}
          <div
            className="flex items-center gap-2 text-orange-400 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            <span>View Details</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
