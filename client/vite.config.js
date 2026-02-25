import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for large libraries
          three: ["three"],
          jodit: ["jodit-react"],
          locomotive: ["locomotive-scroll"],
          gsap: ["gsap"],
          swiper: ["swiper"],

          // React ecosystem
          "react-vendor": ["react", "react-dom", "react-router-dom"],

          // Redux ecosystem
          "redux-vendor": ["@reduxjs/toolkit", "react-redux"],

          // UI utilities
          "ui-vendor": ["react-icons", "react-hot-toast", "react-hook-form"],
        },
      },
    },
    chunkSizeWarningLimit: 700, // Jodit editor is large but lazy loaded
  },
});
