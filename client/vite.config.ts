import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Default output folder for Vite
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000", // Redirect API calls to backend
    },
  },
});
