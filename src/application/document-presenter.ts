import { type Document } from "../domain/document.js";

export interface DocumentPresenter {
  presentDocuments(documents: Document[]): void;
  presentMoreDocuments(documents: Document[]): void;
  presentNewDocument(document: Document): void;
  presentUpdatedDocument(document: Document): void;
  presentDeletedDocument(documentId: string): void;
}
