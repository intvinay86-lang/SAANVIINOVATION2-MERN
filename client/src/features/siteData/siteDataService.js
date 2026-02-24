import api from "../../services/api";

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

  // Get all site data
  getAllSiteData: async () => {
    const response = await api.get("/sitedata");
    return response.data;
  },

  // Get site data by key
  getSiteDataByKey: async (key) => {
    const response = await api.get(`/sitedata/${key}`);
    return response.data;
  },

  // Create or update site data
  createOrUpdateSiteData: async (dataKey, data) => {
    const response = await api.post("/sitedata", { dataKey, data });
    return response.data;
  },

  // Update site data by key
  updateSiteDataByKey: async (key, data) => {
    const response = await api.put(`/sitedata/${key}`, { data });
    return response.data;
  },

  // Delete site data by key
  deleteSiteDataByKey: async (key) => {
    const response = await api.delete(`/sitedata/${key}`);
    return response.data;
  },
};
