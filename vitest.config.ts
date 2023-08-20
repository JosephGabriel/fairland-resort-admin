import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    alias: {
      "@assets": path.resolve(__dirname, "src", "assets"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@contexts": path.resolve(__dirname, "src", "contexts"),
      "@navigation": path.resolve(__dirname, "src", "navigation"),
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@services": path.resolve(__dirname, "src", "services"),
      "@repositories": path.resolve(__dirname, "src", "repositories"),
      "@types": path.resolve(__dirname, "types.ts"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
});
