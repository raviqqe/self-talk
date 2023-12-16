import { type Document } from "../domain/document.js";

export interface DocumentRepository {
  create(document: Document): Promise<void>;
  delete(documentId: string): Promise<void>;
  list(limit: number): AsyncIterable<Document[]>;
  update(document: Document): Promise<void>;
}
