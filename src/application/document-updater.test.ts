import { afterEach, beforeEach, expect, it, type Mocked, vi } from "vitest";
import * as documentModule from "../domain/document.js";
import { DocumentDeleter } from "./document-deleter.js";
import type { DocumentPresenter } from "./document-presenter.js";
import type { DocumentRepository } from "./document-repository.js";
import { DocumentUpdater } from "./document-updater.js";
import type { MessagePresenter } from "./message-presenter.js";

const dummyDocument: documentModule.Document = { id: "", text: "foo" };

let documentRepository: Mocked<DocumentRepository>;
let documentPresenter: Mocked<DocumentPresenter>;
let messagePresenter: Mocked<MessagePresenter>;
let documentUpdater: DocumentUpdater;

beforeEach(() => {
  documentRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    update: vi.fn(),
  };
  documentPresenter = {
    presentDeletedDocument: vi.fn(),
    presentUpdatedDocument: vi.fn(),
  } as unknown as Mocked<DocumentPresenter>;
  messagePresenter = { present: vi.fn() };
  documentUpdater = new DocumentUpdater(
    new DocumentDeleter(documentRepository, documentPresenter, {
      confirm: vi.fn(async () => true),
    }),
    documentRepository,
    documentPresenter,
    messagePresenter,
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

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
  expect(documentRepository.delete).toHaveBeenCalledTimes(1);
});

it("does not update any document if validation fails", async () => {
  vi.spyOn(documentModule, "validateDocument").mockImplementation(() => {
    throw new Error("foo");
  });

  await documentUpdater.update(dummyDocument);
  expect(messagePresenter.present).toHaveBeenCalledTimes(1);
  expect(documentPresenter.presentUpdatedDocument).toHaveBeenCalledTimes(0);
});
