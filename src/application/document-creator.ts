import UUID from "pure-uuid";
import { formatDocument, validateDocument } from "../domain/document";
import { getUnixTimestamp } from "../domain/utilities";
import { IDocumentRepository } from "./document-repository";
import { IMessagePresenter } from "./message-presenter";

export class DocumentCreator {
  constructor(
    private readonly documentRepository: IDocumentRepository<unknown>,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(text: string): Promise<void> {
    const document = formatDocument({
      createdAt: getUnixTimestamp(),
      id: new UUID(4).format(),
      text
    });

    try {
      validateDocument(document);
    } catch (error) {
      await this.messagePresenter.present(error.message);
      return;
    }

    await this.documentRepository.create(formatDocument(document));
  }
}
