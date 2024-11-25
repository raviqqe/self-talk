import wywInJs from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import { UserConfigExport } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    wywInJs({
      include: ["src/**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
        plugins: ["@babel/plugin-syntax-import-attributes"],
      },
    }),
    VitePWA({
      manifest: {
        short_name: "SelfTalk",
        name: "SelfTalk",
        icons: [{ src: "icon.svg", sizes: "any" }],
        start_url: ".",
        display: "standalone",
        theme_color: "darkkhaki",
        background_color: "darkkhaki",
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.ts{,x}"],
    setupFiles: "src/test.ts",
  },
} satisfies UserConfigExport);
