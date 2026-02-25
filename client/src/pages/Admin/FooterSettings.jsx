import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";
import {
  getMainSiteData,
  updateSiteDataSection,
} from "../../features/siteData/siteDataSlice";
import {
  selectSiteData,
  selectFooterData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";

function FooterSettings() {
  const dispatch = useDispatch();
  const siteData = useSelector(selectSiteData);
  const footerData = useSelector(selectFooterData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tagline: "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES",
    },
  });

  useEffect(() => {
    loadFooterData();
  }, []);

  useEffect(() => {
    // Check if siteData has been loaded (not null)
    if (siteData !== null) {
      const defaultTagline =
        "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES";
      reset({
        tagline: footerData?.tagline || defaultTagline,
      });
      setIsFetching(false);
    }
  }, [siteData, footerData, reset]);

  const loadFooterData = async () => {
    setIsFetching(true);
    try {
      await dispatch(getMainSiteData()).unwrap();
    } catch (error) {
      if (error !== "Failed to fetch site data") {
        toast.error("Failed to load footer data");
      }
      setIsFetching(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const cleanedData = {
        tagline:
          data.tagline?.trim() ||
          "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES",
      };

      await dispatch(
        updateSiteDataSection({ section: "footer", data: cleanedData }),
      ).unwrap();

      toast.success("Footer settings saved successfully");
    } catch (error) {
      toast.error(error || "Failed to save footer settings");
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Footer Settings
        </h1>
        <p className="text-gray-600">
          Manage footer tagline. Contact info (phone, email, address) and social
          links are managed in Site Info.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Footer Tagline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Company Tagline
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              {...register("tagline", { required: "Tagline is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter footer tagline"
            />
            {errors.tagline && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tagline.message}
              </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              This tagline will be displayed in the footer section of your
              website.
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
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FooterSettings;
