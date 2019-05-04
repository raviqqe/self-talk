import { IDocument } from "../domain/document";

export interface IDocumentRepository {
  create(document: IDocument): Promise<void>;
  list(): Promise<IDocument[]>;
}
