function IconCard({
  icon,
  title,
  description,
  details,
  value,
  variant = "default",
  color = "orange",
  iconSize = "default",
}) {
  const colorClasses = {
    orange: "bg-orange-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  const iconBgClasses = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  const iconSizeClasses = {
    small: "w-12 h-12",
    default: "w-14 h-14",
    large: "w-16 h-16",
  };

  // Stats variant (for Admin dashboard)
  if (variant === "stats") {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
          </div>
          <div
            className={`w-14 h-14 ${colorClasses[color]} rounded-lg flex items-center justify-center text-white text-2xl`}
          >
            {icon}
          </div>
        </div>
      </div>
    );
  }

  // Contact info variant
  if (variant === "contact") {
    return (
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
          {title}
        </h3>
        <p className="text-orange-500 font-medium mb-1 text-center">
          {details}
        </p>
        <p className="text-gray-600 text-sm text-center">{description}</p>
      </div>
    );
  }

  // Feature variant (default - for pricing, services, etc.)
  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-200">
      <div
        className={`${iconSizeClasses[iconSize]} ${iconBgClasses[color]} rounded-lg flex items-center justify-center mb-4`}
      >
        {typeof icon === "function" ? icon({ size: 24 }) : icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default IconCard;
