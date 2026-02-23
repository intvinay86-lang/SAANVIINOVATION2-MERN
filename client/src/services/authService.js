import api from "./api";
import Cookies from "js-cookie";

export const authService = {
  // Login
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // Store auth data in cookies
  storeAuthData: (token, user, rememberMe = false) => {
    const cookieOptions = {
      expires: rememberMe ? 7 : 1, // 7 days if remember me, 1 day otherwise
      secure: window.location.protocol === "https:", // Only send over HTTPS in production
      sameSite: "strict", // CSRF protection
    };

    Cookies.set("authToken", token, cookieOptions);
    Cookies.set("authUser", JSON.stringify(user), cookieOptions);
  },

  // Get stored token from cookies
  getToken: () => {
    return Cookies.get("authToken");
  },

  // Get stored user from cookies
  getUser: () => {
    const userCookie = Cookies.get("authUser");
    return userCookie ? JSON.parse(userCookie) : null;
  },

  // Clear auth data from cookies
  clearAuthData: () => {
    Cookies.remove("authToken");
    Cookies.remove("authUser");
  },

  // Check if authenticated
  isAuthenticated: () => {
    return !!authService.getToken();
  },
};
