import { IDocument } from "../../domain/document";
import { DocumentCreator } from "../document-creator";
import { IDocumentRepository } from "../document-repository";

describe(DocumentCreator.name, () => {
  it("creates and persists a document", async () => {
    const create = jest.fn();
    const documentCreator = new DocumentCreator({
      create
    } as IDocumentRepository);

    await documentCreator.create("foo");

    expect(create.mock.calls).toHaveLength(1);
  });

  it("creates a document after formatting it", async () => {
    let createdDocument: IDocument = null as any;
    const documentCreator = new DocumentCreator({
      create: async (document: IDocument) => {
        createdDocument = document;
      }
    } as IDocumentRepository);

    await documentCreator.create("\tfoo ");

    expect(createdDocument.text).toBe("foo");
  });
});
