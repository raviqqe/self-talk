import { DocumentCreator } from "../document-creator";
import { IDocumentRepository } from "../document-repository";
import { IMessagePresenter } from "../message-presenter";

let createMock: jest.Mock;
let presentMock: jest.Mock;
let documentCreator: DocumentCreator;

beforeEach(() => {
  createMock = jest.fn();
  presentMock = jest.fn();
  documentCreator = new DocumentCreator(
    ({
      create: createMock
    } as unknown) as IDocumentRepository,
    { present: presentMock } as IMessagePresenter
  );
});

it("creates and persists a document", async () => {
  await documentCreator.create("foo");
  expect(createMock.mock.calls).toHaveLength(1);
});

it("formats a document before creation", async () => {
  await documentCreator.create("\tfoo ");
  expect(createMock.mock.calls[0][0].text).toBe("foo");
});

it("validates a document before creation", async () => {
  await documentCreator.create("");
  expect(presentMock.mock.calls).toEqual([["Document cannot be empty!"]]);
});
