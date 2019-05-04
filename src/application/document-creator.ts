import UUID from "pure-uuid";
import { formatDocument } from "../domain/document";
import { getUnixTimestamp } from "../domain/utilities";
import { IDocumentRepository } from "./document-repository";

export class DocumentCreator {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  public async create(text: string): Promise<void> {
    await this.documentRepository.create(
      formatDocument({
        createdAt: getUnixTimestamp(),
        id: new UUID(4).format(),
        text
      })
    );
  }
}
