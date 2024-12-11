import { reactRouter } from "@react-router/dev/vite";
import defaultWyw from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { defaultImport } from "default-import";

const wyw = defaultImport(defaultWyw);

export default defineConfig({
  esbuild: {
    legalComments: "external",
  },
  plugins: [
    reactRouter(),
    wyw({
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
  ssr: {
    noExternal: ["react-spinners"],
  },
});
