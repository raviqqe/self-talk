import { IDocumentInput } from "../domain/document";

export interface IDocumentRepository {
  create(input: IDocumentInput): Promise<void>;
}
