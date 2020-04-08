import UUID from "pure-uuid";
import { formatDocument, validateDocument } from "../domain/document";
import { formatErrorMessage } from "../domain/error";
import { IDocumentPresenter } from "./document-presenter";
import { IDocumentRepository } from "./document-repository";
import { IMessagePresenter } from "./message-presenter";

export class DocumentCreator {
  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(text: string): Promise<void> {
    const document = formatDocument({ id: new UUID(4).format(), text });

    try {
      validateDocument(document);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    this.documentPresenter.presentNewDocument(document);
    await this.documentRepository.create(formatDocument(document));
  }
}
