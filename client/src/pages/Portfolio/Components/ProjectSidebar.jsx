import { FiExternalLink, FiCode } from "react-icons/fi";

function ProjectSidebar({ technologies, liveUrl }) {
  return (
    <div className="space-y-6">
      {/* Technologies Card */}
      <div className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl border-2 border-orange-200 shadow-lg sticky top-24">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
            <FiCode className="text-orange-600 w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Technologies Used</h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium border-2 border-orange-100 hover:border-orange-300 hover:shadow-md transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Live Project Button */}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            <FiExternalLink className="w-5 h-5" />
            <span>View Live Project</span>
          </a>
        )}
      </div>

      {/* CTA Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg text-white">
        <h4 className="text-lg font-bold mb-3">
          Interested in Similar Project?
        </h4>
        <p className="text-gray-300 text-sm mb-4">
          Let's discuss how we can help bring your ideas to life with our
          expertise.
        </p>
        <a
          href="/contact"
          className="block text-center bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors duration-300 font-semibold"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
}

export default ProjectSidebar;
