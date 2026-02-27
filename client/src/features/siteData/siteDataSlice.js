import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { siteDataService } from "./siteDataService";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const initialState = {
  mainData: null,
  loading: false,
  error: null,
  lastFetched: null,
};

// Async thunk to get main site data with Redux caching
export const getMainSiteData = createAsyncThunk(
  "siteData/getMain",
  async (forceRefresh = false, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { mainData, lastFetched } = state.siteData;

      // If not forcing refresh and data exists in Redux store
      if (!forceRefresh && mainData && lastFetched) {
        const timeSinceLastFetch = Date.now() - lastFetched;

        // Return cached data if still valid
        if (timeSinceLastFetch < CACHE_DURATION) {
          console.log("Using cached site data from Redux store");
          return mainData;
        }
      }

      // Fetch fresh data from API
      console.log("Fetching fresh site data from API");
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
    clearSiteDataCache: (state) => {
      state.mainData = null;
      state.lastFetched = null;
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
        state.lastFetched = Date.now();
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
        state.lastFetched = Date.now();
        state.error = null;
      })
      .addCase(updateSiteDataSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSiteDataCache } = siteDataSlice.actions;

export default siteDataSlice.reducer;
