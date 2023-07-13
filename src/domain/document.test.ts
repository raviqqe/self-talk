import { describe, expect, it } from "vitest";
import {
  type IDocument,
  formatDocument,
  validateDocument,
} from "./document.js";

describe("formatDocument", () => {
  it("removes extra spaces", async () => {
    expect(await formatDocument({ id: "", text: " foo\n" })).toEqual({
      id: "",
      text: "foo",
    });
  });

  it("formats a document as Markdown", async () => {
    expect(await formatDocument({ id: "", text: "# foo \n\nbar" })).toEqual({
      id: "",
      text: "# foo\n\nbar",
    });
  });

  it("does not escape any dollar signs", async () => {
    for (const [source, target] of [
      ["$", "$"],
      ["\\$", "$"],
      ["\\\\$", "$"],
      ["\\$\\$", "$$"],
    ] as [string, string][]) {
      expect(await formatDocument({ id: "", text: source })).toEqual({
        id: "",
        text: target,
      });
    }
  });
});

describe("validateDocument", () => {
  it("validates texts", () => {
    expect(() => validateDocument({ text: "" } as IDocument)).toThrow();
  });
});
