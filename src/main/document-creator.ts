import { DocumentCreator } from "../application/document-creator.js";
import { documentPresenter } from "./document-presenter.js";
import { documentRepository } from "./document-repository.js";
import { messagePresenter } from "./message-presenter.js";

export const documentCreator = new DocumentCreator(
  documentRepository,
  documentPresenter,
  messagePresenter,
);
