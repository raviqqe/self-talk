import { expect, beforeEach, it, Mock, vi, Mocked } from "vitest";
import { IConfirmationController } from "./confirmation-controller";
import { DocumentDeleter } from "./document-deleter";
import { IDocumentPresenter } from "./document-presenter";
import { IDocumentRepository } from "./document-repository";

let documentRepository: Mocked<IDocumentRepository>;
let documentPresenter: Mocked<IDocumentPresenter>;
let confirmationController: Mocked<IConfirmationController>;
let documentDeleter: DocumentDeleter;

beforeEach(() => {
  documentRepository = {
    create: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
    update: vi.fn(),
  };
  documentPresenter = {
    presentDeletedDocument: vi.fn(),
  } as unknown as Mocked<IDocumentPresenter>;
  confirmationController = { confirm: vi.fn() };
  documentDeleter = new DocumentDeleter(
    documentRepository,
    documentPresenter,
    confirmationController
  );
});

it("deletes a document after confirmation", async () => {
  confirmationController.confirm.mockResolvedValue(true);
  await documentDeleter.delete("foo");
  expect(documentRepository.delete.mock.calls).toEqual([["foo"]]);
  expect(documentPresenter.presentDeletedDocument.mock.calls).toEqual([
    ["foo"],
  ]);
});

it("does not delete any document if it is not confirmed", async () => {
  confirmationController.confirm.mockResolvedValue(false);
  await documentDeleter.delete("foo");
  expect(documentRepository.delete).toHaveBeenCalledTimes(0);
  expect(documentPresenter.presentDeletedDocument).toHaveBeenCalledTimes(0);
});
