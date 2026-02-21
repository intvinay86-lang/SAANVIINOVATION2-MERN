function ProjectOverview({ fullDescription }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="w-2 h-8 bg-orange-500 mr-4 rounded-full"></span>
        Project Overview
      </h2>
      <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-100 shadow-lg">
        <p className="text-gray-700 leading-relaxed text-lg">
          {fullDescription}
        </p>
      </div>
    </div>
  );
}

export default ProjectOverview;
