import { DocumentDeleter } from "../application/document-deleter.js";
import { confirmationController } from "./confirmation-controller.js";
import { documentPresenter } from "./document-presenter.js";
import { documentRepository } from "./document-repository.js";

export const documentDeleter = new DocumentDeleter(
  documentRepository,
  documentPresenter,
  confirmationController,
);
