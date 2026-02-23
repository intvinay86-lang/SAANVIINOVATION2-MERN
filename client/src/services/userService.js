import api from "./api";

export const userService = {
  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/users/me");
    return response.data;
  },

  // Update current user profile
  updateProfile: async (data) => {
    const response = await api.put("/users/me", data);
    return response.data;
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put("/users/me/password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};
