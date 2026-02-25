import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiSave,
  FiDollarSign,
  FiPlus,
  FiTrash2,
  FiAward,
} from "react-icons/fi";
import {
  getMainSiteData,
  updateSiteDataSection,
} from "../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";

function PricingSettings() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      heroTitle: "SIMPLE, TRANSPARENT PRICING",
      heroSubtitle:
        "CHOOSE THE PERFECT PLAN FOR YOUR PROJECT. NO HIDDEN FEES, NO SURPRISES.",
      whyChooseTitle: "Why Choose Us?",
      whyChooseSubtitle: "All plans include these amazing features",
      whyChooseFeatures: [
        {
          title: "Quality Assured",
          description:
            "Professional design and development with attention to detail",
        },
        {
          title: "Fast Delivery",
          description: "Quick turnaround time without compromising on quality",
        },
        {
          title: "24/7 Support",
          description: "Dedicated support team ready to help you anytime",
        },
      ],
      ctaTitle: "Need a Custom Solution?",
      ctaDescription:
        "We can create a tailored package that perfectly fits your specific requirements and budget",
      ctaButtonText: "Contact Us for Custom Quote",
      pricingPlans: [
        {
          title: "Starter",
          subtitle: "Static Website",
          price: "5,000",
          period: "one-time",
          description: "Perfect for small businesses and personal websites",
          features:
            "5 Web Pages\nFree Domain (1 Year)\nFree Hosting (1 Year)\nFully Responsive Design\nBasic SEO Setup\nContact Form Integration",
          highlighted: false,
          badge: "",
        },
        {
          title: "Professional",
          subtitle: "Dynamic Website",
          price: "10,000",
          period: "one-time",
          description: "Ideal for growing businesses with dynamic content",
          features:
            "6 Web Pages\nFree Domain & Hosting (1 Year)\nFully Responsive Design\nContent Management System\nAdvanced SEO Setup\nContact Form Integration\nSocial Media Integration\nGoogle Analytics Setup",
          highlighted: true,
          badge: "Most Popular",
        },
        {
          title: "Enterprise",
          subtitle: "SEO Optimized Website",
          price: "25,000",
          period: "one-time",
          description: "Complete solution for businesses targeting growth",
          features:
            "12 Web Pages\n50+ Locations SEO\nFree Domain & Hosting (1 Year)\nFully Responsive Design\nAdvanced CMS\nPremium SEO Package\nSocial Media Integration\nGoogle Analytics & Search Console\nMonthly Performance Reports",
          highlighted: false,
          badge: "",
        },
      ],
    },
  });

  const {
    fields: planFields,
    append: appendPlan,
    remove: removePlan,
  } = useFieldArray({
    control,
    name: "pricingPlans",
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "whyChooseFeatures",
  });

  useEffect(() => {
    loadPricingSettings();
  }, []);

  useEffect(() => {
    if (siteData !== null) {
      const pricingSettings = siteData?.pricingSettings || {};

      const defaultData = {
        heroTitle: "SIMPLE, TRANSPARENT PRICING",
        heroSubtitle:
          "CHOOSE THE PERFECT PLAN FOR YOUR PROJECT. NO HIDDEN FEES, NO SURPRISES.",
        whyChooseTitle: "Why Choose Us?",
        whyChooseSubtitle: "All plans include these amazing features",
        whyChooseFeatures: [
          {
            title: "Quality Assured",
            description:
              "Professional design and development with attention to detail",
          },
          {
            title: "Fast Delivery",
            description:
              "Quick turnaround time without compromising on quality",
          },
          {
            title: "24/7 Support",
            description: "Dedicated support team ready to help you anytime",
          },
        ],
        ctaTitle: "Need a Custom Solution?",
        ctaDescription:
          "We can create a tailored package that perfectly fits your specific requirements and budget",
        ctaButtonText: "Contact Us for Custom Quote",
        pricingPlans: [
          {
            title: "Starter",
            subtitle: "Static Website",
            price: "5,000",
            period: "one-time",
            description: "Perfect for small businesses and personal websites",
            features:
              "5 Web Pages\nFree Domain (1 Year)\nFree Hosting (1 Year)\nFully Responsive Design\nBasic SEO Setup\nContact Form Integration",
            highlighted: false,
            badge: "",
          },
          {
            title: "Professional",
            subtitle: "Dynamic Website",
            price: "10,000",
            period: "one-time",
            description: "Ideal for growing businesses with dynamic content",
            features:
              "6 Web Pages\nFree Domain & Hosting (1 Year)\nFully Responsive Design\nContent Management System\nAdvanced SEO Setup\nContact Form Integration\nSocial Media Integration\nGoogle Analytics Setup",
            highlighted: true,
            badge: "Most Popular",
          },
          {
            title: "Enterprise",
            subtitle: "SEO Optimized Website",
            price: "25,000",
            period: "one-time",
            description: "Complete solution for businesses targeting growth",
            features:
              "12 Web Pages\n50+ Locations SEO\nFree Domain & Hosting (1 Year)\nFully Responsive Design\nAdvanced CMS\nPremium SEO Package\nSocial Media Integration\nGoogle Analytics & Search Console\nMonthly Performance Reports",
            highlighted: false,
            badge: "",
          },
        ],
      };

      const mergedData = {
        heroTitle: pricingSettings.heroTitle || defaultData.heroTitle,
        heroSubtitle: pricingSettings.heroSubtitle || defaultData.heroSubtitle,
        whyChooseTitle:
          pricingSettings.whyChooseTitle || defaultData.whyChooseTitle,
        whyChooseSubtitle:
          pricingSettings.whyChooseSubtitle || defaultData.whyChooseSubtitle,
        whyChooseFeatures:
          pricingSettings.whyChooseFeatures || defaultData.whyChooseFeatures,
        ctaTitle: pricingSettings.ctaTitle || defaultData.ctaTitle,
        ctaDescription:
          pricingSettings.ctaDescription || defaultData.ctaDescription,
        ctaButtonText:
          pricingSettings.ctaButtonText || defaultData.ctaButtonText,
        pricingPlans: pricingSettings.pricingPlans || defaultData.pricingPlans,
      };

      reset(mergedData);
      setIsFetching(false);
    }
  }, [siteData, reset]);

  const loadPricingSettings = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load pricing settings");
      }
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Convert features string to array for each plan
      const processedData = {
        ...data,
        pricingPlans: data.pricingPlans.map((plan) => ({
          ...plan,
          features:
            typeof plan.features === "string"
              ? plan.features.split("\n").filter((f) => f.trim())
              : plan.features,
        })),
      };

      await dispatch(
        updateSiteDataSection({
          section: "pricingSettings",
          data: processedData,
        }),
      ).unwrap();

      toast.success("Pricing settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update pricing settings");
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
          Pricing Page Settings
        </h1>
        <p className="text-gray-600">
          Manage all pricing page content including hero section, pricing plans,
          features, and CTA.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiDollarSign className="text-orange-500" />
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
                placeholder="SIMPLE, TRANSPARENT PRICING"
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
                placeholder="CHOOSE THE PERFECT PLAN FOR YOUR PROJECT..."
              />
              {errors.heroSubtitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.heroSubtitle.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Pricing Plans
            </h2>
            <button
              type="button"
              onClick={() =>
                appendPlan({
                  title: "",
                  subtitle: "",
                  price: "",
                  period: "one-time",
                  description: "",
                  features: "",
                  highlighted: false,
                  badge: "",
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
            >
              <FiPlus /> Add Plan
            </button>
          </div>

          <div className="space-y-6">
            {planFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Plan {index + 1}
                  </h3>
                  {planFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePlan(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      {...register(`pricingPlans.${index}.title`, {
                        required: "Title is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Starter"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      {...register(`pricingPlans.${index}.subtitle`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Static Website"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="text"
                      {...register(`pricingPlans.${index}.price`, {
                        required: "Price is required",
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="5,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Period
                    </label>
                    <input
                      type="text"
                      {...register(`pricingPlans.${index}.period`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="one-time"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      {...register(`pricingPlans.${index}.description`)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Perfect for small businesses..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Badge (optional)
                    </label>
                    <input
                      type="text"
                      {...register(`pricingPlans.${index}.badge`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Most Popular"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register(`pricingPlans.${index}.highlighted`)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Highlighted Plan
                      </span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Features (one per line)
                    </label>
                    <textarea
                      {...register(`pricingPlans.${index}.features`)}
                      rows="5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 font-mono text-sm"
                      placeholder="5 Web Pages&#10;Free Domain (1 Year)&#10;Free Hosting (1 Year)"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter each feature on a new line
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiAward className="text-orange-500" />
            Why Choose Us Section
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                {...register("whyChooseTitle")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Why Choose Us?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                {...register("whyChooseSubtitle")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="All plans include these amazing features"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Features</h3>
              <button
                type="button"
                onClick={() => appendFeature({ title: "", description: "" })}
                className="flex items-center gap-2 px-3 py-1 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors"
              >
                <FiPlus size={14} /> Add Feature
              </button>
            </div>

            {featureFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 text-sm">
                    Feature {index + 1}
                  </h4>
                  {featureFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      {...register(`whyChooseFeatures.${index}.title`)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Quality Assured"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      {...register(`whyChooseFeatures.${index}.description`)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Professional design and development..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Custom Solution CTA
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Title
              </label>
              <input
                type="text"
                {...register("ctaTitle")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Need a Custom Solution?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CTA Description
              </label>
              <textarea
                {...register("ctaDescription")}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="We can create a tailored package..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                {...register("ctaButtonText")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contact Us for Custom Quote"
              />
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

export default PricingSettings;
