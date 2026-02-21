function PageHeader({
  title = "title",
  description = "description",
  className = "",
}) {
  return (
    <section className={`pb-10 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {title}
        </h1>

        {/* Gradient Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6 rounded-full"></div>

        {/* Description */}
        {description && (
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHeader;
