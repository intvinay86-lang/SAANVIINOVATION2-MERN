function ProjectImage({ image, title }) {
  return (
    <div className="relative -mt-16 mb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default ProjectImage;
