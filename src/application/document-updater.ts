import {
  type Document,
  formatDocument,
  validateDocument,
} from "../domain/document.js";
import { formatErrorMessage } from "../domain/error.js";
import type { DocumentDeleter } from "./document-deleter.js";
import type { DocumentPresenter } from "./document-presenter.js";
import type { DocumentRepository } from "./document-repository.js";
import type { MessagePresenter } from "./message-presenter.js";

export class DocumentUpdater {
  private readonly documentDeleter: DocumentDeleter;
  private readonly documentRepository: DocumentRepository;
  private readonly documentPresenter: DocumentPresenter;
  private readonly messagePresenter: MessagePresenter;

  public constructor(
    documentDeleter: DocumentDeleter,
    documentRepository: DocumentRepository,
    documentPresenter: DocumentPresenter,
    messagePresenter: MessagePresenter,
  ) {
    this.documentDeleter = documentDeleter;
    this.documentRepository = documentRepository;
    this.documentPresenter = documentPresenter;
    this.messagePresenter = messagePresenter;
  }

  public async update(document: Document): Promise<void> {
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
