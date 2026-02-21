import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Load user from localStorage on initialization
const loadUserFromStorage = () => {
  try {
    const userFromLocal = localStorage.getItem("authUser");
    const userFromSession = sessionStorage.getItem("authUser");

    if (userFromLocal) {
      return JSON.parse(userFromLocal);
    }
    if (userFromSession) {
      return JSON.parse(userFromSession);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Initialize with stored user if exists
const storedUser = loadUserFromStorage();
if (storedUser) {
  initialState.user = storedUser;
  initialState.isAuthenticated = true;
}

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;

      // Store in localStorage or sessionStorage
      const storage = action.payload.rememberMe ? localStorage : sessionStorage;
      storage.setItem("authUser", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Clear storage
      localStorage.removeItem("authUser");
      sessionStorage.removeItem("authUser");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;
