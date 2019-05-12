import { IDocument } from "../../domain/document";
import { DocumentDeleter } from "../document-deleter";
import { IDocumentRepository } from "../document-repository";
import { DocumentUpdater } from "../document-updater";
import { IMessagePresenter } from "../message-presenter";

const dummyDocument: IDocument = { createdAt: 42, id: "id", text: "foo" };

describe(DocumentUpdater.name, () => {
  let updateMock: jest.Mock;
  let deleteMock: jest.Mock;
  let documentUpdater: DocumentUpdater;

  beforeEach(() => {
    updateMock = jest.fn();
    deleteMock = jest.fn();
    documentUpdater = new DocumentUpdater(
      ({ delete: deleteMock } as unknown) as DocumentDeleter,
      ({
        update: updateMock
      } as unknown) as IDocumentRepository,
      {} as IMessagePresenter
    );
  });

  it("updates and persists a document", async () => {
    expect(await documentUpdater.update(dummyDocument, "bar")).toEqual({
      ...dummyDocument,
      text: "bar"
    });
    expect(updateMock.mock.calls).toHaveLength(1);
  });

  it("formats a document before update", async () => {
    await documentUpdater.update(dummyDocument, "\tfoo ");
    expect(updateMock.mock.calls[0][0].text).toBe("foo");
  });

  it("deletes a document if its text is empty", async () => {
    expect(await documentUpdater.update(dummyDocument, "")).toBeNull();
    expect(deleteMock.mock.calls).toHaveLength(1);
  });
});
