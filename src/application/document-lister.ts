import { IDocument } from "../domain/document";
import { IDocumentRepository } from "./document-repository";

export class DocumentLister {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  public async list(): Promise<IDocument[]> {
    return this.documentRepository.list();
  }
}
