import { formatDocument } from "../document";

describe("formatDocument", () => {
  it("formats a document", () => {
    expect(formatDocument({ createdAt: 42, id: "", text: " foo\n" })).toEqual({
      createdAt: 42,
      id: "",
      text: "foo"
    });
  });
});
