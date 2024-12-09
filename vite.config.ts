import { reactRouter } from "@react-router/dev/vite";
import wywInJs from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    reactRouter(),
    (wywInJs as unknown as Function)({
      include: ["src/**/*.{ts,tsx}"],
      babelOptions: {
        generatorOpts: {
          importAttributesKeyword: "with",
        },
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
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
});
