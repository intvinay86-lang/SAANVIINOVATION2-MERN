import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiSave,
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiUpload,
  FiImage,
  FiX,
} from "react-icons/fi";
import {
  getMainSiteData,
  updateSiteDataSection,
} from "../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";
import { getFullImageUrl } from "../../utils/imageUtils";
import { useImageUpload } from "../../hooks/useImageUpload";

function AboutSettings() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);
  const [storyImagePreview, setStoryImagePreview] = useState("");
  const [coreValuesImagePreview, setCoreValuesImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
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
      storyImage: "",
      qualityBadgeTitle: "Quality First",
      qualityBadgeText: "Excellence in every project we deliver",
      coreValuesTitle: "Principles That Guide Us",
      coreValuesImage: "",
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

  // Image upload hooks
  const storyImageUpload = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("storyImage", url);
    },
    onDeleteSuccess: () => {
      setValue("storyImage", "");
      setStoryImagePreview("");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData, true);
    },
    saveSuccessMessage: "Story image updated successfully",
  });

  const coreValuesImageUpload = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("coreValuesImage", url);
    },
    onDeleteSuccess: () => {
      setValue("coreValuesImage", "");
      setCoreValuesImagePreview("");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData, true);
    },
    saveSuccessMessage: "Core values image updated successfully",
  });

  useEffect(() => {
    loadAboutSettings();
  }, []);

  // Update image previews when URLs change
  useEffect(() => {
    if (storyImage && storyImage.trim()) {
      setStoryImagePreview(getFullImageUrl(storyImage));
    } else {
      setStoryImagePreview("");
    }
  }, [storyImage]);

  useEffect(() => {
    if (coreValuesImage && coreValuesImage.trim()) {
      setCoreValuesImagePreview(getFullImageUrl(coreValuesImage));
    } else {
      setCoreValuesImagePreview("");
    }
  }, [coreValuesImage]);

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
        storyImage: "",
        qualityBadgeTitle: "Quality First",
        qualityBadgeText: "Excellence in every project we deliver",
        coreValuesTitle: "Principles That Guide Us",
        coreValuesImage: "",
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

  // Generic function to save form data
  const saveFormData = async (data, skipToast = false) => {
    try {
      await dispatch(
        updateSiteDataSection({
          section: "aboutSettings",
          data: data,
        }),
      ).unwrap();

      if (!skipToast) {
        toast.success("About settings updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update about settings");
      console.error("Update error:", error);
      throw error;
    }
  };

  const handleRemoveStoryImage = async () => {
    const currentImageUrl = storyImage;
    if (currentImageUrl && currentImageUrl.trim()) {
      await storyImageUpload.handleDeleteImage(currentImageUrl);
    } else {
      setValue("storyImage", "");
      setStoryImagePreview("");
    }
  };

  const handleRemoveCoreValuesImage = async () => {
    const currentImageUrl = coreValuesImage;
    if (currentImageUrl && currentImageUrl.trim()) {
      await coreValuesImageUpload.handleDeleteImage(currentImageUrl);
    } else {
      setValue("coreValuesImage", "");
      setCoreValuesImagePreview("");
    }
  };

  const onSubmit = async (data) => {
    await saveFormData(data);
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">About Page</h1>
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
                <FiImage className="inline mr-1" />
                Story Image
              </label>

              {/* Hidden input to store image URL */}
              <input type="hidden" {...register("storyImage")} />

              {/* Image Preview */}
              {storyImagePreview && (
                <div className="mb-3">
                  <div className="relative inline-block">
                    <img
                      src={storyImagePreview}
                      alt="Story Image Preview"
                      className="h-48 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        toast.error("Failed to load image preview");
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveStoryImage}
                      disabled={storyImageUpload.isDeleting}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove image"
                    >
                      {storyImageUpload.isDeleting ? (
                        <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FiX size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div>
                <input
                  type="file"
                  ref={storyImageUpload.fileInputRef}
                  onChange={storyImageUpload.handleFileSelect}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={storyImageUpload.triggerFileInput}
                  disabled={storyImageUpload.isUploading}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {storyImageUpload.isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload size={16} />
                      <span>
                        {storyImagePreview ? "Change Image" : "Upload Image"}
                      </span>
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: JPEG, PNG, GIF, WEBP, SVG (Max 5MB)
                </p>
              </div>
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
                <FiImage className="inline mr-1" />
                Core Values Image
              </label>

              {/* Hidden input to store image URL */}
              <input type="hidden" {...register("coreValuesImage")} />

              {/* Image Preview */}
              {coreValuesImagePreview && (
                <div className="mb-3">
                  <div className="relative inline-block">
                    <img
                      src={coreValuesImagePreview}
                      alt="Core Values Image Preview"
                      className="h-48 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        toast.error("Failed to load image preview");
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveCoreValuesImage}
                      disabled={coreValuesImageUpload.isDeleting}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove image"
                    >
                      {coreValuesImageUpload.isDeleting ? (
                        <div className="w-[18px] h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <FiX size={18} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div>
                <input
                  type="file"
                  ref={coreValuesImageUpload.fileInputRef}
                  onChange={coreValuesImageUpload.handleFileSelect}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={coreValuesImageUpload.triggerFileInput}
                  disabled={coreValuesImageUpload.isUploading}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {coreValuesImageUpload.isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload size={16} />
                      <span>
                        {coreValuesImagePreview
                          ? "Change Image"
                          : "Upload Image"}
                      </span>
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: JPEG, PNG, GIF, WEBP, SVG (Max 5MB)
                </p>
              </div>
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
