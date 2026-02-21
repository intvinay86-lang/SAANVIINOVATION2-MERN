function ContactInfoCard({ icon, title, details, description }) {
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
      <p className="text-orange-500 font-medium mb-1 text-center">{details}</p>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
  );
}

export default ContactInfoCard;
