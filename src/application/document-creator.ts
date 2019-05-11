import UUID from "pure-uuid";
import { formatDocument, validateDocument } from "../domain/document";
import { formatErrorMessage } from "../domain/error";
import { getUnixTimestamp } from "../domain/utilities";
import { IDocumentRepository } from "./document-repository";
import { IMessagePresenter } from "./message-presenter";

export class DocumentCreator {
  constructor(
    private readonly documentRepository: IDocumentRepository,
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
      await this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    await this.documentRepository.create(formatDocument(document));
  }
}
