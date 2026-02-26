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
    port: process.env.VITE_PORT || 5173,
  },
  preview: {
    port: process.env.VITE_PORT || 5173,
  },
  build: {
    chunkSizeWarningLimit: 700, // Jodit editor is large but lazy loaded
  },
});
