import { IDocument } from "../domain/document";

export interface IDocumentRepository {
  create(document: IDocument): Promise<void>;
  delete(documentID: string): Promise<void>;
  list(limit: number): AsyncIterator<IDocument[]>;
  update(document: IDocument): Promise<void>;
}
