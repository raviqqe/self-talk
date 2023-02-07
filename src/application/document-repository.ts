import { IDocument } from "../domain/document";

export interface IDocumentRepository {
  create(document: IDocument): Promise<void>;
  delete(documentId: string): Promise<void>;
  list(limit: number): AsyncIterable<IDocument[]>;
  update(document: IDocument): Promise<void>;
}
