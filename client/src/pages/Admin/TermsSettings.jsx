import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiSave, FiFileText } from "react-icons/fi";
import JoditEditor from "jodit-react";
import {
  getMainSiteData,
  updateSiteDataSection,
} from "../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";

function TermsSettings() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);
  const [content, setContent] = useState("");
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing the terms and conditions content...",
      minHeight: 500,
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "align",
        "|",
        "link",
        "|",
        "undo",
        "redo",
      ],
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      heroTitle: "TERMS & CONDITIONS",
      heroSubtitle:
        "PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES",
      lastUpdated: "February 2026",
    },
  });

  useEffect(() => {
    loadTermsSettings();
  }, []);

  useEffect(() => {
    if (siteData !== null) {
      const termsSettings = siteData?.termsSettings || {};

      const defaultData = {
        heroTitle: "TERMS & CONDITIONS",
        heroSubtitle:
          "PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES",
        lastUpdated: "February 2026",
        content: "",
      };

      const mergedData = {
        heroTitle: termsSettings.heroTitle || defaultData.heroTitle,
        heroSubtitle: termsSettings.heroSubtitle || defaultData.heroSubtitle,
        lastUpdated: termsSettings.lastUpdated || defaultData.lastUpdated,
      };

      reset(mergedData);
      setContent(termsSettings.content || defaultData.content);
      setIsFetching(false);
    }
  }, [siteData, reset]);

  const loadTermsSettings = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load terms settings");
      }
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        updateSiteDataSection({
          section: "termsSettings",
          data: {
            ...data,
            content: content,
          },
        }),
      ).unwrap();

      toast.success("Terms settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update terms settings");
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
          Terms & Conditions Settings
        </h1>
        <p className="text-gray-600">
          Manage the Terms & Conditions page content using the rich text editor
          below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiFileText className="text-orange-500" />
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
                placeholder="TERMS & CONDITIONS"
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
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES"
              />
              {errors.heroSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroSubtitle.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Terms & Conditions Content
          </h2>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
            />
            <p className="mt-2 text-sm text-gray-500">
              Use the rich text editor to format your terms and conditions
              content
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Meta Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Updated
            </label>
            <input
              type="text"
              {...register("lastUpdated", {
                required: "Last updated date is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="February 2026"
            />
            {errors.lastUpdated && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastUpdated.message}
              </p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              This will be displayed at the bottom of the Terms page
            </p>
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
                <span>Save Terms Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TermsSettings;
