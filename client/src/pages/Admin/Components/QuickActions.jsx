import toast from "react-hot-toast";
import { FiPlus, FiBriefcase, FiImage, FiMail } from "react-icons/fi";

function QuickActions() {
  const actions = [
    {
      title: "Add Service",
      icon: <FiPlus />,
      color: "bg-orange-500 hover:bg-orange-600",
      onClick: () => toast.info("Add Service functionality coming soon!"),
    },
    {
      title: "Add Portfolio",
      icon: <FiImage />,
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: () => toast.info("Add Portfolio functionality coming soon!"),
    },
    {
      title: "View Messages",
      icon: <FiMail />,
      color: "bg-green-500 hover:bg-green-600",
      onClick: () => toast.info("View Messages functionality coming soon!"),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-sm hover:shadow-md`}
          >
            <span className="text-xl">{action.icon}</span>
            <span>{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
