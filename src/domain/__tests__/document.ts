import { updateDocument, IDocument } from "../document";

describe("updateDocument", () => {
  it("updates document formatting them", () => {
    expect(updateDocument({ id: "", text: "foo" }, "bar")).toEqual({
      id: "",
      text: "bar"
    });
  });

  it("does not modify the original", () => {
    const document: IDocument = { id: "", text: "foo" };
    updateDocument(document, "bar");
    expect(document).toEqual({ id: "", text: "foo" });
  });
});
