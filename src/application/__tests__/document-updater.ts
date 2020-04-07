import * as documentModule from "../../domain/document";
import { DocumentDeleter } from "../document-deleter";
import { DocumentUpdater } from "../document-updater";
import { IDocumentRepository } from "../document-repository";
import { IDocumentPresenter } from "../document-presenter";
import { IMessagePresenter } from "../message-presenter";

const dummyDocument: documentModule.IDocument = { id: "", text: "foo" };

let documentRepository: jest.Mocked<IDocumentRepository>;
let documentPresenter: jest.Mocked<IDocumentPresenter>;
let messagePresenter: jest.Mocked<IMessagePresenter>;
let documentUpdater: DocumentUpdater;

beforeEach(() => {
  documentRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
  };
  documentPresenter = ({
    presentDeletedDocument: jest.fn(),
    presentUpdatedDocument: jest.fn(),
  } as unknown) as jest.Mocked<IDocumentPresenter>;
  messagePresenter = { present: jest.fn() };
  documentUpdater = new DocumentUpdater(
    new DocumentDeleter(documentRepository, documentPresenter, {
      confirm: jest.fn(async () => true),
    }),
    documentRepository,
    documentPresenter,
    messagePresenter
  );
});

afterEach(() => jest.restoreAllMocks());

it("updates and persists a document", async () => {
  await documentUpdater.update(dummyDocument);
  expect(documentRepository.update.mock.calls).toEqual([
    [{ ...dummyDocument, text: "foo" }],
  ]);
  expect(documentPresenter.presentUpdatedDocument.mock.calls).toEqual([
    [{ ...dummyDocument, text: "foo" }],
  ]);
});

it("formats a document before update", async () => {
  await documentUpdater.update({ ...dummyDocument, text: "\tfoo " });
  expect(documentRepository.update.mock.calls).toEqual([[dummyDocument]]);
});

it("deletes a document if its text is empty", async () => {
  await documentUpdater.update({ ...dummyDocument, text: "" });
  expect(documentRepository.delete).toBeCalledTimes(1);
});

it("does not update any document if validation fails", async () => {
  jest.spyOn(documentModule, "validateDocument").mockImplementation(() => {
    throw new Error("foo");
  });

  await documentUpdater.update(dummyDocument);
  expect(messagePresenter.present).toBeCalledTimes(1);
  expect(documentPresenter.presentUpdatedDocument).toBeCalledTimes(0);
});
