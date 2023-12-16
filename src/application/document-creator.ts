import { formatDocument, validateDocument } from "../domain/document.js";
import { formatErrorMessage } from "../domain/error.js";
import { type DocumentPresenter } from "./document-presenter.js";
import { type DocumentRepository } from "./document-repository.js";
import { type MessagePresenter } from "./message-presenter.js";

export class DocumentCreator {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly documentPresenter: DocumentPresenter,
    private readonly messagePresenter: MessagePresenter,
  ) {}

  public async create(text: string): Promise<void> {
    const document = await formatDocument({
      id: window.crypto.randomUUID(),
      text,
    });

    try {
      validateDocument(document);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error as Error));
      return;
    }

    this.documentPresenter.presentNewDocument(document);
    await this.documentRepository.create(await formatDocument(document));
  }
}
