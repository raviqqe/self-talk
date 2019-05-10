import { DocumentDeleter } from "../document-deleter";
import { IDocumentRepository } from "../document-repository";

describe(DocumentDeleter.name, () => {
  let deleteMock: jest.Mock;
  let confirmMock: jest.Mock;
  let documentDeleter: DocumentDeleter;

  beforeEach(() => {
    deleteMock = jest.fn();
    confirmMock = jest.fn(() => true);
    documentDeleter = new DocumentDeleter(
      ({
        delete: deleteMock
      } as unknown) as IDocumentRepository,
      { confirm: confirmMock }
    );
  });

  it("deletes a document", async () => {
    await documentDeleter.delete("foo");
    expect(deleteMock.mock.calls).toHaveLength(1);
  });

  it("confirms deletion before conducting it", async () => {
    await documentDeleter.delete("\tfoo ");
    expect(confirmMock.mock.calls).toHaveLength(1);
  });
});
