import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

beforeAll(() => {
  Object.defineProperty(document, "fonts", {
    value: {
      addEventListener() {},
      removeEventListener() {},
    },
  });

  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      takeRecords: vi.fn(),
      unobserve: vi.fn(),
    })),
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
