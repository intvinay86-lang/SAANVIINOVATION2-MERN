import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiSave,
  FiHome,
  FiUsers,
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

function HomeSettings() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);
  const [clients, setClients] = useState([]);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clientFormData, setClientFormData] = useState({
    name: "",
    logo: "",
  });
  const [aboutImage1Preview, setAboutImage1Preview] = useState("");
  const [aboutImage2Preview, setAboutImage2Preview] = useState("");
  const [aboutImage3Preview, setAboutImage3Preview] = useState("");
  const [clientLogoPreview, setClientLogoPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      heroTitle1: "WHERE INNOVATION",
      heroTitle2: "MEETS IMPACT",
      heroDescription:
        "CUTTING-EDGE TECHNOLOGY MEETS CREATIVE EXCELLENCE. TRANSFORMING IDEAS INTO DIGITAL REALITY — WEB DEVELOPMENT, MOBILE APPS, AND COMPREHENSIVE DIGITAL SOLUTIONS.",
      heroStat1Value: "50+",
      heroStat1Label: "Projects Delivered",
      heroStat2Value: "30+",
      heroStat2Label: "Happy Clients",
      heroStat3Value: "5+",
      heroStat3Label: "Years Experience",
      aboutTitle: "SAANVI INNOVATION",
      aboutParagraph1:
        "Where we elevate digital experiences in web development, mobile applications, and enterprise solutions across India.",
      aboutParagraph2:
        "Our mission is to deliver innovative technology solutions that energize your business and enhance your digital presence.",
      aboutParagraph3:
        "We have a network of satisfied clients across multiple states including Madhya Pradesh, Maharashtra, and Gujarat.",
      aboutImage1: "",
      aboutImage2: "",
      aboutImage3: "",
      clientsSectionBadge: "Trusted Partners",
      clientsSectionTitle: "Our Clients",
      clientsSectionDescription:
        "Trusted by leading companies worldwide to deliver exceptional digital solutions and drive business growth.",
      seoTitle: "SAANVI INNOVATION | Home",
      seoDescription:
        "Delivers innovative digital solutions including web development, mobile apps, software development, and digital marketing services to help businesses grow.",
      seoKeywords:
        "web development, mobile app development, software development, digital marketing, e-commerce solutions",
      seoOgTitle: "Innovative Digital Solutions",
      seoOgDescription:
        "Professional web development, mobile apps, and digital solutions for modern businesses.",
      seoOgType: "website",
    },
  });

  // Watch image URLs for preview (must be after useForm)
  const aboutImage1 = watch("aboutImage1");
  const aboutImage2 = watch("aboutImage2");
  const aboutImage3 = watch("aboutImage3");

  // Image upload hooks for about images
  const aboutImage1Upload = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("aboutImage1", url);
    },
    onDeleteSuccess: () => {
      setValue("aboutImage1", "");
      setAboutImage1Preview("");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData, true);
    },
    saveSuccessMessage: "About image 1 updated successfully",
  });

  const aboutImage2Upload = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("aboutImage2", url);
    },
    onDeleteSuccess: () => {
      setValue("aboutImage2", "");
      setAboutImage2Preview("");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData, true);
    },
    saveSuccessMessage: "About image 2 updated successfully",
  });

  const aboutImage3Upload = useImageUpload({
    onUploadSuccess: (url) => {
      setValue("aboutImage3", url);
    },
    onDeleteSuccess: () => {
      setValue("aboutImage3", "");
      setAboutImage3Preview("");
    },
    onSaveForm: async () => {
      const formData = watch();
      await saveFormData(formData, true);
    },
    saveSuccessMessage: "About image 3 updated successfully",
  });

  // Image upload hook for client logos
  const clientLogoUpload = useImageUpload({
    onUploadSuccess: (url) => {
      setClientFormData((prev) => ({ ...prev, logo: url }));
    },
    onDeleteSuccess: () => {
      setClientFormData((prev) => ({ ...prev, logo: "" }));
      setClientLogoPreview("");
    },
    saveSuccessMessage: "Client logo uploaded successfully",
  });

  useEffect(() => {
    loadHomeSettings();
  }, []);

  // Update image previews when URLs change
  useEffect(() => {
    if (aboutImage1 && aboutImage1.trim()) {
      setAboutImage1Preview(getFullImageUrl(aboutImage1));
    } else {
      setAboutImage1Preview("");
    }
  }, [aboutImage1]);

  useEffect(() => {
    if (aboutImage2 && aboutImage2.trim()) {
      setAboutImage2Preview(getFullImageUrl(aboutImage2));
    } else {
      setAboutImage2Preview("");
    }
  }, [aboutImage2]);

  useEffect(() => {
    if (aboutImage3 && aboutImage3.trim()) {
      setAboutImage3Preview(getFullImageUrl(aboutImage3));
    } else {
      setAboutImage3Preview("");
    }
  }, [aboutImage3]);

  useEffect(() => {
    if (clientFormData.logo && clientFormData.logo.trim()) {
      setClientLogoPreview(getFullImageUrl(clientFormData.logo));
    } else {
      setClientLogoPreview("");
    }
  }, [clientFormData.logo]);

  useEffect(() => {
    if (siteData !== null) {
      const homeSettings = siteData?.homeSettings || {};
      const clientsData = siteData?.clients || [];

      const defaultData = {
        heroTitle1: "WHERE INNOVATION",
        heroTitle2: "MEETS IMPACT",
        heroDescription:
          "CUTTING-EDGE TECHNOLOGY MEETS CREATIVE EXCELLENCE. TRANSFORMING IDEAS INTO DIGITAL REALITY — WEB DEVELOPMENT, MOBILE APPS, AND COMPREHENSIVE DIGITAL SOLUTIONS.",
        heroStat1Value: "50+",
        heroStat1Label: "Projects Delivered",
        heroStat2Value: "30+",
        heroStat2Label: "Happy Clients",
        heroStat3Value: "5+",
        heroStat3Label: "Years Experience",
        aboutTitle: "SAANVI INNOVATION",
        aboutParagraph1:
          "Where we elevate digital experiences in web development, mobile applications, and enterprise solutions across India.",
        aboutParagraph2:
          "Our mission is to deliver innovative technology solutions that energize your business and enhance your digital presence.",
        aboutParagraph3:
          "We have a network of satisfied clients across multiple states including Madhya Pradesh, Maharashtra, and Gujarat.",
        aboutImage1: "",
        aboutImage2: "",
        aboutImage3: "",
        clientsSectionBadge: "Trusted Partners",
        clientsSectionTitle: "Our Clients",
        clientsSectionDescription:
          "Trusted by leading companies worldwide to deliver exceptional digital solutions and drive business growth.",
        seoTitle: "SAANVI INNOVATION | Home",
        seoDescription:
          "Delivers innovative digital solutions including web development, mobile apps, software development, and digital marketing services to help businesses grow.",
        seoKeywords:
          "web development, mobile app development, software development, digital marketing, e-commerce solutions",
        seoOgTitle: "Innovative Digital Solutions",
        seoOgDescription:
          "Professional web development, mobile apps, and digital solutions for modern businesses.",
        seoOgType: "website",
      };

      const mergedData = {
        heroTitle1: homeSettings.heroTitle1 || defaultData.heroTitle1,
        heroTitle2: homeSettings.heroTitle2 || defaultData.heroTitle2,
        heroDescription:
          homeSettings.heroDescription || defaultData.heroDescription,
        heroStat1Value:
          homeSettings.heroStat1Value || defaultData.heroStat1Value,
        heroStat1Label:
          homeSettings.heroStat1Label || defaultData.heroStat1Label,
        heroStat2Value:
          homeSettings.heroStat2Value || defaultData.heroStat2Value,
        heroStat2Label:
          homeSettings.heroStat2Label || defaultData.heroStat2Label,
        heroStat3Value:
          homeSettings.heroStat3Value || defaultData.heroStat3Value,
        heroStat3Label:
          homeSettings.heroStat3Label || defaultData.heroStat3Label,
        aboutTitle: homeSettings.aboutTitle || defaultData.aboutTitle,
        aboutParagraph1:
          homeSettings.aboutParagraph1 || defaultData.aboutParagraph1,
        aboutParagraph2:
          homeSettings.aboutParagraph2 || defaultData.aboutParagraph2,
        aboutParagraph3:
          homeSettings.aboutParagraph3 || defaultData.aboutParagraph3,
        aboutImage1: homeSettings.aboutImage1 || defaultData.aboutImage1,
        aboutImage2: homeSettings.aboutImage2 || defaultData.aboutImage2,
        aboutImage3: homeSettings.aboutImage3 || defaultData.aboutImage3,
        clientsSectionBadge:
          homeSettings.clientsSectionBadge || defaultData.clientsSectionBadge,
        clientsSectionTitle:
          homeSettings.clientsSectionTitle || defaultData.clientsSectionTitle,
        clientsSectionDescription:
          homeSettings.clientsSectionDescription ||
          defaultData.clientsSectionDescription,
        seoTitle: homeSettings.seo?.title || defaultData.seoTitle,
        seoDescription:
          homeSettings.seo?.description || defaultData.seoDescription,
        seoKeywords: homeSettings.seo?.keywords || defaultData.seoKeywords,
        seoOgTitle: homeSettings.seo?.ogTitle || defaultData.seoOgTitle,
        seoOgDescription:
          homeSettings.seo?.ogDescription || defaultData.seoOgDescription,
        seoOgType: homeSettings.seo?.ogType || defaultData.seoOgType,
      };

      reset(mergedData);
      setClients(clientsData);
      setIsFetching(false);
    }
  }, [siteData, reset]);

  const loadHomeSettings = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load home settings");
      }
      setIsFetching(false);
    }
  };

  const handleOpenClientModal = (client = null) => {
    if (client) {
      setEditingClient(client);
      setClientFormData({
        name: client.name || "",
        logo: client.logo || "",
      });
    } else {
      setEditingClient(null);
      setClientFormData({
        name: "",
        logo: "",
      });
    }
    setIsClientModalOpen(true);
  };

  const handleCloseClientModal = () => {
    setIsClientModalOpen(false);
    setEditingClient(null);
  };

  const handleClientInputChange = (e) => {
    const { name, value } = e.target;
    setClientFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();

    // Validate that logo is uploaded
    if (!clientFormData.logo || !clientFormData.logo.trim()) {
      toast.error("Please upload a client logo");
      return;
    }

    const newClient = {
      id: editingClient ? editingClient.id : Date.now(),
      name: clientFormData.name,
      logo: clientFormData.logo,
    };

    let updatedClients;
    if (editingClient) {
      updatedClients = clients.map((c) =>
        c.id === editingClient.id ? newClient : c,
      );
    } else {
      updatedClients = [...clients, newClient];
    }

    try {
      await dispatch(
        updateSiteDataSection({
          section: "clients",
          data: updatedClients,
        }),
      ).unwrap();

      toast.success(
        editingClient
          ? "Client updated successfully!"
          : "Client added successfully!",
      );
      setClients(updatedClients);
      handleCloseClientModal();
    } catch (error) {
      toast.error("Failed to save client");
      console.error("Save error:", error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    const updatedClients = clients.filter((c) => c.id !== clientId);

    try {
      await dispatch(
        updateSiteDataSection({
          section: "clients",
          data: updatedClients,
        }),
      ).unwrap();

      toast.success("Client deleted successfully!");
      setClients(updatedClients);
    } catch (error) {
      toast.error("Failed to delete client");
      console.error("Delete error:", error);
    }
  };

  // Generic function to save form data
  const saveFormData = async (data, skipToast = false) => {
    try {
      // Separate SEO data from other settings
      const {
        seoTitle,
        seoDescription,
        seoKeywords,
        seoOgTitle,
        seoOgDescription,
        seoOgType,
        ...otherSettings
      } = data;

      const homeSettingsData = {
        ...otherSettings,
        seo: {
          title: seoTitle,
          description: seoDescription,
          keywords: seoKeywords,
          ogTitle: seoOgTitle,
          ogDescription: seoOgDescription,
          ogType: seoOgType,
        },
      };

      await dispatch(
        updateSiteDataSection({
          section: "homeSettings",
          data: homeSettingsData,
        }),
      ).unwrap();

      if (!skipToast) {
        toast.success("Home settings updated successfully!");
      }
    } catch (error) {
      toast.error("Failed to update home settings");
      console.error("Update error:", error);
      throw error;
    }
  };

  const handleRemoveAboutImage = async (imageNumber) => {
    const imageField = `aboutImage${imageNumber}`;
    const currentImageUrl = watch(imageField);

    if (currentImageUrl && currentImageUrl.trim()) {
      // Delete image from server and save form
      if (imageNumber === 1) {
        await aboutImage1Upload.handleDeleteImage(currentImageUrl);
      } else if (imageNumber === 2) {
        await aboutImage2Upload.handleDeleteImage(currentImageUrl);
      } else if (imageNumber === 3) {
        await aboutImage3Upload.handleDeleteImage(currentImageUrl);
      }
    } else {
      // Just clear the preview if no URL
      setValue(imageField, "");
      if (imageNumber === 1) setAboutImage1Preview("");
      else if (imageNumber === 2) setAboutImage2Preview("");
      else if (imageNumber === 3) setAboutImage3Preview("");
    }
  };

  const handleRemoveClientLogo = async () => {
    const currentLogoUrl = clientFormData.logo;
    if (currentLogoUrl && currentLogoUrl.trim()) {
      // Delete image from server
      await clientLogoUpload.handleDeleteImage(currentLogoUrl);
    } else {
      // Just clear the preview if no URL
      setClientFormData((prev) => ({ ...prev, logo: "" }));
      setClientLogoPreview("");
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Home Page</h1>
        <p className="text-gray-600">
          Manage home page content including hero section, about section, and
          clients section. Services and Portfolio sections are managed
          separately.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* SEO Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiHome className="text-orange-500" />
            SEO Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("seoTitle", {
                  required: "Page title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="SAANVI INNOVATION | Home"
              />
              {errors.seoTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.seoTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("seoDescription", {
                  required: "Meta description is required",
                })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Delivers innovative digital solutions..."
              />
              {errors.seoDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.seoDescription.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Keywords <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("seoKeywords", {
                  required: "Meta keywords are required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="web development, mobile app development, software development"
              />
              {errors.seoKeywords && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.seoKeywords.message}
                </p>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Open Graph (Social Media)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("seoOgTitle", {
                      required: "OG title is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Innovative Digital Solutions"
                  />
                  {errors.seoOgTitle && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.seoOgTitle.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("seoOgDescription", {
                      required: "OG description is required",
                    })}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Professional web development, mobile apps, and digital solutions..."
                  />
                  {errors.seoOgDescription && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.seoOgDescription.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("seoOgType", {
                      required: "OG type is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    placeholder="website"
                  />
                  {errors.seoOgType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.seoOgType.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiHome className="text-orange-500" />
            Hero Section
          </h2>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Title Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("heroTitle1", {
                    required: "Hero title line 1 is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="WHERE INNOVATION"
                />
                {errors.heroTitle1 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.heroTitle1.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Title Line 2 (Orange){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("heroTitle2", {
                    required: "Hero title line 2 is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="MEETS IMPACT"
                />
                {errors.heroTitle2 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.heroTitle2.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("heroDescription", {
                  required: "Hero description is required",
                })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="CUTTING-EDGE TECHNOLOGY MEETS CREATIVE EXCELLENCE..."
              />
              {errors.heroDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroDescription.message}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Hero Statistics (3 items)
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="space-y-2 p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stat {num} Value
                      </label>
                      <input
                        type="text"
                        {...register(`heroStat${num}Value`, {
                          required: `Stat ${num} value is required`,
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="50+"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stat {num} Label
                      </label>
                      <input
                        type="text"
                        {...register(`heroStat${num}Label`, {
                          required: `Stat ${num} label is required`,
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Projects Delivered"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            About Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("aboutTitle", {
                  required: "About title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="SAANVI INNOVATION"
              />
              {errors.aboutTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.aboutTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Paragraph 1 <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("aboutParagraph1", {
                  required: "About paragraph 1 is required",
                })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.aboutParagraph1 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.aboutParagraph1.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Paragraph 2 <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("aboutParagraph2", {
                  required: "About paragraph 2 is required",
                })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.aboutParagraph2 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.aboutParagraph2.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Paragraph 3 <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("aboutParagraph3", {
                  required: "About paragraph 3 is required",
                })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              />
              {errors.aboutParagraph3 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.aboutParagraph3.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* About Image 1 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiImage className="inline mr-1" />
                  About Image 1
                </label>

                {/* Hidden input to store image URL */}
                <input type="hidden" {...register("aboutImage1")} />

                {/* Image Preview */}
                {aboutImage1Preview && (
                  <div className="mb-3">
                    <div className="relative inline-block">
                      <img
                        src={aboutImage1Preview}
                        alt="About Image 1 Preview"
                        className="h-32 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          toast.error("Failed to load image preview");
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAboutImage(1)}
                        disabled={aboutImage1Upload.isDeleting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove image"
                      >
                        {aboutImage1Upload.isDeleting ? (
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
                    ref={aboutImage1Upload.fileInputRef}
                    onChange={aboutImage1Upload.handleFileSelect}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={aboutImage1Upload.triggerFileInput}
                    disabled={aboutImage1Upload.isUploading}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
                  >
                    {aboutImage1Upload.isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiUpload size={16} />
                        <span>{aboutImage1Preview ? "Change" : "Upload"}</span>
                      </>
                    )}
                  </button>
                </div>
                {errors.aboutImage1 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.aboutImage1.message}
                  </p>
                )}
              </div>

              {/* About Image 2 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiImage className="inline mr-1" />
                  About Image 2
                </label>

                {/* Hidden input to store image URL */}
                <input type="hidden" {...register("aboutImage2")} />

                {/* Image Preview */}
                {aboutImage2Preview && (
                  <div className="mb-3">
                    <div className="relative inline-block">
                      <img
                        src={aboutImage2Preview}
                        alt="About Image 2 Preview"
                        className="h-32 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          toast.error("Failed to load image preview");
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAboutImage(2)}
                        disabled={aboutImage2Upload.isDeleting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove image"
                      >
                        {aboutImage2Upload.isDeleting ? (
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
                    ref={aboutImage2Upload.fileInputRef}
                    onChange={aboutImage2Upload.handleFileSelect}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={aboutImage2Upload.triggerFileInput}
                    disabled={aboutImage2Upload.isUploading}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
                  >
                    {aboutImage2Upload.isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiUpload size={16} />
                        <span>{aboutImage2Preview ? "Change" : "Upload"}</span>
                      </>
                    )}
                  </button>
                </div>
                {errors.aboutImage2 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.aboutImage2.message}
                  </p>
                )}
              </div>

              {/* About Image 3 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiImage className="inline mr-1" />
                  About Image 3
                </label>

                {/* Hidden input to store image URL */}
                <input type="hidden" {...register("aboutImage3")} />

                {/* Image Preview */}
                {aboutImage3Preview && (
                  <div className="mb-3">
                    <div className="relative inline-block">
                      <img
                        src={aboutImage3Preview}
                        alt="About Image 3 Preview"
                        className="h-32 w-auto max-w-full border-2 border-gray-300 rounded-lg object-cover bg-white shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          toast.error("Failed to load image preview");
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAboutImage(3)}
                        disabled={aboutImage3Upload.isDeleting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove image"
                      >
                        {aboutImage3Upload.isDeleting ? (
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
                    ref={aboutImage3Upload.fileInputRef}
                    onChange={aboutImage3Upload.handleFileSelect}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={aboutImage3Upload.triggerFileInput}
                    disabled={aboutImage3Upload.isUploading}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm"
                  >
                    {aboutImage3Upload.isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiUpload size={16} />
                        <span>{aboutImage3Preview ? "Change" : "Upload"}</span>
                      </>
                    )}
                  </button>
                </div>
                {errors.aboutImage3 && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.aboutImage3.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Clients Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiUsers className="text-orange-500" />
            Clients Section
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Badge <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("clientsSectionBadge", {
                  required: "Section badge is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Trusted Partners"
              />
              {errors.clientsSectionBadge && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.clientsSectionBadge.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("clientsSectionTitle", {
                  required: "Section title is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Our Clients"
              />
              {errors.clientsSectionTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.clientsSectionTitle.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("clientsSectionDescription", {
                  required: "Section description is required",
                })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Trusted by leading companies worldwide..."
              />
              {errors.clientsSectionDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.clientsSectionDescription.message}
                </p>
              )}
            </div>

            {/* Client Logos Management */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Client Logos
                </h3>
                <button
                  type="button"
                  onClick={() => handleOpenClientModal()}
                  className="bg-orange-500 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center gap-1"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Client
                </button>
              </div>

              {clients.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">
                    No client logos added yet. Click "Add Client" to add one.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className="relative group bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="aspect-square flex items-center justify-center mb-2">
                        <img
                          src={getFullImageUrl(client.logo)}
                          alt={client.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-xs text-gray-600 text-center truncate">
                        {client.name}
                      </p>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenClientModal(client)}
                          className="bg-white p-1.5 rounded-md shadow-md hover:bg-orange-50 text-orange-600"
                          title="Edit"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClient(client.id)}
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
              <h3 className="text-sm font-medium text-blue-800">Note</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Services and Recent Works (Portfolio) sections on the home
                  page are managed through their respective settings pages:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Services content - Services Page</li>
                  <li>Portfolio projects - Portfolio Projects</li>
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

      {/* Client Modal */}
      {isClientModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-bold text-gray-900">
                {editingClient ? "Edit Client" : "Add New Client"}
              </h2>
              <button
                onClick={handleCloseClientModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleClientSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={clientFormData.name}
                  onChange={handleClientInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiImage className="inline mr-1" />
                  Client Logo <span className="text-red-500">*</span>
                </label>

                {/* Logo Preview */}
                {clientLogoPreview && (
                  <div className="mb-3">
                    <div className="relative inline-block">
                      <img
                        src={clientLogoPreview}
                        alt="Client logo preview"
                        className="h-24 w-auto max-w-xs border-2 border-gray-300 rounded-lg object-contain bg-white p-2 shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          toast.error("Failed to load logo preview");
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveClientLogo}
                        disabled={clientLogoUpload.isDeleting}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Remove logo"
                      >
                        {clientLogoUpload.isDeleting ? (
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
                    ref={clientLogoUpload.fileInputRef}
                    onChange={clientLogoUpload.handleFileSelect}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={clientLogoUpload.triggerFileInput}
                    disabled={clientLogoUpload.isUploading}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {clientLogoUpload.isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiUpload size={16} />
                        <span>
                          {clientLogoPreview ? "Change Logo" : "Upload Logo"}
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Supported formats: JPEG, PNG, GIF, WEBP, SVG (Max 5MB)
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseClientModal}
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
                      <span>{editingClient ? "Update" : "Add"} Client</span>
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

export default HomeSettings;
