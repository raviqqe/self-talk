import { formatDocument, IDocument } from "../document";

describe("formatDocument", () => {
  it("updates document formatting them", () => {
    expect(formatDocument({ id: "", text: "foo" }, "bar")).toEqual({
      id: "",
      text: "bar"
    });
  });

  it("does not modify the original", () => {
    const document: IDocument = { id: "", text: "foo" };
    formatDocument(document, "bar");
    expect(document).toEqual({ id: "", text: "foo" });
  });
});
