import { useEffect } from "react";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

function Toast({ type = "success", message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const styles = {
    success: {
      bg: "bg-green-50",
      border: "border-green-500",
      text: "text-green-800",
      icon: <FiCheckCircle className="w-6 h-6 text-green-600" />,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-800",
      icon: <FiAlertCircle className="w-6 h-6 text-red-600" />,
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      text: "text-blue-800",
      icon: <FiCheckCircle className="w-6 h-6 text-blue-600" />,
    },
  };

  const style = styles[type] || styles.success;

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${style.bg} border-l-4 ${style.border} rounded-lg shadow-2xl p-4 max-w-md animate-slide-in-right`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">{style.icon}</div>
        <div className="flex-1">
          <p className={`font-semibold ${style.text}`}>
            {type === "success" && "Success!"}
            {type === "error" && "Error!"}
            {type === "info" && "Info"}
          </p>
          <p className={`text-sm ${style.text} mt-1`}>{message}</p>
        </div>
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${style.text} hover:opacity-70 transition-opacity`}
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
