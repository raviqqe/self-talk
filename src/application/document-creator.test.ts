import { beforeEach, expect, it, type Mocked, vi } from "vitest";
import { DocumentCreator } from "./document-creator.js";
import type { DocumentPresenter } from "./document-presenter.js";
import type { DocumentRepository } from "./document-repository.js";
import type { MessagePresenter } from "./message-presenter.js";

let documentRepository: Mocked<DocumentRepository>;
let documentPresenter: Mocked<DocumentPresenter>;
let messagePresenter: Mocked<MessagePresenter>;
let documentCreator: DocumentCreator;

beforeEach(() => {
  documentRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    update: vi.fn(),
  };
  documentPresenter = {
    presentNewDocument: vi.fn(),
  } as unknown as Mocked<DocumentPresenter>;
  messagePresenter = { present: vi.fn() };
  documentCreator = new DocumentCreator(
    documentRepository,
    documentPresenter,
    messagePresenter,
  );
});

it("creates and persists a document", async () => {
  await documentCreator.create("foo");
  expect(documentRepository.create.mock.calls).toEqual([
    [{ id: expect.any(String) as unknown, text: "foo" }],
  ]);
  expect(documentPresenter.presentNewDocument.mock.calls).toEqual([
    [{ id: expect.any(String) as unknown, text: "foo" }],
  ]);
});

it("formats a document before creation", async () => {
  await documentCreator.create("\tfoo ");
  expect(documentRepository.create.mock.calls[0]?.[0].text).toBe("foo");
});

it("validates a document before creation", async () => {
  await documentCreator.create("");
  expect(messagePresenter.present.mock.calls).toEqual([
    ["Document cannot be empty!"],
  ]);
});
