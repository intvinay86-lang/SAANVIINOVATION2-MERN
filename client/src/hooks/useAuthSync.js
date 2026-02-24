import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { syncAuthState } from "../features/auth/authSlice";

export const useAuthSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStorageChange = (event) => {
      // Only sync when authToken changes
      if (event.key === "authToken") {
        dispatch(syncAuthState());

        // If token was removed (logout), redirect to login if on protected route
        if (
          event.newValue === null &&
          window.location.pathname.startsWith("/admin")
        ) {
          window.location.href = "/login";
        }
      }
    };

    // Listen for storage events from other tabs
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);
};
