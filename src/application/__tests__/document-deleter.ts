import { DocumentDeleter } from "../document-deleter";
import { IDocumentRepository } from "../document-repository";

describe(DocumentDeleter.name, () => {
  let deleteMock: jest.Mock;
  let confirmMock: jest.Mock;
  let documentDeleter: DocumentDeleter;

  beforeEach(() => {
    deleteMock = jest.fn();
    confirmMock = jest.fn();
    documentDeleter = new DocumentDeleter(
      ({
        delete: deleteMock
      } as unknown) as IDocumentRepository,
      { confirm: confirmMock }
    );
  });

  it("deletes a document after confirmation", async () => {
    confirmMock.mockReturnValue(true);
    await documentDeleter.delete("foo");
    expect(deleteMock.mock.calls).toHaveLength(1);
  });

  it("does not delete any document if it is not confirmed", async () => {
    confirmMock.mockReturnValue(false);
    await documentDeleter.delete("\tfoo ");
    expect(deleteMock.mock.calls).toHaveLength(0);
  });
});
