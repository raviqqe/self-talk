import { reactRouter } from "@react-router/dev/vite";
import wywInJs from "@wyw-in-js/vite";
import { defineConfig } from "vite";

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
  ],
});
