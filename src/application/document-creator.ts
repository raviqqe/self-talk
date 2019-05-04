import { IDocumentRepository } from "./document-repository";

export class DocumentCreator {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  public async create(text: string): Promise<void> {
    await this.documentRepository.create({ text });
  }
}
