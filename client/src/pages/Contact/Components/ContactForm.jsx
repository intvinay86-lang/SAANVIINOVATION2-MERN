import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSend, FiAlertCircle } from "react-icons/fi";
import { selectSiteData } from "../../../features/siteData/siteDataSelectors";
import {
  createContact,
  clearSubmitSuccess,
  clearError,
} from "../../../features/contact/contactSlice";
import {
  selectContactLoading,
  selectContactError,
  selectSubmitSuccess,
} from "../../../features/contact/contactSelectors";
import Toast from "../../../components/Toast";
import PhoneInput from "../../../components/PhoneInput";

function ContactForm() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const loading = useSelector(selectContactLoading);
  const error = useSelector(selectContactError);
  const submitSuccess = useSelector(selectSubmitSuccess);

  const contactSettings = siteData?.contactSettings || {};

  const formTitle = contactSettings.formTitle || "Send Us a Message";
  const formSubtitle =
    contactSettings.formSubtitle ||
    "Fill out the form below and we'll get back to you shortly";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    if (submitSuccess) {
      // Show success toast
      setShowSuccessToast(true);

      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Clear errors and touched state
      setFieldErrors({});
      setTouched({});

      // Clear success state after showing toast
      const timer = setTimeout(() => {
        dispatch(clearSubmitSuccess());
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [submitSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      // Show error toast
      setShowErrorToast(true);

      // Parse field-level errors from backend
      // Error format: "FirstName: error message; LastName: error message"
      if (typeof error === "string" && error.includes(":")) {
        const errors = {};
        const errorParts = error.split(";").map((e) => e.trim());
        errorParts.forEach((part) => {
          const [field, message] = part.split(":").map((s) => s.trim());
          if (field && message) {
            // Convert "First name" to "firstName"
            const fieldKey = field
              .split(" ")
              .map((word, idx) =>
                idx === 0
                  ? word.toLowerCase()
                  : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
              )
              .join("");
            errors[fieldKey] = message;
          }
        });
        setFieldErrors(errors);
      }

      // Clear error state after showing toast
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const validateField = (name, value) => {
    const trimmedValue = value.trim();
    let error = "";

    switch (name) {
      case "firstName":
        if (!trimmedValue) {
          error = "First name is required";
        } else if (trimmedValue.length < 2) {
          error = "First name must be at least 2 characters";
        } else if (trimmedValue.length > 50) {
          error = "First name cannot exceed 50 characters";
        }
        break;

      case "lastName":
        if (!trimmedValue) {
          error = "Last name is required";
        } else if (trimmedValue.length < 2) {
          error = "Last name must be at least 2 characters";
        } else if (trimmedValue.length > 50) {
          error = "Last name cannot exceed 50 characters";
        }
        break;

      case "email":
        if (!trimmedValue) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
          error = "Please provide a valid email address";
        }
        break;

      case "phone":
        if (!trimmedValue) {
          error = "Phone number is required";
        }
        // Additional validation is handled by PhoneInput component
        break;

      case "subject":
        if (!trimmedValue) {
          error = "Subject is required";
        } else if (trimmedValue.length < 3) {
          error = "Subject must be at least 3 characters";
        } else if (trimmedValue.length > 200) {
          error = "Subject cannot exceed 200 characters";
        }
        break;

      case "message":
        if (!trimmedValue) {
          error = "Message is required";
        } else if (trimmedValue.length < 10) {
          error = "Message must be at least 10 characters";
        } else if (trimmedValue.length > 2000) {
          error = "Message cannot exceed 2000 characters";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      });
    }

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setFieldErrors({
        ...fieldErrors,
        [name]: error,
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate on blur
    const error = validateField(name, value);
    setFieldErrors({
      ...fieldErrors,
      [name]: error,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        errors[key] = error;
      }
    });

    setFieldErrors(errors);

    // If there are errors, don't submit
    if (Object.keys(errors).some((key) => errors[key])) {
      setShowErrorToast(true);
      return;
    }

    // Clean the form data
    const cleanedData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    console.log("Submitting contact form:", cleanedData);
    dispatch(createContact(cleanedData));
  };

  const getFieldClassName = (fieldName) => {
    const baseClass =
      "w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 text-sm sm:text-base";
    const hasError = touched[fieldName] && fieldErrors[fieldName];

    if (hasError) {
      return `${baseClass} border-red-400 focus:ring-red-500 focus:border-red-500`;
    }
    return `${baseClass} border-orange-200 focus:ring-orange-500 focus:border-orange-500`;
  };

  return (
    <>
      {/* Success Toast */}
      {showSuccessToast && (
        <Toast
          type="success"
          message="Thank you for contacting us! We'll get back to you shortly."
          onClose={() => setShowSuccessToast(false)}
          duration={6000}
        />
      )}

      {/* Error Toast */}
      {showErrorToast && (
        <Toast
          type="error"
          message={error || "Failed to send message. Please try again."}
          onClose={() => setShowErrorToast(false)}
          duration={6000}
        />
      )}

      <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)] border-2 border-orange-200 p-4 sm:p-6 md:p-8 lg:p-10 hover:shadow-[0_25px_70px_-15px_rgba(249,115,22,0.4)] transition-shadow duration-300">
        <div className="mb-6 md:mb-8">
          <span
            className="text-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-widest bg-orange-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-block mb-3 sm:mb-4"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            Get In Touch
          </span>

          <h3
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {formTitle.split(" ").map((word, index) => (
              <span key={index}>
                {word === "Message" ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                    {word}
                  </span>
                ) : (
                  word
                )}
                {index < formTitle.split(" ").length - 1 && " "}
              </span>
            ))}
          </h3>

          <p
            className="text-sm sm:text-base text-gray-600"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            {formSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Inline Success Message (in addition to toast) */}
          {submitSuccess && (
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 rounded-xl p-5 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-green-800 text-lg">
                    Message Sent Successfully! ✓
                  </h4>
                  <p className="text-sm text-green-700 mt-1">
                    Thank you for reaching out. We'll respond to your message
                    shortly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Inline Error Message (in addition to toast) */}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-400 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-red-800 text-lg">
                    Oops! Something went wrong
                  </h4>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                onBlur={handleBlur}
                required
                minLength={2}
                maxLength={50}
                placeholder="John"
                className={getFieldClassName("firstName")}
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              />
              {touched.firstName && fieldErrors.firstName && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <FiAlertCircle className="w-4 h-4" />
                  <span>{fieldErrors.firstName}</span>
                </div>
              )}
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
                onBlur={handleBlur}
                required
                minLength={2}
                maxLength={50}
                placeholder="Doe"
                className={getFieldClassName("lastName")}
                style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
              />
              {touched.lastName && fieldErrors.lastName && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <FiAlertCircle className="w-4 h-4" />
                  <span>{fieldErrors.lastName}</span>
                </div>
              )}
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
              onBlur={handleBlur}
              required
              placeholder="john.doe@example.com"
              className={getFieldClassName("email")}
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            />
            {touched.email && fieldErrors.email && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <FiAlertCircle className="w-4 h-4" />
                <span>{fieldErrors.email}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <PhoneInput
            id="phone"
            label="Phone"
            value={formData.phone}
            onChange={(fullNumber) => {
              setFormData({
                ...formData,
                phone: fullNumber,
              });
              // Clear field error when user starts typing
              if (fieldErrors.phone) {
                setFieldErrors({
                  ...fieldErrors,
                  phone: "",
                });
              }
            }}
            onBlur={() =>
              handleBlur({ target: { name: "phone", value: formData.phone } })
            }
            error={fieldErrors.phone}
            touched={touched.phone}
            required={true}
          />

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
              onBlur={handleBlur}
              required
              minLength={3}
              maxLength={200}
              placeholder="How can we help?"
              className={getFieldClassName("subject")}
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            />
            {touched.subject && fieldErrors.subject && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <FiAlertCircle className="w-4 h-4" />
                <span>{fieldErrors.subject}</span>
              </div>
            )}
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
              onBlur={handleBlur}
              required
              minLength={10}
              maxLength={2000}
              rows="6"
              placeholder="Tell us more about your project..."
              className={`${getFieldClassName("message")} resize-none`}
              style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
            ></textarea>
            {touched.message && fieldErrors.message && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <FiAlertCircle className="w-4 h-4" />
                <span>{fieldErrors.message}</span>
              </div>
            )}
            <div className="text-right mt-1 text-xs text-gray-500">
              {formData.message.length}/2000 characters
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
            {!loading && (
              <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
