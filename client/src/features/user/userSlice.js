import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "./userService";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk to get user profile
export const getUserProfile = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getProfile();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to fetch profile");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile",
      );
    }
  },
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await userService.updateProfile(profileData);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to update profile");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

// Async thunk to change password
export const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await userService.changePassword(
        currentPassword,
        newPassword,
      );
      if (response.success) {
        return response.message || "Password changed successfully";
      }
      return rejectWithValue(response.message || "Failed to change password");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change password
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearProfile } = userSlice.actions;

export default userSlice.reducer;
