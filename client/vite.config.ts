import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Default output folder for Vite
  },
  server: {
    host: "0.0.0.0", // Bind to all interfaces
    port: 5173, // Ensure the port is consistent
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Your backend URL
        changeOrigin: true, // Needed for some CORS issues
      },
    },
  },
});
