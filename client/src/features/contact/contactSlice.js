import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";

const initialState = {
  contacts: [],
  currentContact: null,
  stats: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0,
  },
  submitSuccess: false,
};

// Create contact (public)
export const createContact = createAsyncThunk(
  "contact/create",
  async (contactData, { rejectWithValue }) => {
    try {
      console.log("Creating contact with data:", contactData);
      const response = await contactService.createContact(contactData);
      console.log("Contact creation response:", response);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to send message");
    } catch (error) {
      console.error("Contact creation error:", error);
      console.error("Error response:", error.response?.data);

      // Handle validation errors (422)
      if (error.response?.status === 422 && error.response?.data?.errors) {
        const errors = error.response.data.errors;
        // Convert { field: ["error1", "error2"] } to readable string
        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => {
            const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
            return `${fieldName}: ${messages.join(", ")}`;
          })
          .join("; ");
        return rejectWithValue(errorMessages);
      }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send message. Please check all fields and try again.";
      return rejectWithValue(errorMessage);
    }
  },
);

// Get all contacts (admin)
export const getAllContacts = createAsyncThunk(
  "contact/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const response = await contactService.getAllContacts(params);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to fetch contacts");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch contacts",
      );
    }
  },
);

// Get contact by ID (admin)
export const getContactById = createAsyncThunk(
  "contact/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await contactService.getContactById(id);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to fetch contact");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch contact",
      );
    }
  },
);

// Update contact (admin)
export const updateContact = createAsyncThunk(
  "contact/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await contactService.updateContact(id, data);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to update contact");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update contact",
      );
    }
  },
);

// Delete contact (admin)
export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await contactService.deleteContact(id);
      if (response.success) {
        return id;
      }
      return rejectWithValue(response.message || "Failed to delete contact");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete contact",
      );
    }
  },
);

// Get contact statistics (admin)
export const getContactStats = createAsyncThunk(
  "contact/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await contactService.getContactStats();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to fetch statistics");
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch statistics",
      );
    }
  },
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false;
    },
    clearCurrentContact: (state) => {
      state.currentContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create contact
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.loading = false;
        state.submitSuccess = true;
        state.error = null;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.submitSuccess = false;
      })
      // Get all contacts
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts;
        state.pagination = {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };
        state.error = null;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get contact by ID
      .addCase(getContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContact = action.payload;
        state.error = null;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update contact
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.currentContact = action.payload;
        // Update in contacts list
        const index = state.contacts.findIndex(
          (c) => c._id === action.payload._id,
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter((c) => c._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get statistics
      .addCase(getContactStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(getContactStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSubmitSuccess, clearCurrentContact } =
  contactSlice.actions;

export default contactSlice.reducer;
