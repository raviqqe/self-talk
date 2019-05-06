import { IDocument } from "../domain/document";

export interface IDocumentRepository<C> {
  create(document: IDocument): Promise<void>;
  list(limit: number): Promise<IListResult<C>>;
  listFromCursor(cursor: C, limit: number): Promise<IListResult<C>>;
}

export interface IListResult<C> {
  documents: IDocument[];
  cursor: C | null;
}
