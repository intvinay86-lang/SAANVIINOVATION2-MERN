import { FiCheck } from "react-icons/fi";

function CoreValues() {
  const values = [
    {
      title: "Innovation",
      description: "Constantly pushing boundaries with creative solutions",
    },
    {
      title: "Quality",
      description: "Delivering excellence in every line of code",
    },
    {
      title: "Integrity",
      description: "Building trust through transparency and honesty",
    },
    {
      title: "Customer Success",
      description: "Your success is our ultimate goal",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center mb-28">
      {/* Left - Large Clean Image */}
      <div className="order-2 md:order-1 relative">
        <div className="overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Professional team"
            loading="lazy"
            className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Right - Content with bolder typography */}
      <div className="order-1 md:order-2 space-y-8">
        <div>
          <span
            className="text-orange-500 font-semibold text-xs uppercase tracking-[0.2em] inline-block mb-6"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Core Values
          </span>

          <h3
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Principles That Guide Us
          </h3>
        </div>

        {/* Bolder list with better readability */}
        <ul className="space-y-6">
          {values.map((value, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mt-1">
                <FiCheck className="text-white" size={16} />
              </div>
              <div>
                <strong
                  className="text-gray-900 text-xl block mb-2"
                  style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
                >
                  {value.title}
                </strong>
                <p
                  className="text-gray-800 text-base leading-relaxed font-normal"
                  style={{
                    fontFamily: "'Roboto', 'Arial', sans-serif",
                    lineHeight: "1.7",
                  }}
                >
                  {value.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CoreValues;
