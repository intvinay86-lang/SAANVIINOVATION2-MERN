import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { FiSend, FiAlertCircle } from "react-icons/fi";
import { isValidPhoneNumber } from "react-phone-number-input";
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
  const [formKey, setFormKey] = useState(0);

  const contactSettings = siteData?.contactSettings || {};

  const formTitle = contactSettings.formTitle || "Send Us a Message";
  const formSubtitle =
    contactSettings.formSubtitle ||
    "Fill out the form below and we'll get back to you shortly";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, touchedFields },
    setError: setFormError,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (submitSuccess) {
      reset();
      setFormKey((prev) => prev + 1); // Force PhoneInput to remount
      // Clear success state after toast duration (6 seconds)
      const timer = setTimeout(() => {
        dispatch(clearSubmitSuccess());
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, dispatch, reset]);

  useEffect(() => {
    if (error) {
      // Parse field-level errors from backend
      if (typeof error === "string" && error.includes(":")) {
        const errorParts = error.split(";").map((e) => e.trim());
        errorParts.forEach((part) => {
          const [field, message] = part.split(":").map((s) => s.trim());
          if (field && message) {
            const fieldKey = field
              .split(" ")
              .map((word, idx) =>
                idx === 0
                  ? word.toLowerCase()
                  : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
              )
              .join("");
            setFormError(fieldKey, { type: "server", message });
          }
        });
      }

      // Clear error state after toast duration (6 seconds)
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch, setFormError]);

  const onSubmit = (data) => {
    const cleanedData = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    };

    dispatch(createContact(cleanedData));
  };

  const getFieldClassName = (fieldName) => {
    const baseClass =
      "w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg focus:ring-2 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 text-sm sm:text-base";
    const hasError = touchedFields[fieldName] && errors[fieldName];

    if (hasError) {
      return `${baseClass} border-red-400 focus:ring-red-500 focus:border-red-500`;
    }
    return `${baseClass} border-orange-200 focus:ring-orange-500 focus:border-orange-500`;
  };

  return (
    <>
      {/* Success Toast */}
      {submitSuccess && (
        <Toast
          type="success"
          message="Thank you for contacting us! We'll get back to you shortly."
          onClose={() => dispatch(clearSubmitSuccess())}
          duration={6000}
        />
      )}

      {/* Error Toast */}
      {error && (
        <Toast
          type="error"
          message={error || "Failed to send message. Please try again."}
          onClose={() => dispatch(clearError())}
          duration={6000}
        />
      )}

      <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-[0_20px_60px_-15px_rgba(249,115,22,0.3)] border-2 border-orange-200 p-4 sm:p-6 md:p-8 lg:p-10 hover:shadow-[0_25px_70px_-15px_rgba(249,115,22,0.4)] transition-shadow duration-300">
        <div className="mb-6 md:mb-8">
          <span className="text-orange-500 font-semibold text-xs sm:text-sm uppercase tracking-widest bg-orange-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-block mb-3 sm:mb-4">
            Get In Touch
          </span>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
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

          <p className="text-sm sm:text-base text-gray-600">{formSubtitle}</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                className={getFieldClassName("firstName")}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "First name cannot exceed 50 characters",
                  },
                  validate: (value) =>
                    value.trim().length >= 2 || "First name is required",
                })}
              />
              {touchedFields.firstName && errors.firstName && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <FiAlertCircle className="w-4 h-4" />
                  <span>{errors.firstName.message}</span>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                className={getFieldClassName("lastName")}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Last name cannot exceed 50 characters",
                  },
                  validate: (value) =>
                    value.trim().length >= 2 || "Last name is required",
                })}
              />
              {touchedFields.lastName && errors.lastName && (
                <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                  <FiAlertCircle className="w-4 h-4" />
                  <span>{errors.lastName.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email <span className="text-orange-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="john.doe@example.com"
              className={getFieldClassName("email")}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please provide a valid email address",
                },
              })}
            />
            {touchedFields.email && errors.email && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <FiAlertCircle className="w-4 h-4" />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <Controller
            key={`phone-${formKey}`}
            name="phone"
            control={control}
            rules={{
              required: "Phone number is required",
              validate: (value) => {
                if (!value || value.trim().length === 0) {
                  return "Phone number is required";
                }
                if (!isValidPhoneNumber(value)) {
                  return "Enter a valid phone number";
                }
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <PhoneInput
                id="phone"
                label="Phone"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.phone?.message}
                touched={touchedFields.phone}
                required={true}
              />
            )}
          />

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Subject <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              placeholder="How can we help?"
              className={getFieldClassName("subject")}
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 3,
                  message: "Subject must be at least 3 characters",
                },
                maxLength: {
                  value: 200,
                  message: "Subject cannot exceed 200 characters",
                },
                validate: (value) =>
                  value.trim().length >= 3 || "Subject is required",
              })}
            />
            {touchedFields.subject && errors.subject && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                <FiAlertCircle className="w-4 h-4" />
                <span>{errors.subject.message}</span>
              </div>
            )}
          </div>

          {/* Message */}
          <Controller
            name="message"
            control={control}
            rules={{
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
              maxLength: {
                value: 2000,
                message: "Message cannot exceed 2000 characters",
              },
              validate: (value) =>
                value.trim().length >= 10 || "Message is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows="6"
                  placeholder="Tell us more about your project..."
                  className={`${getFieldClassName("message")} resize-none`}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                ></textarea>
                {touchedFields.message && errors.message && (
                  <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
                    <FiAlertCircle className="w-4 h-4" />
                    <span>{errors.message.message}</span>
                  </div>
                )}
                <div className="text-right mt-1 text-xs text-gray-500">
                  {value.length}/2000 characters
                </div>
              </div>
            )}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
