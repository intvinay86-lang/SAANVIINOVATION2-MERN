import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import siteDataReducer from "../features/siteData/siteDataSlice";
import userReducer from "../features/user/userSlice";
import uploadReducer from "../features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    siteData: siteDataReducer,
    user: userReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
