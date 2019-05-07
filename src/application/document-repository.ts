import { IDocument } from "../domain/document";

export interface IDocumentRepository {
  create(document: IDocument): Promise<void>;
  delete(documentID: string): Promise<void>;
  list(limit: number): Promise<IListResult>;
  update(document: IDocument): Promise<void>;
}

export interface IListResult {
  documents: IDocument[];
  loadMore: ((limit: number) => Promise<IListResult>) | null;
}
