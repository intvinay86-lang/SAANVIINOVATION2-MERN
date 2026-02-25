import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import ContactForm from "./Components/ContactForm";
import LocationMap from "./Components/LocationMap";
import { getMainSiteData } from "../../features/siteData/siteDataSlice";
import { selectSiteData } from "../../features/siteData/siteDataSelectors";

function Contact() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);

  // Get contact settings with fallbacks
  const contactSettings = siteData?.contactSettings || {};
  const siteInfo = siteData?.siteinfo || {};

  const heroTitle = contactSettings.heroTitle || "GET IN TOUCH";
  const heroSubtitle =
    contactSettings.heroSubtitle ||
    "HAVE A PROJECT IN MIND? WE'D LOVE TO HEAR FROM YOU. SEND US A MESSAGE AND WE'LL RESPOND AS SOON AS POSSIBLE.";
  const businessHours =
    contactSettings.businessHours || "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM";

  // Get contact info from site info
  const email = siteInfo.email || "ceo@saanviinnovation.com";
  const phone = siteInfo.phone || "+91 8305233223";
  const address =
    siteInfo.address ||
    "21, Near Garg Clinic,\nNehru Colony, Mayur Nagar,\nThatipur, Gwalior,\nMadhya Pradesh – 474011";

  useEffect(() => {
    dispatch(getMainSiteData());
  }, [dispatch]);

  return (
    <>
      <title>Contact Us - Get in Touch</title>
      <meta
        name="description"
        content="Get in touch with us for your web development, mobile app development, and digital solution needs. We're here to help bring your ideas to life."
      />
      <meta
        name="keywords"
        content="contact us, get in touch, web development contact, IT services inquiry, software development contact"
      />
      <meta property="og:title" content="Contact Us - Get in Touch" />
      <meta
        property="og:description"
        content="Get in touch with us for your digital solution needs."
      />

      <div className="bg-white">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {heroTitle.split(" ").map((word, index) => (
                  <span key={index}>
                    {word === "TOUCH" ? (
                      <span className="text-orange-500">{word}</span>
                    ) : (
                      word
                    )}
                    {index < heroTitle.split(" ").length - 1 && " "}
                  </span>
                ))}
              </h1>
              <p
                className="text-gray-600 text-sm md:text-base tracking-wide"
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              >
                {heroSubtitle}
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
                            href={`mailto:${email}`}
                            className="text-gray-800 font-medium hover:text-orange-600 transition-colors tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            {email}
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
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="text-gray-800 font-medium hover:text-orange-600 transition-colors tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            {phone}
                          </a>
                          <p
                            className="text-sm text-gray-500 mt-1 tracking-wide"
                            style={{
                              fontFamily:
                                "'Orbitron', 'Courier New', monospace",
                            }}
                          >
                            {businessHours}
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
                            {address.split("\n").map((line, index) => (
                              <span key={index}>
                                {line}
                                {index < address.split("\n").length - 1 && (
                                  <br />
                                )}
                              </span>
                            ))}
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
