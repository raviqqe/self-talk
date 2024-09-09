import { type Document } from "../domain/document.js";

export interface DocumentPresenter {
  presentDeletedDocument(documentId: string): void;
  presentDocuments(documents: Document[]): void;
  presentMoreDocuments(documents: Document[]): void;
  presentNewDocument(document: Document): void;
  presentUpdatedDocument(document: Document): void;
}
