import { IDocument } from "../domain";

export interface IDocumentStore {
  createDocument(document: IDocument): Promise<void>;
  getDocuments(offset: number): Promise<IDocument[]>;
  updateDocument(document: IDocument): Promise<void>;
}
