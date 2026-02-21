import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import ContactForm from "./Components/ContactForm";
import LocationMap from "./Components/LocationMap";

function Contact() {
  return (
    <>
      <title>Contact Us - Get in Touch | SAANVI INNOVATION</title>
      <meta
        name="description"
        content="Contact SAANVI INNOVATION for web development, mobile apps, and digital solutions. Located in Gwalior, Madhya Pradesh. Call +91 8305233223 or email ceo@saanviinnovation.com"
      />
      <meta
        name="keywords"
        content="contact saanvi innovation, web development gwalior, IT company contact, software development inquiry"
      />
      <meta property="og:title" content="Contact Us - SAANVI INNOVATION" />
      <meta
        property="og:description"
        content="Get in touch with us for your digital solution needs."
      />
      <link rel="canonical" href="https://saanviinnovation.com/contact" />

      <div className="bg-white">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                GET IN <span className="text-orange-500">TOUCH</span>
              </h1>
              <p
                className="text-gray-600 text-sm md:text-base tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                HAVE A PROJECT IN MIND? WE'D LOVE TO HEAR FROM YOU. SEND US A
                MESSAGE AND WE'LL RESPOND AS SOON AS POSSIBLE.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-orange-50/30">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left Side - Contact Form */}
                <div>
                  <ContactForm />
                </div>

                {/* Right Side - Contact Details & Map */}
                <div className="space-y-8">
                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-2xl shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)] p-8 border-2 border-orange-200 hover:shadow-[0_25px_70px_-15px_rgba(249,115,22,0.4)] transition-shadow duration-300">
                    <h2
                      className="text-2xl font-bold text-gray-800 mb-6 tracking-wide"
                      style={{
                        fontFamily: "'Orbitron', 'Courier New', monospace",
                      }}
                    >
                      Contact Information
                    </h2>

                    <div className="space-y-6">
                      {/* Email */}
                      <div className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                          <FiMail
                            className="text-orange-600 group-hover:text-white transition-colors duration-300"
                            size={20}
                          />
                        </div>
                        <div>
                          <h3
                            className="text-sm font-semibold text-gray-500 mb-1 tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            Email
                          </h3>
                          <a
                            href="mailto:ceo@saanviinnovation.com"
                            className="text-gray-800 font-medium hover:text-orange-600 transition-colors tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            ceo@saanviinnovation.com
                          </a>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                          <FiPhone
                            className="text-orange-600 group-hover:text-white transition-colors duration-300"
                            size={20}
                          />
                        </div>
                        <div>
                          <h3
                            className="text-sm font-semibold text-gray-500 mb-1 tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            Phone
                          </h3>
                          <a
                            href="tel:+918305233223"
                            className="text-gray-800 font-medium hover:text-orange-600 transition-colors tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            +91 8305233223
                          </a>
                          <p
                            className="text-sm text-gray-500 mt-1 tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            Mon-Fri: 9AM-6PM, Sat: 10AM-4PM
                          </p>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300">
                          <FiMapPin
                            className="text-orange-600 group-hover:text-white transition-colors duration-300"
                            size={20}
                          />
                        </div>
                        <div>
                          <h3
                            className="text-sm font-semibold text-gray-500 mb-1 tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            Address
                          </h3>
                          <p
                            className="text-gray-800 font-medium leading-relaxed tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            21, Near Garg Clinic,
                            <br />
                            Nehru Colony, Mayur Nagar,
                            <br />
                            Thatipur, Gwalior,
                            <br />
                            Madhya Pradesh – 474011
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <LocationMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
