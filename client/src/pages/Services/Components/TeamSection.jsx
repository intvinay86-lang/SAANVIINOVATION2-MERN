import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

function TeamSection() {
  const team = [
    {
      name: "Dr. Sophia Patel",
      role: "Lead Developer",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. James Anderson",
      role: "Full Stack Developer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "UI/UX Designer",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 uppercase tracking-wide"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Our Leadership Team
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Experienced professionals dedicated to innovation, quality, and
            long-term success.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-orange-200 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Circular Image */}
              <div className="flex justify-center mb-6">
                <div className="p-1 rounded-full bg-orange-200">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-white"
                  />
                </div>
              </div>

              {/* Name & Role */}
              <h3
                className="text-lg font-semibold text-gray-900"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {member.name}
              </h3>
              <p
                className="text-sm text-gray-600 mb-6"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {member.role}
              </p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4">
                {[FiGithub, FiLinkedin, FiTwitter, FiMail].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-orange-200 bg-white text-gray-600 hover:border-orange-500 hover:text-orange-500 transition"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
