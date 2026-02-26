import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSave,
  FiPlus,
  FiTrash2,
  FiImage,
  FiUpload,
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

function SiteInfo() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);
  const [logoPreview, setLogoPreview] = useState("");

  // Valid social media types
  const VALID_SOCIAL_TYPES = [
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Instagram",
    "YouTube",
    "WhatsApp",
  ];

  const { register, handleSubmit, control, reset, watch, setValue } = useForm({
    defaultValues: {
      siteName: "SAANVI INNOVATION",
      tagline: "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES",
      useLogo: false,
      logoUrl: "",
      phone: "+91 7999840475",
      email: "CEO@SAANVIINNOVATION.COM",
      address: "21, NEHRU COLONY, THATIPUR\nGWALIOR (M.P)",
      socialLinks: [
        { type: "Facebook", url: "#" },
        { type: "Twitter", url: "#" },
        { type: "LinkedIn", url: "#" },
        { type: "Instagram", url: "#" },
        { type: "YouTube", url: "#" },
        { type: "WhatsApp", url: "#" },
      ],
    },
  });

  const {
    fields: socialLinksFields,
    append: appendSocialLink,
    remove: removeSocialLink,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const useLogo = watch("useLogo");
  const logoUrl = watch("logoUrl");

  // Initialize image upload hook
  const {
    isUploading,
    isDeleting,
    fileInputRef,
    handleFileSelect,
    handleDeleteImage,
    triggerFileInput,
  } = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("logoUrl", url);
    },
    onDeleteSuccess: () => {
      setValue("logoUrl", "");
      setLogoPreview("");
    },
    onSaveForm: async () => {
      // Get current form values and save
      const formData = watch();
      await saveFormData(formData, true); // Pass true to skip toast in saveFormData
    },
    saveSuccessMessage: "Changes saved successfully",
  });

  useEffect(() => {
    loadSiteInfo();
  }, []);

  useEffect(() => {
    // Update logo preview when logoUrl changes
    if (logoUrl && logoUrl.trim()) {
      setLogoPreview(getFullImageUrl(logoUrl));
    } else {
      setLogoPreview("");
    }
  }, [logoUrl]);

  useEffect(() => {
    if (siteData !== null) {
      const siteInfo = siteData?.siteinfo || {};

      // Default values
      const defaultData = {
        siteName: "SAANVI INNOVATION",
        tagline:
          "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES",
        useLogo: false,
        logoUrl: "",
        phone: "+91 7999840475",
        email: "CEO@SAANVIINNOVATION.COM",
        address: "21, NEHRU COLONY, THATIPUR\nGWALIOR (M.P)",
        socialLinks: [
          { type: "Facebook", url: "#" },
          { type: "Twitter", url: "#" },
          { type: "LinkedIn", url: "#" },
          { type: "Instagram", url: "#" },
          { type: "YouTube", url: "#" },
          { type: "WhatsApp", url: "#" },
        ],
      };

      // Merge with defaults
      const mergedData = {
        siteName: siteInfo.siteName || defaultData.siteName,
        tagline: siteInfo.tagline || defaultData.tagline,
        useLogo: siteInfo.useLogo || defaultData.useLogo,
        logoUrl: siteInfo.logoUrl || defaultData.logoUrl,
        phone: siteInfo.phone || defaultData.phone,
        email: siteInfo.email || defaultData.email,
        address: siteInfo.address || defaultData.address,
        socialLinks:
          siteInfo.socialLinks && siteInfo.socialLinks.length > 0
            ? siteInfo.socialLinks.map((link) => ({
                type: link.type || "",
                url: link.url || "",
              }))
            : defaultData.socialLinks,
      };

      reset(mergedData);
      setIsFetching(false);
    }
  }, [siteData, reset]);

  const loadSiteInfo = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load site information");
      }
      setIsFetching(false);
    }
  };

  // Function to add social link with validation
  const handleAddSocialLink = () => {
    const currentTypes = socialLinksFields.map((field) => field.type);

    if (currentTypes.length >= VALID_SOCIAL_TYPES.length) {
      toast.error("All social media platforms have been added");
      return;
    }

    const unusedType = VALID_SOCIAL_TYPES.find(
      (type) => !currentTypes.includes(type),
    );

    if (unusedType) {
      appendSocialLink({ type: unusedType, url: "#" });
    } else {
      toast.error("All social media platforms have been added");
    }
  };

  // Generic function to save form data
  const saveFormData = async (data, skipToast = false) => {
    try {
      // Default values
      const defaults = {
        siteName: "SAANVI INNOVATION",
        tagline:
          "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES",
        phone: "+91 7999840475",
        email: "CEO@SAANVIINNOVATION.COM",
        address: "21, NEHRU COLONY, THATIPUR\nGWALIOR (M.P)",
      };

      // Validate social links
      const invalidLinks = data.socialLinks?.filter(
        (link) => link.type && !VALID_SOCIAL_TYPES.includes(link.type),
      );

      if (invalidLinks && invalidLinks.length > 0) {
        toast.error(
          "Please select a valid social media platform from the dropdown",
        );
        return;
      }

      // Check for duplicate social media types
      const socialTypes = data.socialLinks
        ?.filter((link) => link.type)
        .map((link) => link.type);
      const duplicateTypes = socialTypes?.filter(
        (type, index) => socialTypes.indexOf(type) !== index,
      );

      if (duplicateTypes && duplicateTypes.length > 0) {
        toast.error(
          `Duplicate social media platform found: ${duplicateTypes[0]}. Each platform can only be added once.`,
        );
        return;
      }

      // Clean and validate data
      const cleanedData = {
        siteName: data.siteName?.trim() || defaults.siteName,
        tagline: data.tagline?.trim() || defaults.tagline,
        useLogo: data.useLogo || false,
        logoUrl: data.logoUrl?.trim() || "",
        phone: data.phone?.trim() || defaults.phone,
        email: data.email?.trim() || defaults.email,
        address: data.address?.trim() || defaults.address,
        socialLinks:
          data.socialLinks
            ?.filter((link) => {
              const hasValidType =
                link.type && VALID_SOCIAL_TYPES.includes(link.type);
              const hasUrl = link.url && link.url.trim();
              return hasValidType && hasUrl;
            })
            ?.map((link) => ({
              type: link.type.trim(),
              url: link.url.trim(),
            })) || [],
      };

      await dispatch(
        updateSiteDataSection({ section: "siteinfo", data: cleanedData }),
      ).unwrap();

      if (!skipToast) {
        toast.success("Changes saved successfully");
      }
    } catch (error) {
      toast.error(error || "Failed to save changes");
      throw error; // Re-throw to handle in upload hook
    }
  };

  const handleRemoveLogo = async () => {
    const currentLogoUrl = logoUrl;
    if (currentLogoUrl && currentLogoUrl.trim()) {
      // Delete image from server and save form
      await handleDeleteImage(currentLogoUrl);
    } else {
      // Just clear the preview if no URL
      setValue("logoUrl", "");
      setLogoPreview("");
    }
  };

  const onSubmit = async (data) => {
    await saveFormData(data);
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Site Information
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            {/* Site Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Site Name
              </label>
              <input
                type="text"
                {...register("siteName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter site name"
              />
            </div>

            {/* Tagline */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tagline
              </label>
              <input
                type="text"
                {...register("tagline")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter site tagline"
              />
            </div>

            {/* Use Logo */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register("useLogo")}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-gray-700 font-medium">Use Logo</span>
              </label>
            </div>

            {/* Logo Upload */}
            {useLogo && (
              <div className="space-y-4">
                <label className="block text-gray-700 font-medium mb-2">
                  <FiImage className="inline mr-2" />
                  Logo
                </label>

                {/* Hidden input to store logoUrl */}
                <input type="hidden" {...register("logoUrl")} />

                {/* Logo Preview */}
                {logoPreview && (
                  <div className="mb-4">
                    <div className="relative inline-block">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="h-32 w-auto max-w-xs border-2 border-gray-300 rounded-lg object-contain bg-white p-3 shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          toast.error("Failed to load logo preview");
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        disabled={isDeleting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove logo"
                      >
                        {isDeleting ? (
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
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    disabled={isUploading}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiUpload size={18} />
                        <span>
                          {logoPreview ? "Change Logo" : "Upload Logo"}
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Supported formats: JPEG, PNG, GIF, WEBP, SVG (Max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FiPhone className="inline mr-2" />
                Phone
              </label>
              <input
                type="text"
                {...register("phone")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter phone number"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FiMail className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter email address"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FiMapPin className="inline mr-2" />
                Address
              </label>
              <textarea
                {...register("address")}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter address"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Social Media Links
            </h2>
            <button
              type="button"
              onClick={handleAddSocialLink}
              className="flex items-center space-x-2 text-orange-500 hover:text-orange-600"
            >
              <FiPlus />
              <span>Add Social Link</span>
            </button>
          </div>
          <div className="space-y-3">
            {socialLinksFields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-center">
                <select
                  {...register(`socialLinks.${index}.type`)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                >
                  <option value="">Select Platform</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
                <input
                  type="text"
                  {...register(`socialLinks.${index}.url`)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="Social media URL"
                />
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center space-x-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default SiteInfo;
