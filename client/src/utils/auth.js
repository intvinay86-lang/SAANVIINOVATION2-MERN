import { authService } from "../services/authService";

// Re-export authService methods for backward compatibility
export const auth = {
  login: authService.login,
  logout: authService.clearAuthData,
  getCurrentUser: authService.getUser,
  isAuthenticated: authService.isAuthenticated,
  getToken: authService.getToken,
};
