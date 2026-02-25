import api from "../../services/api";

export const contactService = {
  // Create contact (public)
  createContact: async (data) => {
    const response = await api.post("/contacts", data);
    return response.data;
  },

  // Get all contacts (admin)
  getAllContacts: async (params = {}) => {
    const response = await api.get("/contacts", { params });
    return response.data;
  },

  // Get contact by ID (admin)
  getContactById: async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },

  // Update contact (admin)
  updateContact: async (id, data) => {
    const response = await api.put(`/contacts/${id}`, data);
    return response.data;
  },

  // Delete contact (admin)
  deleteContact: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  },

  // Get contact statistics (admin)
  getContactStats: async () => {
    const response = await api.get("/contacts/stats");
    return response.data;
  },
};
