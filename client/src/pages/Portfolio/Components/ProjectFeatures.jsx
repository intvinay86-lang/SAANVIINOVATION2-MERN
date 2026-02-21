import { FiCheck } from "react-icons/fi";

function ProjectFeatures({ features }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="w-2 h-8 bg-orange-500 mr-4 rounded-full"></span>
        Key Features
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300"
          >
            <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <FiCheck className="text-orange-600 w-4 h-4" />
            </div>
            <span className="text-gray-700 leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectFeatures;
