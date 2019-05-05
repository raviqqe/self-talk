import { formatDocument, IDocument, validateDocument } from "../document";

describe("formatDocument", () => {
  it("formats a document", () => {
    expect(formatDocument({ createdAt: 42, id: "", text: " foo\n" })).toEqual({
      createdAt: 42,
      id: "",
      text: "foo"
    });
  });
});

describe("validateDocument", () => {
  it("validates texts", () => {
    expect(() => validateDocument({ text: "" } as IDocument)).toThrowError();
  });
});
