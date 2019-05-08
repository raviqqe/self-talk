import { IDocument } from "../domain/document";
import { IDocumentRepository } from "./document-repository";

const defaultLimit: number = 20;

export class DocumentLister {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  public list(): AsyncIterator<IDocument[]> {
    return this.documentRepository.list(defaultLimit);
  }
}
