import {
  type IDocument,
  formatDocument,
  validateDocument,
} from "../domain/document.js";
import { formatErrorMessage } from "../domain/error.js";
import { type DocumentDeleter } from "./document-deleter.js";
import { type IDocumentPresenter } from "./document-presenter.js";
import { type IDocumentRepository } from "./document-repository.js";
import { type IMessagePresenter } from "./message-presenter.js";

export class DocumentUpdater {
  constructor(
    private readonly documentDeleter: DocumentDeleter,
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter,
    private readonly messagePresenter: IMessagePresenter,
  ) {}

  public async update(document: IDocument): Promise<void> {
    document = await formatDocument(document);

    if (!document.text) {
      await this.documentDeleter.delete(document.id);
      return;
    }

    try {
      validateDocument(document);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error as Error));
      return;
    }

    this.documentPresenter.presentUpdatedDocument(document);
    await this.documentRepository.update(document);
  }
}
