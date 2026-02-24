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
  selectFooterData,
  selectSiteDataLoading,
} from "../../features/siteData/siteDataSelectors";

function FooterSettings() {
  const dispatch = useDispatch();
  const footerData = useSelector(selectFooterData);
  const isLoading = useSelector(selectSiteDataLoading);
  const [isFetching, setIsFetching] = useState(true);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      tagline: "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES",
    },
  });

  useEffect(() => {
    loadFooterData();
  }, []);

  useEffect(() => {
    if (footerData) {
      const defaultTagline =
        "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES";
      reset({
        tagline: footerData.tagline || defaultTagline,
      });
      setIsFetching(false);
    }
  }, [footerData, reset]);

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
      const defaultTagline =
        "DELIVERING INNOVATIVE DIGITAL SOLUTIONS FOR MODERN BUSINESSES";

      const cleanedData = {
        tagline: data.tagline?.trim() || defaultTagline,
      };

      await dispatch(
        updateSiteDataSection({ section: "footer", data: cleanedData }),
      ).unwrap();

      toast.success("Footer data saved successfully");
    } catch (error) {
      toast.error(error || "Failed to save footer data");
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Footer</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Footer Tagline */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Footer Tagline
          </h2>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tagline
            </label>
            <input
              type="text"
              {...register("tagline")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="Enter footer tagline"
            />
            <p className="text-sm text-gray-500 mt-2">
              This tagline will be displayed in the footer section of your
              website.
            </p>
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
                <span>Save Footer Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FooterSettings;
