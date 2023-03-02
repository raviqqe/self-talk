import { it, expect, vi, type Mocked, beforeEach } from "vitest";
import { DocumentCreator } from "./document-creator";
import { type IDocumentPresenter } from "./document-presenter";
import { type IDocumentRepository } from "./document-repository";
import { type IMessagePresenter } from "./message-presenter";

let documentRepository: Mocked<IDocumentRepository>;
let documentPresenter: Mocked<IDocumentPresenter>;
let messagePresenter: Mocked<IMessagePresenter>;
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
  } as unknown as Mocked<IDocumentPresenter>;
  messagePresenter = { present: vi.fn() };
  documentCreator = new DocumentCreator(
    documentRepository,
    documentPresenter,
    messagePresenter
  );
});

it("creates and persists a document", async () => {
  await documentCreator.create("foo");
  expect(documentRepository.create.mock.calls).toEqual([
    [{ id: expect.any(String) as string, text: "foo" }],
  ]);
  expect(documentPresenter.presentNewDocument.mock.calls).toEqual([
    [{ id: expect.any(String) as string, text: "foo" }],
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
