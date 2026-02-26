import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiSave,
  FiGrid,
  FiAward,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiUpload,
  FiImage,
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

function ServicesSettings() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);
  const [services, setServices] = useState([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    title: "",
    description: "",
    icon: "FiGlobe",
    gradient: "from-orange-500 to-orange-600",
  });
  const [heroImagePreview, setHeroImagePreview] = useState("");
  const [whyChooseImagePreview, setWhyChooseImagePreview] = useState("");
  const [ctaImagePreview, setCtaImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      heroTitle: "Dedicated to Your Digital Success",
      heroDescription:
        "We deliver scalable and modern digital solutions tailored to your business goals. Partner with experienced professionals committed to long-term growth and measurable success.",
      heroImage: "",
      servicesGridTitle: "Our Services",
      servicesGridSubtitle:
        "Comprehensive digital solutions tailored to your business needs.",
      whyChooseTitle: "Your Success is Our Commitment",
      whyChooseSubtitle:
        "Here's what makes us the right technology partner for your business.",
      whyChooseDescription:
        "Welcome to SAANVI INNOVATION, where innovation meets reliability. We provide scalable digital solutions tailored to your business needs — from web development to advanced technical systems — delivered with expertise, precision, and long-term vision.",
      whyChooseFeature1: "Experienced & Certified Developers",
      whyChooseFeature2: "24/7 Technical Support",
      whyChooseFeature3: "Advanced Technology Stack",
      whyChooseFeature4: "Client-Centric Approach",
      whyChooseFeature5: "Seamless Project Management",
      whyChooseImage: "",
      ctaTitle: "Ready to Elevate Your Business?",
      ctaSubtitle:
        "Partner with experienced professionals to build scalable, modern digital solutions tailored to your business goals.",
      ctaImage: "",
    },
  });

  // Watch image URLs for preview (must be after useForm)
  const heroImage = watch("heroImage");
  const whyChooseImage = watch("whyChooseImage");
  const ctaImage = watch("ctaImage");

  // Image upload hooks
  const heroImageUpload = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("heroImage", url);
    },
    onDeleteSuccess: () => {
      setValue("heroImage", "");
      setHeroImagePreview("");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData, true);
    },
    saveSuccessMessage: "Hero image updated successfully",
  });

  const whyChooseImageUpload = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("whyChooseImage", url);
    },
    onDeleteSuccess: () => {
      setValue("whyChooseImage", "");
      setWhyChooseImagePreview("");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData, true);
    },
    saveSuccessMessage: "Why choose image updated successfully",
  });

  const ctaImageUpload = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("ctaImage", url);
    },
    onDeleteSuccess: () => {
      setValue("ctaImage", "");
      setCtaImagePreview("");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData, true);
    },
    saveSuccessMessage: "CTA image updated successfully",
  });

  useEffect(() => {
    loadServicesSettings();
  }, []);

  // Update image previews when URLs change
  useEffect(() => {
    if (heroImage && heroImage.trim()) {
      setHeroImagePreview(getFullImageUrl(heroImage));
    } else {
      setHeroImagePreview("");
    }
  }, [heroImage]);

  useEffect(() => {
    if (whyChooseImage && whyChooseImage.trim()) {
      setWhyChooseImagePreview(getFullImageUrl(whyChooseImage));
    } else {
      setWhyChooseImagePreview("");
    }
  }, [whyChooseImage]);

  useEffect(() => {
    if (ctaImage && ctaImage.trim()) {
      setCtaImagePreview(getFullImageUrl(ctaImage));
    } else {
      setCtaImagePreview("");
    }
  }, [ctaImage]);

  useEffect(() => {
    if (siteData !== null) {
      const servicesSettings = siteData?.servicesSettings || {};
      const servicesData = siteData?.services || [];

      const defaultData = {
        heroTitle: "Dedicated to Your Digital Success",
        heroDescription:
          "We deliver scalable and modern digital solutions tailored to your business goals. Partner with experienced professionals committed to long-term growth and measurable success.",
        heroImage: "",
        servicesGridTitle: "Our Services",
        servicesGridSubtitle:
          "Comprehensive digital solutions tailored to your business needs.",
        whyChooseTitle: "Your Success is Our Commitment",
        whyChooseSubtitle:
          "Here's what makes us the right technology partner for your business.",
        whyChooseDescription:
          "Welcome to SAANVI INNOVATION, where innovation meets reliability. We provide scalable digital solutions tailored to your business needs — from web development to advanced technical systems — delivered with expertise, precision, and long-term vision.",
        whyChooseFeature1: "Experienced & Certified Developers",
        whyChooseFeature2: "24/7 Technical Support",
        whyChooseFeature3: "Advanced Technology Stack",
        whyChooseFeature4: "Client-Centric Approach",
        whyChooseFeature5: "Seamless Project Management",
        whyChooseImage: "",
        ctaTitle: "Ready to Elevate Your Business?",
        ctaSubtitle:
          "Partner with experienced professionals to build scalable, modern digital solutions tailored to your business goals.",
        ctaImage: "",
      };

      const mergedData = {
        heroTitle: servicesSettings.heroTitle || defaultData.heroTitle,
        heroDescription:
          servicesSettings.heroDescription || defaultData.heroDescription,
        heroImage: servicesSettings.heroImage || defaultData.heroImage,
        servicesGridTitle:
          servicesSettings.servicesGridTitle || defaultData.servicesGridTitle,
        servicesGridSubtitle:
          servicesSettings.servicesGridSubtitle ||
          defaultData.servicesGridSubtitle,
        whyChooseTitle:
          servicesSettings.whyChooseTitle || defaultData.whyChooseTitle,
        whyChooseSubtitle:
          servicesSettings.whyChooseSubtitle || defaultData.whyChooseSubtitle,
        whyChooseDescription:
          servicesSettings.whyChooseDescription ||
          defaultData.whyChooseDescription,
        whyChooseFeature1:
          servicesSettings.whyChooseFeature1 || defaultData.whyChooseFeature1,
        whyChooseFeature2:
          servicesSettings.whyChooseFeature2 || defaultData.whyChooseFeature2,
        whyChooseFeature3:
          servicesSettings.whyChooseFeature3 || defaultData.whyChooseFeature3,
        whyChooseFeature4:
          servicesSettings.whyChooseFeature4 || defaultData.whyChooseFeature4,
        whyChooseFeature5:
          servicesSettings.whyChooseFeature5 || defaultData.whyChooseFeature5,
        whyChooseImage:
          servicesSettings.whyChooseImage || defaultData.whyChooseImage,
        ctaTitle: servicesSettings.ctaTitle || defaultData.ctaTitle,
        ctaSubtitle: servicesSettings.ctaSubtitle || defaultData.ctaSubtitle,
        ctaImage: servicesSettings.ctaImage || defaultData.ctaImage,
      };

      reset(mergedData);
      setServices(servicesData);
      setIsFetching(false);
    }
  }, [siteData, reset]);

  const loadServicesSettings = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load services settings");
      }
      setIsFetching(false);
    }
  };

  const handleOpenServiceModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setServiceFormData({
        title: service.title || "",
        description: service.description || "",
        icon: service.icon || "FiGlobe",
        gradient: service.gradient || "from-orange-500 to-orange-600",
      });
    } else {
      setEditingService(null);
      setServiceFormData({
        title: "",
        description: "",
        icon: "FiGlobe",
        gradient: "from-orange-500 to-orange-600",
      });
    }
    setIsServiceModalOpen(true);
  };

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      id: editingService ? editingService.id : Date.now(),
      title: serviceFormData.title,
      description: serviceFormData.description,
      icon: serviceFormData.icon,
      gradient: serviceFormData.gradient,
    };

    let updatedServices;
    if (editingService) {
      updatedServices = services.map((s) =>
        s.id === editingService.id ? newService : s,
      );
    } else {
      updatedServices = [...services, newService];
    }

    try {
      await dispatch(
        updateSiteDataSection({
          section: "services",
          data: updatedServices,
        }),
      ).unwrap();

      toast.success(
        editingService
          ? "Service updated successfully!"
          : "Service added successfully!",
      );
      setServices(updatedServices);
      handleCloseServiceModal();
    } catch (error) {
      toast.error("Failed to save service");
      console.error("Save error:", error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    const updatedServices = services.filter((s) => s.id !== serviceId);

    try {
      await dispatch(
        updateSiteDataSection({
          section: "services",
          data: updatedServices,
        }),
      ).unwrap();

      toast.success("Service deleted successfully!");
      setServices(updatedServices);
    } catch (error) {
      toast.error("Failed to delete service");
    }
  };

  // Generic function to save form data
  const saveFormData = async (data, skipToast = false) => {
    try {
      await dispatch(
        updateSiteDataSection({
          section: "servicesSettings",
          data: data,
        }),
      ).unwrap();

      if (!skipToast) {
        toast.success("Changes saved.");
      }
    } catch (error) {
      toast.error("Failed to save changes.");
      throw error;
    }
  };

  const handleRemoveHeroImage = async () => {
    const currentImageUrl = heroImage;
    if (currentImageUrl && currentImageUrl.trim()) {
      await heroImageUpload.handleDeleteImage(currentImageUrl);
    } else {
      setValue("heroImage", "");
      setHeroImagePreview("");
    }
  };

  const handleRemoveWhyChooseImage = async () => {
    const currentImageUrl = whyChooseImage;
    if (currentImageUrl && currentImageUrl.trim()) {
      await whyChooseImageUpload.handleDeleteImage(currentImageUrl);
    } else {
      setValue("whyChooseImage", "");
      setWhyChooseImagePreview("");
    }
  };

  const handleRemoveCtaImage = async () => {
    const currentImageUrl = ctaImage;
    if (currentImageUrl && currentImageUrl.trim()) {
      await ctaImageUpload.handleDeleteImage(currentImageUrl);
    } else {
      setValue("ctaImage", "");
      setCtaImagePreview("");
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Services Page</h1>
        <p className="text-gray-600">
          Manage services page content including hero section, services grid,
          why choose us, and CTA section.
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
                placeholder="Dedicated to Your Digital Success"
              />
              {errors.heroTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Description
              </label>
              <textarea
                {...register("heroDescription", {
                  required: "Hero description is required",
                })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="We deliver scalable and modern digital solutions..."
              />
              {errors.heroDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroDescription.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiImage className="inline mr-1" />
                Hero Image
              </label>

              {/* Hidden input to store image URL */}
              <input type="hidden" {...register("heroImage")} />

              {/* Image Preview */}
              {heroImagePreview && (
                <div className="mb-3">
                  <div className="relative inline-block">
                    <img
                      src={heroImagePreview}
                      alt="Hero Image Preview"
                      className="h-48 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        toast.error("Failed to load image preview");
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveHeroImage}
                      disabled={heroImageUpload.isDeleting}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove image"
                    >
                      {heroImageUpload.isDeleting ? (
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
                  ref={heroImageUpload.fileInputRef}
                  onChange={heroImageUpload.handleFileSelect}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={heroImageUpload.triggerFileInput}
                  disabled={heroImageUpload.isUploading}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {heroImageUpload.isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload size={16} />
                      <span>
                        {heroImagePreview ? "Change Image" : "Upload Image"}
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

        {/* Services Grid Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiGrid className="text-orange-500" />
            Services Grid Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services Grid Title
              </label>
              <input
                type="text"
                {...register("servicesGridTitle", {
                  required: "Services grid title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Our Services"
              />
              {errors.servicesGridTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.servicesGridTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services Grid Subtitle
              </label>
              <textarea
                {...register("servicesGridSubtitle", {
                  required: "Services grid subtitle is required",
                })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Comprehensive digital solutions tailored to your business needs."
              />
              {errors.servicesGridSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.servicesGridSubtitle.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiAward className="text-orange-500" />
            Why Choose Us Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why Choose Title
              </label>
              <input
                type="text"
                {...register("whyChooseTitle", {
                  required: "Why choose title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your Success is Our Commitment"
              />
              {errors.whyChooseTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.whyChooseTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why Choose Subtitle
              </label>
              <input
                type="text"
                {...register("whyChooseSubtitle", {
                  required: "Why choose subtitle is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Here's what makes us the right technology partner..."
              />
              {errors.whyChooseSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.whyChooseSubtitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why Choose Description
              </label>
              <textarea
                {...register("whyChooseDescription", {
                  required: "Why choose description is required",
                })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Welcome to SAANVI INNOVATION, where innovation meets reliability..."
              />
              {errors.whyChooseDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.whyChooseDescription.message}
                </p>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Why Choose Features (5 items)
              </h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Feature {num}
                    </label>
                    <input
                      type="text"
                      {...register(`whyChooseFeature${num}`, {
                        required: `Feature ${num} is required`,
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder={`Feature ${num}`}
                    />
                    {errors[`whyChooseFeature${num}`] && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[`whyChooseFeature${num}`].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiImage className="inline mr-1" />
                Why Choose Image
              </label>

              {/* Hidden input to store image URL */}
              <input type="hidden" {...register("whyChooseImage")} />

              {/* Image Preview */}
              {whyChooseImagePreview && (
                <div className="mb-3">
                  <div className="relative inline-block">
                    <img
                      src={whyChooseImagePreview}
                      alt="Why Choose Image Preview"
                      className="h-48 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        toast.error("Failed to load image preview");
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveWhyChooseImage}
                      disabled={whyChooseImageUpload.isDeleting}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove image"
                    >
                      {whyChooseImageUpload.isDeleting ? (
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
                  ref={whyChooseImageUpload.fileInputRef}
                  onChange={whyChooseImageUpload.handleFileSelect}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={whyChooseImageUpload.triggerFileInput}
                  disabled={whyChooseImageUpload.isUploading}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {whyChooseImageUpload.isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload size={16} />
                      <span>
                        {whyChooseImagePreview
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

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            CTA Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Title
              </label>
              <input
                type="text"
                {...register("ctaTitle", {
                  required: "CTA title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Ready to Elevate Your Business?"
              />
              {errors.ctaTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ctaTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Subtitle
              </label>
              <textarea
                {...register("ctaSubtitle", {
                  required: "CTA subtitle is required",
                })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Partner with experienced professionals to build scalable..."
              />
              {errors.ctaSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ctaSubtitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiImage className="inline mr-1" />
                CTA Image
              </label>

              {/* Hidden input to store image URL */}
              <input type="hidden" {...register("ctaImage")} />

              {/* Image Preview */}
              {ctaImagePreview && (
                <div className="mb-3">
                  <div className="relative inline-block">
                    <img
                      src={ctaImagePreview}
                      alt="CTA Image Preview"
                      className="h-48 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        toast.error("Failed to load image preview");
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveCtaImage}
                      disabled={ctaImageUpload.isDeleting}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove image"
                    >
                      {ctaImageUpload.isDeleting ? (
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
                  ref={ctaImageUpload.fileInputRef}
                  onChange={ctaImageUpload.handleFileSelect}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={ctaImageUpload.triggerFileInput}
                  disabled={ctaImageUpload.isUploading}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {ctaImageUpload.isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <FiUpload size={16} />
                      <span>
                        {ctaImagePreview ? "Change Image" : "Upload Image"}
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

        {/* Services Cards Management */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiGrid className="text-orange-500" />
                Services Cards
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage service cards displayed on both Home and Services pages
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenServiceModal()}
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Service
            </button>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <FiGrid className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">
                No services added yet. Click "Add Service" to create one.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="relative group bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      {service.icon}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenServiceModal(service)}
                      className="bg-white p-1.5 rounded-md shadow-md hover:bg-orange-50 text-orange-600"
                      title="Edit"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteService(service.id)}
                      className="bg-white p-1.5 rounded-md shadow-md hover:bg-red-50 text-red-600"
                      title="Delete"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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

      {/* Service Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-lg sticky top-0 z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={handleCloseServiceModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleServiceSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={serviceFormData.title}
                  onChange={handleServiceInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Web Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={serviceFormData.description}
                  onChange={handleServiceInputChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Custom web applications built with modern technologies..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon <span className="text-red-500">*</span>
                </label>
                <select
                  name="icon"
                  value={serviceFormData.icon}
                  onChange={handleServiceInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="FiGlobe">Globe (Web)</option>
                  <option value="FiSmartphone">Smartphone (Mobile)</option>
                  <option value="FiCode">Code (Software)</option>
                  <option value="FiShoppingCart">
                    Shopping Cart (E-commerce)
                  </option>
                  <option value="FiCloud">Cloud (Cloud Services)</option>
                  <option value="FiTrendingUp">Trending Up (Marketing)</option>
                  <option value="FiDatabase">Database</option>
                  <option value="FiLayers">Layers</option>
                  <option value="FiSettings">Settings</option>
                  <option value="FiZap">Zap (Fast)</option>
                  <option value="FiShield">Shield (Security)</option>
                  <option value="FiCpu">CPU (Performance)</option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Select an icon that represents this service
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gradient Color <span className="text-red-500">*</span>
                </label>
                <select
                  name="gradient"
                  value={serviceFormData.gradient}
                  onChange={handleServiceInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="from-orange-500 to-orange-600">
                    Orange (Default)
                  </option>
                  <option value="from-orange-400 to-orange-500">
                    Light Orange
                  </option>
                  <option value="from-orange-500 to-orange-700">
                    Dark Orange
                  </option>
                  <option value="from-orange-600 to-orange-500">
                    Orange Reverse
                  </option>
                  <option value="from-orange-400 to-orange-600">
                    Orange Spread
                  </option>
                  <option value="from-red-500 to-orange-500">
                    Red to Orange
                  </option>
                  <option value="from-yellow-500 to-orange-500">
                    Yellow to Orange
                  </option>
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Choose the gradient color for the icon background
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseServiceModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave />
                      <span>{editingService ? "Update" : "Add"} Service</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServicesSettings;
