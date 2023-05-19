import { beforeAll } from "vitest";

beforeAll(() => {
  Object.defineProperty(document, "fonts", {
    value: { addEventListener() {}, removeEventListener() {} },
  });
});
