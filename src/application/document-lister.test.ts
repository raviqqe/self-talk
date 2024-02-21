import { expect, beforeEach, vi, it, type Mocked } from "vitest";
import { type Document } from "../domain/document.js";
import { DocumentLister } from "./document-lister.js";
import { type DocumentPresenter } from "./document-presenter.js";
import { type DocumentRepository } from "./document-repository.js";

const dummyDocument: Document = { id: "", text: "" };

let documentRepository: Mocked<DocumentRepository>;
let documentPresenter: Mocked<DocumentPresenter>;
let documentLister: DocumentLister;

beforeEach(() => {
  documentRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn<[number], AsyncIterable<Document[]>>(async function* (
      _: number,
    ) {
      yield [dummyDocument];
      yield [dummyDocument];
    }),
    update: vi.fn(),
  };
  documentPresenter = {
    presentDocuments: vi.fn(),
    presentMoreDocuments: vi.fn(),
  } as unknown as Mocked<DocumentPresenter>;
  documentLister = new DocumentLister(documentRepository, documentPresenter);
});

it("lists documents", async () => {
  await documentLister.list();
  expect(documentPresenter.presentDocuments.mock.calls).toEqual([
    [[{ id: "", text: "" }]],
  ]);
});

it("lists no documents", async () => {
  documentRepository.list = vi.fn<[number], AsyncIterable<Document[]>>(
    async function* (_: number) {},
  );
  await documentLister.list();
  expect(documentPresenter.presentDocuments.mock.calls).toEqual([[[]]]);
});

it("lists more documents", async () => {
  await documentLister.list();
  await documentLister.listMore();
  expect(documentPresenter.presentMoreDocuments.mock.calls).toEqual([
    [[{ id: "", text: "" }]],
  ]);
});

it("lists no more documents", async () => {
  documentRepository.list = vi.fn<[number], AsyncIterable<Document[]>>(
    async function* (_: number) {},
  );
  await documentLister.list();
  await documentLister.listMore();
  expect(documentPresenter.presentMoreDocuments).toHaveBeenCalledTimes(0);
});

it("throws an error if it tries to list more documents before listing initial ones", async () => {
  await expect(documentLister.listMore()).rejects.toThrow();
});
