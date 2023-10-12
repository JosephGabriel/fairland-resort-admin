import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src", "assets"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@contexts": path.resolve(__dirname, "src", "contexts"),
      "@navigation": path.resolve(__dirname, "src", "navigation"),
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@services": path.resolve(__dirname, "src", "services"),
      "@repositories": path.resolve(__dirname, "src", "repositories"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
});
