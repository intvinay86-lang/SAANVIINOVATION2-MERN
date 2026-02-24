import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Initialize with stored user if exists
const storedUser = authService.getUser();
if (storedUser && authService.isAuthenticated()) {
  initialState.user = storedUser;
  initialState.isAuthenticated = true;
}

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);

      if (response.success) {
        const { token, user } = response.data;
        authService.storeAuthData(token, user, rememberMe);
        return { user, rememberMe };
      }

      return rejectWithValue(response.message || "Login failed");
    } catch (error) {
      // Handle different error response formats
      if (error.response?.data) {
        const errorData = error.response.data;

        // Validation errors (422)
        if (errorData.errors) {
          return rejectWithValue({
            message: errorData.message || "Validation failed",
            errors: errorData.errors,
          });
        }

        // Other API errors (401, 403, etc.)
        return rejectWithValue(errorData.message || "Login failed");
      }

      // Network or other errors
      return rejectWithValue(
        error.message || "Network error. Please try again.",
      );
    }
  },
);

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      authService.clearAuthData();
    },
    clearError: (state) => {
      state.error = null;
    },
    // Handle cross-tab authentication sync
    syncAuthState: (state) => {
      const storedUser = authService.getUser();
      const isAuthenticated = authService.isAuthenticated();

      if (isAuthenticated && storedUser) {
        state.user = storedUser;
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, clearError, syncAuthState } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
