import { expect, beforeEach, vi, it, type Mocked } from "vitest";
import { type IDocument } from "../domain/document";
import { DocumentLister } from "./document-lister";
import { type IDocumentPresenter } from "./document-presenter";
import { type IDocumentRepository } from "./document-repository";

const dummyDocument: IDocument = { id: "", text: "" };

let documentRepository: Mocked<IDocumentRepository>;
let documentPresenter: Mocked<IDocumentPresenter>;
let documentLister: DocumentLister;

beforeEach(() => {
  documentRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(async function* (_: number) {
      yield [dummyDocument];
      yield [dummyDocument];
    }),
    update: vi.fn(),
  };
  documentPresenter = {
    presentDocuments: vi.fn(),
    presentMoreDocuments: vi.fn(),
  } as unknown as Mocked<IDocumentPresenter>;
  documentLister = new DocumentLister(documentRepository, documentPresenter);
});

it("lists documents", async () => {
  await documentLister.list();
  expect(documentPresenter.presentDocuments.mock.calls).toEqual([
    [[{ id: "", text: "" }]],
  ]);
});

it("lists no documents", async () => {
  documentRepository.list = vi.fn(async function* (_: number) {});
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
  documentRepository.list = vi.fn(async function* (_: number) {});
  await documentLister.list();
  await documentLister.listMore();
  expect(documentPresenter.presentMoreDocuments).toHaveBeenCalledTimes(0);
});

it("throws an error if it tries to list more documents before listing initial ones", async () => {
  await expect(documentLister.listMore()).rejects.toThrow();
});
