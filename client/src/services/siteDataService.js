import api from "./api";

export const siteDataService = {
  // Get main site data
  getMainSiteData: async () => {
    const response = await api.get("/sitedata/main");
    return response.data;
  },

  // Update specific section in main site data
  updateSiteDataSection: async (section, data) => {
    // First get the current main data
    try {
      const currentResponse = await api.get("/sitedata/main");
      const currentData = currentResponse.data.data.data || {};

      // Update the specific section
      const updatedData = {
        ...currentData,
        [section]: data,
      };

      // Save back to main
      const response = await api.post("/sitedata", {
        dataKey: "main",
        data: updatedData,
      });
      return response.data;
    } catch (error) {
      // If main doesn't exist, create it with the section
      if (error.response?.status === 404) {
        const response = await api.post("/sitedata", {
          dataKey: "main",
          data: { [section]: data },
        });
        return response.data;
      }
      throw error;
    }
  },

  // Get all site data (kept for backward compatibility)
  getAllSiteData: async () => {
    const response = await api.get("/sitedata");
    return response.data;
  },

  // Get site data by key (kept for backward compatibility)
  getSiteDataByKey: async (key) => {
    const response = await api.get(`/sitedata/${key}`);
    return response.data;
  },

  // Create or update site data (kept for backward compatibility)
  createOrUpdateSiteData: async (dataKey, data) => {
    const response = await api.post("/sitedata", { dataKey, data });
    return response.data;
  },

  // Update site data by key (kept for backward compatibility)
  updateSiteDataByKey: async (key, data) => {
    const response = await api.put(`/sitedata/${key}`, { data });
    return response.data;
  },

  // Delete site data by key (kept for backward compatibility)
  deleteSiteDataByKey: async (key) => {
    const response = await api.delete(`/sitedata/${key}`);
    return response.data;
  },
};
