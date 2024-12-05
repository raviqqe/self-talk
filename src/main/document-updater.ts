import { DocumentUpdater } from "../application/document-updater.js";
import { documentDeleter } from "./document-deleter.js";
import { documentPresenter } from "./document-presenter.js";
import { documentRepository } from "./document-repository.js";
import { messagePresenter } from "./message-presenter.js";

export const documentUpdater = new DocumentUpdater(
  documentDeleter,
  documentRepository,
  documentPresenter,
  messagePresenter,
);
