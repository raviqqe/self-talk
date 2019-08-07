import { formatDocument, IDocument, validateDocument } from "../document";

describe("formatDocument", () => {
  it("removes extra spaces", () => {
    expect(formatDocument({ id: "", text: " foo\n" })).toEqual({
      id: "",
      text: "foo"
    });
  });

  it("formats a document as Markdown", () => {
    expect(formatDocument({ id: "", text: "# foo \n\nbar" })).toEqual({
      id: "",
      text: "# foo\n\nbar"
    });
  });
});

describe("validateDocument", () => {
  it("validates texts", () => {
    expect(() => validateDocument({ text: "" } as IDocument)).toThrowError();
  });
});
