import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { type PluginOption } from "vite";

export default defineConfig({
  plugins: [react() as PluginOption[]],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts{,x}"],
    setupFiles: "src/test.ts",
  },
});
