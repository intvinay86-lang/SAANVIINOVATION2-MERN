import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiSave, FiFolder } from "react-icons/fi";
import {
  getMainSiteData,
  updateSiteDataSection,
} from "../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";

function PortfolioSettings() {
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
      heroTitle: "OUR PORTFOLIO",
      heroSubtitle:
        "EXPLORE OUR RECENT PROJECTS AND SEE HOW WE'VE HELPED BUSINESSES ACHIEVE THEIR DIGITAL TRANSFORMATION GOALS",
      detailsOverviewTitle: "Project Overview",
      detailsKeyFeaturesTitle: "Key Features",
      detailsBackButtonText: "Back to Portfolio",
      detailsTechnologiesTitle: "Technologies Used",
      detailsLivePreviewText: "Live Preview",
      detailsViewCodeText: "View Code",
    },
  });

  useEffect(() => {
    loadPortfolioSettings();
  }, []);

  useEffect(() => {
    if (siteData !== null) {
      const portfolioSettings = siteData?.portfolioSettings || {};

      const defaultData = {
        heroTitle: "OUR PORTFOLIO",
        heroSubtitle:
          "EXPLORE OUR RECENT PROJECTS AND SEE HOW WE'VE HELPED BUSINESSES ACHIEVE THEIR DIGITAL TRANSFORMATION GOALS",
        detailsOverviewTitle: "Project Overview",
        detailsKeyFeaturesTitle: "Key Features",
        detailsBackButtonText: "Back to Portfolio",
        detailsTechnologiesTitle: "Technologies Used",
        detailsLivePreviewText: "Live Preview",
        detailsViewCodeText: "View Code",
      };

      const mergedData = {
        heroTitle: portfolioSettings.heroTitle || defaultData.heroTitle,
        heroSubtitle:
          portfolioSettings.heroSubtitle || defaultData.heroSubtitle,
        detailsOverviewTitle:
          portfolioSettings.detailsOverviewTitle ||
          defaultData.detailsOverviewTitle,
        detailsKeyFeaturesTitle:
          portfolioSettings.detailsKeyFeaturesTitle ||
          defaultData.detailsKeyFeaturesTitle,
        detailsBackButtonText:
          portfolioSettings.detailsBackButtonText ||
          defaultData.detailsBackButtonText,
        detailsTechnologiesTitle:
          portfolioSettings.detailsTechnologiesTitle ||
          defaultData.detailsTechnologiesTitle,
        detailsLivePreviewText:
          portfolioSettings.detailsLivePreviewText ||
          defaultData.detailsLivePreviewText,
        detailsViewCodeText:
          portfolioSettings.detailsViewCodeText ||
          defaultData.detailsViewCodeText,
      };

      reset(mergedData);
      setIsFetching(false);
    }
  }, [siteData, reset]);

  const loadPortfolioSettings = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load portfolio settings");
      }
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        updateSiteDataSection({
          section: "portfolioSettings",
          data: data,
        }),
      ).unwrap();

      toast.success("Portfolio settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update portfolio settings");
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
          Portfolio Page Settings
        </h1>
        <p className="text-gray-600">
          Manage portfolio page content including hero section and portfolio
          details page labels.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Portfolio Page Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiFolder className="text-orange-500" />
            Portfolio Page Hero Section
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
                placeholder="OUR PORTFOLIO"
              />
              {errors.heroTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroTitle.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Note: The word "PORTFOLIO" will be highlighted in orange
              </p>
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
                placeholder="EXPLORE OUR RECENT PROJECTS AND SEE HOW WE'VE HELPED BUSINESSES..."
              />
              {errors.heroSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroSubtitle.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Details Page Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Portfolio Details Page Labels
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Back Button Text
              </label>
              <input
                type="text"
                {...register("detailsBackButtonText", {
                  required: "Back button text is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Back to Portfolio"
              />
              {errors.detailsBackButtonText && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.detailsBackButtonText.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Section Title
              </label>
              <input
                type="text"
                {...register("detailsTechnologiesTitle", {
                  required: "Technologies title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Technologies Used"
              />
              {errors.detailsTechnologiesTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.detailsTechnologiesTitle.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live Preview Button Text
                </label>
                <input
                  type="text"
                  {...register("detailsLivePreviewText", {
                    required: "Live preview text is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Live Preview"
                />
                {errors.detailsLivePreviewText && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.detailsLivePreviewText.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  View Code Button Text
                </label>
                <input
                  type="text"
                  {...register("detailsViewCodeText", {
                    required: "View code text is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="View Code"
                />
                {errors.detailsViewCodeText && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.detailsViewCodeText.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Overview Section Title
                </label>
                <input
                  type="text"
                  {...register("detailsOverviewTitle", {
                    required: "Overview title is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Project Overview"
                />
                {errors.detailsOverviewTitle && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.detailsOverviewTitle.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features Section Title
                </label>
                <input
                  type="text"
                  {...register("detailsKeyFeaturesTitle", {
                    required: "Key features title is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Key Features"
                />
                {errors.detailsKeyFeaturesTitle && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.detailsKeyFeaturesTitle.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Note about Portfolio Projects
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Individual portfolio projects (titles, descriptions, images,
                  technologies, etc.) are managed through the project data files
                  located at:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>
                    <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                      client/src/pages/Portfolio/projectsData.js
                    </code>{" "}
                    - Portfolio grid items
                  </li>
                  <li>
                    <code className="bg-blue-100 px-2 py-1 rounded text-xs">
                      client/src/pages/Portfolio/portfolioDetailsData.js
                    </code>{" "}
                    - Detailed project information
                  </li>
                </ul>
              </div>
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
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PortfolioSettings;
