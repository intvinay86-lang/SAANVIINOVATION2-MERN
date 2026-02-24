import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { siteDataService } from "./siteDataService";

const initialState = {
  mainData: null,
  loading: false,
  error: null,
};

// Async thunk to get main site data
export const getMainSiteData = createAsyncThunk(
  "siteData/getMain",
  async (_, { rejectWithValue }) => {
    try {
      const response = await siteDataService.getMainSiteData();
      if (response.success) {
        return response.data.data;
      }
      return rejectWithValue(response.message || "Failed to fetch site data");
    } catch (error) {
      if (error.response?.status === 404) {
        return {}; // Return empty object if no data exists
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch site data",
      );
    }
  },
);

// Async thunk to update a specific section
export const updateSiteDataSection = createAsyncThunk(
  "siteData/updateSection",
  async ({ section, data }, { rejectWithValue }) => {
    try {
      const response = await siteDataService.updateSiteDataSection(
        section,
        data,
      );
      if (response.success) {
        return { section, data };
      }
      return rejectWithValue(response.message || "Failed to update site data");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update site data",
      );
    }
  },
);

const siteDataSlice = createSlice({
  name: "siteData",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get main site data
      .addCase(getMainSiteData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMainSiteData.fulfilled, (state, action) => {
        state.loading = false;
        state.mainData = action.payload;
        state.error = null;
      })
      .addCase(getMainSiteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update section
      .addCase(updateSiteDataSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSiteDataSection.fulfilled, (state, action) => {
        state.loading = false;
        if (state.mainData) {
          state.mainData[action.payload.section] = action.payload.data;
        } else {
          state.mainData = { [action.payload.section]: action.payload.data };
        }
        state.error = null;
      })
      .addCase(updateSiteDataSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = siteDataSlice.actions;

export default siteDataSlice.reducer;
