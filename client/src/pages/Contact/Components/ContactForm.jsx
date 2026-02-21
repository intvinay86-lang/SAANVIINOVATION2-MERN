import { useState } from "react";
import { FiSend } from "react-icons/fi";

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)] border-2 border-orange-200 p-8 md:p-10 hover:shadow-[0_25px_70px_-15px_rgba(249,115,22,0.4)] transition-shadow duration-300">
      <div className="mb-8">
        <span
          className="text-orange-500 font-semibold text-sm uppercase tracking-widest bg-orange-100 px-4 py-2 rounded-full inline-block mb-4"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          Get In Touch
        </span>

        <h3
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          Send Us a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
            Message
          </span>
        </h3>

        <p
          className="text-gray-600"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          Fill out the form below and we'll get back to you shortly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-700 mb-2"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              First Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="John"
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-700 mb-2"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            >
              Last Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Email <span className="text-orange-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john.doe@example.com"
            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 1234567890"
            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          />
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Subject <span className="text-orange-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="How can we help?"
            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-semibold text-gray-700 mb-2"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Message <span className="text-orange-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            placeholder="Tell us more about your project..."
            className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 resize-none"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
          style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
        >
          <span>Send Message</span>
          <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
