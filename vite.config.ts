import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    reactRouter(),
    VitePWA({
      // biome-ignore-start lint/style/useNamingConvention: PWA manifest
      manifest: {
        background_color: "darkkhaki",
        display: "standalone",
        icons: [
          {
            purpose: "maskable",
            sizes: "any",
            src: "icon.svg",
          },
        ],
        name: "SelfTalk",
        short_name: "SelfTalk",
        start_url: ".",
        theme_color: "darkkhaki",
        // biome-ignore-end lint/style/useNamingConvention: PWA manifest
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
});
