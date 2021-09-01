import {
  IDocument,
  formatDocument,
  validateDocument,
} from "../domain/document";
import { formatErrorMessage } from "../domain/error";
import { DocumentDeleter } from "./document-deleter";
import { IDocumentPresenter } from "./document-presenter";
import { IDocumentRepository } from "./document-repository";
import { IMessagePresenter } from "./message-presenter";

export class DocumentUpdater {
  constructor(
    private readonly documentDeleter: DocumentDeleter,
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async update(document: IDocument): Promise<void> {
    document = formatDocument(document);

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
