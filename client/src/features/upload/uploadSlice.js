import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadService } from "./uploadService";

const initialState = {
  images: [],
  uploading: false,
  loading: false,
  error: null,
};

// Async thunk to upload image
export const uploadImage = createAsyncThunk(
  "upload/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      const response = await uploadService.uploadImage(file);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to upload image");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload image",
      );
    }
  },
);

// Async thunk to delete image
export const deleteImage = createAsyncThunk(
  "upload/deleteImage",
  async (filename, { rejectWithValue }) => {
    try {
      const response = await uploadService.deleteImage(filename);
      if (response.success) {
        return filename;
      }
      return rejectWithValue(response.message || "Failed to delete image");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete image",
      );
    }
  },
);

// Async thunk to get all images
export const getAllImages = createAsyncThunk(
  "upload/getAllImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await uploadService.getAllImages();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to fetch images");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch images",
      );
    }
  },
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload image
      .addCase(uploadImage.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploading = false;
        state.images.push(action.payload);
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })
      // Delete image
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = state.images.filter(
          (image) => image.filename !== action.payload,
        );
        state.error = null;
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all images
      .addCase(getAllImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
        state.error = null;
      })
      .addCase(getAllImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = uploadSlice.actions;

export default uploadSlice.reducer;
