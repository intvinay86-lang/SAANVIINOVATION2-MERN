import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiSave, FiBookOpen, FiAward, FiTrendingUp } from "react-icons/fi";
import {
  getMainSiteData,
  updateSiteDataSection,
} from "../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";

function AboutSettings() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      heroTitle: "ABOUT US",
      heroSubtitle:
        "TRANSFORMING BUSINESSES THROUGH INNOVATIVE DIGITAL SOLUTIONS AND CUTTING-EDGE TECHNOLOGY",
      storyTitle: "Transforming Businesses Through Innovation",
      storyParagraph1:
        "SAANVI INNOVATION is a leading software and web development company established with a vision to transform businesses through innovative digital solutions.",
      storyParagraph2:
        "We specialize in creating scalable, modern applications that help businesses grow and succeed in the digital landscape.",
      storyImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      qualityBadgeTitle: "Quality First",
      qualityBadgeText: "Excellence in every project we deliver",
      coreValuesTitle: "Principles That Guide Us",
      coreValuesImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      statsTitle: "Numbers That Speak for Themselves",
      statsProjectsValue: "50+",
      statsProjectsLabel: "Projects Completed",
      statsClientsValue: "30+",
      statsClientsLabel: "Happy Clients",
      statsExperienceValue: "5+",
      statsExperienceLabel: "Years Experience",
      statsTeamValue: "15+",
      statsTeamLabel: "Team Members",
    },
  });

  // Watch image URLs for preview (must be after useForm)
  const storyImage = watch("storyImage");
  const coreValuesImage = watch("coreValuesImage");

  useEffect(() => {
    loadAboutSettings();
  }, []);

  useEffect(() => {
    if (siteData !== null) {
      const aboutSettings = siteData?.aboutSettings || {};

      const defaultData = {
        heroTitle: "ABOUT US",
        heroSubtitle:
          "TRANSFORMING BUSINESSES THROUGH INNOVATIVE DIGITAL SOLUTIONS AND CUTTING-EDGE TECHNOLOGY",
        storyTitle: "Transforming Businesses Through Innovation",
        storyParagraph1:
          "SAANVI INNOVATION is a leading software and web development company established with a vision to transform businesses through innovative digital solutions.",
        storyParagraph2:
          "We specialize in creating scalable, modern applications that help businesses grow and succeed in the digital landscape.",
        storyImage:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        qualityBadgeTitle: "Quality First",
        qualityBadgeText: "Excellence in every project we deliver",
        coreValuesTitle: "Principles That Guide Us",
        coreValuesImage:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        statsTitle: "Numbers That Speak for Themselves",
        statsProjectsValue: "50+",
        statsProjectsLabel: "Projects Completed",
        statsClientsValue: "30+",
        statsClientsLabel: "Happy Clients",
        statsExperienceValue: "5+",
        statsExperienceLabel: "Years Experience",
        statsTeamValue: "15+",
        statsTeamLabel: "Team Members",
      };

      const mergedData = {
        heroTitle: aboutSettings.heroTitle || defaultData.heroTitle,
        heroSubtitle: aboutSettings.heroSubtitle || defaultData.heroSubtitle,
        storyTitle: aboutSettings.storyTitle || defaultData.storyTitle,
        storyParagraph1:
          aboutSettings.storyParagraph1 || defaultData.storyParagraph1,
        storyParagraph2:
          aboutSettings.storyParagraph2 || defaultData.storyParagraph2,
        storyImage: aboutSettings.storyImage || defaultData.storyImage,
        qualityBadgeTitle:
          aboutSettings.qualityBadgeTitle || defaultData.qualityBadgeTitle,
        qualityBadgeText:
          aboutSettings.qualityBadgeText || defaultData.qualityBadgeText,
        coreValuesTitle:
          aboutSettings.coreValuesTitle || defaultData.coreValuesTitle,
        coreValuesImage:
          aboutSettings.coreValuesImage || defaultData.coreValuesImage,
        statsTitle: aboutSettings.statsTitle || defaultData.statsTitle,
        statsProjectsValue:
          aboutSettings.statsProjectsValue || defaultData.statsProjectsValue,
        statsProjectsLabel:
          aboutSettings.statsProjectsLabel || defaultData.statsProjectsLabel,
        statsClientsValue:
          aboutSettings.statsClientsValue || defaultData.statsClientsValue,
        statsClientsLabel:
          aboutSettings.statsClientsLabel || defaultData.statsClientsLabel,
        statsExperienceValue:
          aboutSettings.statsExperienceValue ||
          defaultData.statsExperienceValue,
        statsExperienceLabel:
          aboutSettings.statsExperienceLabel ||
          defaultData.statsExperienceLabel,
        statsTeamValue:
          aboutSettings.statsTeamValue || defaultData.statsTeamValue,
        statsTeamLabel:
          aboutSettings.statsTeamLabel || defaultData.statsTeamLabel,
      };

      reset(mergedData);
      setIsFetching(false);
    }
  }, [siteData, reset]);

  const loadAboutSettings = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load about settings");
      }
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        updateSiteDataSection({
          section: "aboutSettings",
          data: data,
        }),
      ).unwrap();

      toast.success("About settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update about settings");
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
          About Page Settings
        </h1>
        <p className="text-gray-600">
          Manage about page content including hero section, our story, core
          values, and statistics.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                placeholder="ABOUT US"
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
                placeholder="TRANSFORMING BUSINESSES THROUGH INNOVATIVE DIGITAL SOLUTIONS..."
              />
              {errors.heroSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroSubtitle.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiBookOpen className="text-orange-500" />
            Our Story Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Title
              </label>
              <input
                type="text"
                {...register("storyTitle", {
                  required: "Story title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Transforming Businesses Through Innovation"
              />
              {errors.storyTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.storyTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Paragraph 1
              </label>
              <textarea
                {...register("storyParagraph1", {
                  required: "Story paragraph 1 is required",
                })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="SAANVI INNOVATION is a leading software..."
              />
              {errors.storyParagraph1 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.storyParagraph1.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Paragraph 2
              </label>
              <textarea
                {...register("storyParagraph2", {
                  required: "Story paragraph 2 is required",
                })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="We specialize in creating scalable..."
              />
              {errors.storyParagraph2 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.storyParagraph2.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Story Image URL
              </label>
              <input
                type="url"
                {...register("storyImage", {
                  required: "Story image URL is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="https://images.unsplash.com/..."
              />
              {errors.storyImage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.storyImage.message}
                </p>
              )}
              {storyImage && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preview
                  </label>
                  <div className="border border-gray-300 rounded-md p-4 bg-gray-50 flex items-center justify-center h-48">
                    <img
                      src={storyImage}
                      alt="Story Image Preview"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <p
                      className="text-sm text-red-500 hidden"
                      style={{ display: "none" }}
                    >
                      Failed to load image
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality Badge Title
              </label>
              <input
                type="text"
                {...register("qualityBadgeTitle", {
                  required: "Quality badge title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Quality First"
              />
              {errors.qualityBadgeTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.qualityBadgeTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quality Badge Text
              </label>
              <input
                type="text"
                {...register("qualityBadgeText", {
                  required: "Quality badge text is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Excellence in every project we deliver"
              />
              {errors.qualityBadgeText && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.qualityBadgeText.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiAward className="text-orange-500" />
            Core Values Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Core Values Title
              </label>
              <input
                type="text"
                {...register("coreValuesTitle", {
                  required: "Core values title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Principles That Guide Us"
              />
              {errors.coreValuesTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.coreValuesTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Core Values Image URL
              </label>
              <input
                type="url"
                {...register("coreValuesImage", {
                  required: "Core values image URL is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="https://images.unsplash.com/..."
              />
              {errors.coreValuesImage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.coreValuesImage.message}
                </p>
              )}
              {coreValuesImage && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preview
                  </label>
                  <div className="border border-gray-300 rounded-md p-4 bg-gray-50 flex items-center justify-center h-48">
                    <img
                      src={coreValuesImage}
                      alt="Core Values Image Preview"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <p
                      className="text-sm text-red-500 hidden"
                      style={{ display: "none" }}
                    >
                      Failed to load image
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiTrendingUp className="text-orange-500" />
            Statistics Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stats Section Title
              </label>
              <input
                type="text"
                {...register("statsTitle", {
                  required: "Stats title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Numbers That Speak for Themselves"
              />
              {errors.statsTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.statsTitle.message}
                </p>
              )}
            </div>

            {/* Projects Stat */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Projects Value
                </label>
                <input
                  type="text"
                  {...register("statsProjectsValue", {
                    required: "Projects value is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="50+"
                />
                {errors.statsProjectsValue && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.statsProjectsValue.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Projects Label
                </label>
                <input
                  type="text"
                  {...register("statsProjectsLabel", {
                    required: "Projects label is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Projects Completed"
                />
                {errors.statsProjectsLabel && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.statsProjectsLabel.message}
                  </p>
                )}
              </div>
            </div>

            {/* Clients Stat */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clients Value
                </label>
                <input
                  type="text"
                  {...register("statsClientsValue", {
                    required: "Clients value is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="30+"
                />
                {errors.statsClientsValue && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.statsClientsValue.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clients Label
                </label>
                <input
                  type="text"
                  {...register("statsClientsLabel", {
                    required: "Clients label is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Happy Clients"
                />
                {errors.statsClientsLabel && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.statsClientsLabel.message}
                  </p>
                )}
              </div>
            </div>

            {/* Experience Stat */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Value
                </label>
                <input
                  type="text"
                  {...register("statsExperienceValue", {
                    required: "Experience value is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="5+"
                />
                {errors.statsExperienceValue && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.statsExperienceValue.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Label
                </label>
                <input
                  type="text"
                  {...register("statsExperienceLabel", {
                    required: "Experience label is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Years Experience"
                />
                {errors.statsExperienceLabel && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.statsExperienceLabel.message}
                  </p>
                )}
              </div>
            </div>

            {/* Team Stat */}
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Value
                </label>
                <input
                  type="text"
                  {...register("statsTeamValue", {
                    required: "Team value is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="15+"
                />
                {errors.statsTeamValue && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.statsTeamValue.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Label
                </label>
                <input
                  type="text"
                  {...register("statsTeamLabel", {
                    required: "Team label is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Team Members"
                />
                {errors.statsTeamLabel && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.statsTeamLabel.message}
                  </p>
                )}
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

export default AboutSettings;
