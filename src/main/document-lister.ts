import { DocumentLister } from "../application/document-lister.js";
import { documentPresenter } from "./document-presenter.js";
import { documentRepository } from "./document-repository.js";

export const documentLister = new DocumentLister(
  documentRepository,
  documentPresenter,
);
