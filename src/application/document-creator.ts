import { formatDocument, validateDocument } from "../domain/document.js";
import { formatErrorMessage } from "../domain/error.js";
import { type IDocumentPresenter } from "./document-presenter.js";
import { type IDocumentRepository } from "./document-repository.js";
import { type IMessagePresenter } from "./message-presenter.js";

export class DocumentCreator {
  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter,
    private readonly messagePresenter: IMessagePresenter,
  ) {}

  public async create(text: string): Promise<void> {
    const document = formatDocument({ id: window.crypto.randomUUID(), text });

    try {
      validateDocument(document);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error as Error));
      return;
    }

    this.documentPresenter.presentNewDocument(document);
    await this.documentRepository.create(formatDocument(document));
  }
}
