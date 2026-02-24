import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiSave, FiClock, FiMapPin, FiGlobe } from "react-icons/fi";
import {
  getMainSiteData,
  updateSiteDataSection,
} from "../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";

function ContactSettings() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pageTitle: "Contact Us - Get in Touch | SAANVI INNOVATION",
      pageDescription:
        "Contact SAANVI INNOVATION for web development, mobile apps, and digital solutions. Located in Gwalior, Madhya Pradesh. Call +91 8305233223 or email ceo@saanviinnovation.com",
      pageKeywords:
        "contact saanvi innovation, web development gwalior, IT company contact, software development inquiry",
      heroTitle: "GET IN TOUCH",
      heroSubtitle:
        "HAVE A PROJECT IN MIND? WE'D LOVE TO HEAR FROM YOU. SEND US A MESSAGE AND WE'LL RESPOND AS SOON AS POSSIBLE.",
      businessHours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.0234567890123!2d78.203263!3d26.216247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzU4LjUiTiA3OMKwMTInMTEuNyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
      formTitle: "Send Us a Message",
      formSubtitle: "Fill out the form below and we'll get back to you shortly",
      responseMessage:
        "Thank you for your message! We'll get back to you within 24 hours.",
    },
  });

  useEffect(() => {
    loadContactSettings();
  }, []);

  useEffect(() => {
    if (siteData !== null) {
      const contactSettings = siteData?.contactSettings || {};

      const defaultData = {
        pageTitle: "Contact Us - Get in Touch | SAANVI INNOVATION",
        pageDescription:
          "Contact SAANVI INNOVATION for web development, mobile apps, and digital solutions. Located in Gwalior, Madhya Pradesh. Call +91 8305233223 or email ceo@saanviinnovation.com",
        pageKeywords:
          "contact saanvi innovation, web development gwalior, IT company contact, software development inquiry",
        heroTitle: "GET IN TOUCH",
        heroSubtitle:
          "HAVE A PROJECT IN MIND? WE'D LOVE TO HEAR FROM YOU. SEND US A MESSAGE AND WE'LL RESPOND AS SOON AS POSSIBLE.",
        businessHours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.0234567890123!2d78.203263!3d26.216247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzU4LjUiTiA3OMKwMTInMTEuNyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin",
        formTitle: "Send Us a Message",
        formSubtitle:
          "Fill out the form below and we'll get back to you shortly",
        responseMessage:
          "Thank you for your message! We'll get back to you within 24 hours.",
      };

      const mergedData = {
        pageTitle: contactSettings.pageTitle || defaultData.pageTitle,
        pageDescription:
          contactSettings.pageDescription || defaultData.pageDescription,
        pageKeywords: contactSettings.pageKeywords || defaultData.pageKeywords,
        heroTitle: contactSettings.heroTitle || defaultData.heroTitle,
        heroSubtitle: contactSettings.heroSubtitle || defaultData.heroSubtitle,
        businessHours:
          contactSettings.businessHours || defaultData.businessHours,
        mapEmbedUrl: contactSettings.mapEmbedUrl || defaultData.mapEmbedUrl,
        formTitle: contactSettings.formTitle || defaultData.formTitle,
        formSubtitle: contactSettings.formSubtitle || defaultData.formSubtitle,
        responseMessage:
          contactSettings.responseMessage || defaultData.responseMessage,
      };

      reset(mergedData);
      setIsFetching(false);
    }
  }, [siteData, reset]);

  const loadContactSettings = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load contact settings");
      }
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        updateSiteDataSection({
          section: "contactSettings",
          data: data,
        }),
      ).unwrap();

      toast.success("Contact settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update contact settings");
      console.error("Update error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Contact Page Settings
        </h1>
        <p className="text-gray-600">
          Manage contact page content, SEO settings, and form configuration.
          Basic contact info (phone, email, address) is managed in Site Info.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* SEO Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiGlobe className="text-orange-500" />
            SEO Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                {...register("pageTitle", {
                  required: "Page title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contact Us - Get in Touch | SAANVI INNOVATION"
              />
              {errors.pageTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pageTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                {...register("pageDescription", {
                  required: "Meta description is required",
                })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contact SAANVI INNOVATION for web development..."
              />
              {errors.pageDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.pageDescription.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              <input
                type="text"
                {...register("pageKeywords")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="contact saanvi innovation, web development gwalior..."
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Hero Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title
              </label>
              <input
                type="text"
                {...register("heroTitle", {
                  required: "Hero title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="GET IN TOUCH"
              />
              {errors.heroTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Subtitle
              </label>
              <textarea
                {...register("heroSubtitle", {
                  required: "Hero subtitle is required",
                })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="HAVE A PROJECT IN MIND? WE'D LOVE TO HEAR FROM YOU..."
              />
              {errors.heroSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroSubtitle.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiClock className="text-orange-500" />
            Additional Contact Details
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Hours
            </label>
            <input
              type="text"
              {...register("businessHours", {
                required: "Business hours are required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
            />
            {errors.businessHours && (
              <p className="mt-1 text-sm text-red-600">
                {errors.businessHours.message}
              </p>
            )}
          </div>
        </div>

        {/* Map Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiMapPin className="text-orange-500" />
            Map Settings
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Maps Embed URL
            </label>
            <textarea
              {...register("mapEmbedUrl", {
                required: "Map embed URL is required",
              })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="https://www.google.com/maps/embed?pb=..."
            />
            {errors.mapEmbedUrl && (
              <p className="mt-1 text-sm text-red-600">
                {errors.mapEmbedUrl.message}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Get this URL from Google Maps → Share → Embed a map → Copy HTML
            </p>
          </div>
        </div>

        {/* Form Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Form Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Title
              </label>
              <input
                type="text"
                {...register("formTitle", {
                  required: "Form title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Send Us a Message"
              />
              {errors.formTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.formTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Form Subtitle
              </label>
              <input
                type="text"
                {...register("formSubtitle", {
                  required: "Form subtitle is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Fill out the form below and we'll get back to you shortly"
              />
              {errors.formSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.formSubtitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Success Response Message
              </label>
              <textarea
                {...register("responseMessage", {
                  required: "Response message is required",
                })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Thank you for your message! We'll get back to you within 24 hours."
              />
              {errors.responseMessage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.responseMessage.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiSave />
                <span>Save Contact Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactSettings;
