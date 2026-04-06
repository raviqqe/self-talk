import type { ConfirmationController } from "./confirmation-controller.js";
import type { DocumentPresenter } from "./document-presenter.js";
import type { DocumentRepository } from "./document-repository.js";

export class DocumentDeleter {
  readonly #documentRepository: DocumentRepository;
  readonly #documentPresenter: DocumentPresenter;
  readonly #confirmationController: ConfirmationController;

  constructor(
    documentRepository: DocumentRepository,
    documentPresenter: DocumentPresenter,
    confirmationController: ConfirmationController,
  ) {
    this.#documentRepository = documentRepository;
    this.#documentPresenter = documentPresenter;
    this.#confirmationController = confirmationController;
  }

  async delete(documentId: string): Promise<void> {
    if (
      await this.#confirmationController.confirm(
        "Do you want to delete the document?",
      )
    ) {
      this.#documentPresenter.presentDeletedDocument(documentId);
      await this.#documentRepository.delete(documentId);
    }
  }
}
