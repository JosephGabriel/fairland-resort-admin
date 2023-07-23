import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    testNamePattern: "./**/*.test.tsx",
    globals: true,
  },
});
