// Simple localStorage-based authentication
export const auth = {
  // Mock credentials (in production, this would be API-based)
  mockCredentials: {
    email: "admin@saanviinnovation.com",
    password: "admin123",
  },

  login: (email, password, rememberMe = false) => {
    if (
      email === auth.mockCredentials.email &&
      password === auth.mockCredentials.password
    ) {
      const user = {
        email: email,
        name: "Admin User",
        role: "Administrator",
      };

      if (rememberMe) {
        localStorage.setItem("authUser", JSON.stringify(user));
      } else {
        sessionStorage.setItem("authUser", JSON.stringify(user));
      }

      return { success: true, user };
    }
    return { success: false, message: "Invalid email or password" };
  },

  logout: () => {
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authUser");
  },

  getCurrentUser: () => {
    const userFromLocal = localStorage.getItem("authUser");
    const userFromSession = sessionStorage.getItem("authUser");

    if (userFromLocal) return JSON.parse(userFromLocal);
    if (userFromSession) return JSON.parse(userFromSession);

    return null;
  },

  isAuthenticated: () => {
    return auth.getCurrentUser() !== null;
  },
};
