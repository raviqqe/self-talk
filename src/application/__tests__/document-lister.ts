import { DocumentLister } from "../document-lister";
import { IDocumentRepository } from "../document-repository";
import { IDocumentPresenter } from "../document-presenter";
import { IDocument } from "../../domain/document";

const dummyDocument: IDocument = { id: "", text: "" };

let documentRepository: jest.Mocked<IDocumentRepository>;
let documentPresenter: jest.Mocked<IDocumentPresenter>;
let documentLister: DocumentLister;

beforeEach(() => {
  documentRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(async function*(_: number) {
      yield [dummyDocument];
      yield [dummyDocument];
    }),
    update: jest.fn()
  };
  documentPresenter = {
    presentDeletedDocument: jest.fn(),
    presentDocuments: jest.fn(),
    presentNewDocument: jest.fn(),
    presentUpdatedDocument: jest.fn()
  };
  documentLister = new DocumentLister(documentRepository, documentPresenter);
});

it("lists documents", async () => {
  await documentLister.list();
  expect(documentPresenter.presentDocuments.mock.calls).toEqual([
    [[{ id: "", text: "" }]]
  ]);
});

it("lists more documents", async () => {
  await documentLister.list();
  await documentLister.listMore();
  expect(documentPresenter.presentDocuments.mock.calls).toEqual([
    [[{ id: "", text: "" }]],
    [[{ id: "", text: "" }, { id: "", text: "" }]]
  ]);
});

it("throws an error if it tries to list more documents before listing initial ones", async () => {
  await expect(documentLister.listMore()).rejects.toThrowError();
});
