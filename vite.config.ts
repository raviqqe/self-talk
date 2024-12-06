import { reactRouter } from "@react-router/dev/vite";
import wywInJs from "@wyw-in-js/vite";
import { defineConfig, type UserConfigExport } from "vitest/config";

export default defineConfig({
  plugins: [
    reactRouter(),
    (wywInJs as unknown as Function)({
      include: ["src/**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts{,x}"],
    setupFiles: "src/test.ts",
  },
});
