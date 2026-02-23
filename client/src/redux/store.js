import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import siteDataReducer from "./slices/siteDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    siteData: siteDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
