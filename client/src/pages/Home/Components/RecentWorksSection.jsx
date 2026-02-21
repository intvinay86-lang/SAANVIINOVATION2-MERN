import { Link } from "react-router-dom";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import RecentWorkCard from "./RecentWorkCard";

function RecentWorksSection() {
  const recentWorks = [
    {
      id: 1,
      title: "E-commerce Platform",
      category: "Web Development",
      description:
        "Modern e-commerce solution with advanced features and seamless user experience.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile Development",
      description:
        "Secure banking application with biometric authentication and real-time transactions.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React Native", "Firebase", "Redux", "Biometric API"],
    },
    {
      id: 3,
      title: "Corporate Website",
      category: "Web Design",
      description:
        "Professional corporate website with modern design and optimized performance.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "Tailwind CSS", "Vite", "Vercel"],
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span
              className="text-orange-500 font-semibold text-lg uppercase tracking-wider bg-orange-50 px-4 py-2 rounded-full"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              Portfolio
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase tracking-wide"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Recent Works
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Explore our latest projects and see how we've helped businesses
            achieve their digital transformation goals.
          </p>
        </div>

        {/* Works Grid - Modern Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {recentWorks.map((work) => (
            <RecentWorkCard key={work.id} work={work} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            <span>View All Projects</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default RecentWorksSection;
