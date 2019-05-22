import { DocumentLister } from "../document-lister";
import { IDocumentRepository } from "../document-repository";

let listMock: jest.Mock;
let documentLister: DocumentLister;

beforeEach(() => {
  listMock = jest.fn();
  documentLister = new DocumentLister(({
    list: listMock
  } as unknown) as IDocumentRepository);
});

it("lists documents", async () => {
  await documentLister.list();
  expect(listMock.mock.calls).toHaveLength(1);
});
