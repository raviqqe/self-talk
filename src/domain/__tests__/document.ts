import { formatDocument, IDocument, validateDocument } from "../document";

describe("formatDocument", () => {
  it("removes extra spaces", () => {
    expect(formatDocument({ createdAt: 42, id: "", text: " foo\n" })).toEqual({
      createdAt: 42,
      id: "",
      text: "foo"
    });
  });

  it("formats a document as Markdown", () => {
    expect(
      formatDocument({ createdAt: 42, id: "", text: "# foo \n\nbar" })
    ).toEqual({
      createdAt: 42,
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
