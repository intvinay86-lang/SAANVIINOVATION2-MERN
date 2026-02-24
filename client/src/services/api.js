import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if it's not a login attempt
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("/auth/login")
    ) {
      // Clear auth data on unauthorized
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

      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
