import api from "../../services/api";

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // Store auth data in localStorage only
  storeAuthData: (token, user, rememberMe = false) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));

    // Dispatch storage event for cross-tab synchronization
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "authToken",
        newValue: token,
        storageArea: localStorage,
      }),
    );
  },

  // Get stored token from localStorage
  getToken: () => {
    return localStorage.getItem("authToken");
  },

  // Get stored user from localStorage
  getUser: () => {
    const userString = localStorage.getItem("authUser");
    return userString ? JSON.parse(userString) : null;
  },

  // Clear auth data from localStorage
  clearAuthData: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    // Dispatch storage event for cross-tab synchronization
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "authToken",
        newValue: null,
        storageArea: localStorage,
      }),
    );
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!authService.getToken();
  },
};
