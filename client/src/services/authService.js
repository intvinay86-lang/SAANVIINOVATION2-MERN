import api from "./api";

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // Store auth data
  storeAuthData: (token, user, rememberMe = false) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("authToken", token);
    storage.setItem("authUser", JSON.stringify(user));
  },

  // Get stored token
  getToken: () => {
    return (
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
    );
  },

  // Get stored user
  getUser: () => {
    const userFromLocal = localStorage.getItem("authUser");
    const userFromSession = sessionStorage.getItem("authUser");

    if (userFromLocal) return JSON.parse(userFromLocal);
    if (userFromSession) return JSON.parse(userFromSession);

    return null;
  },

  // Clear auth data
  clearAuthData: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("authUser");
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!authService.getToken();
  },
};
