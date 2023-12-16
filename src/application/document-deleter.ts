import { type ConfirmationController } from "./confirmation-controller.js";
import { type DocumentPresenter } from "./document-presenter.js";
import { type DocumentRepository } from "./document-repository.js";

export class DocumentDeleter {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly documentPresenter: DocumentPresenter,
    private readonly confirmationController: ConfirmationController,
  ) {}

  public async delete(documentId: string): Promise<void> {
    if (
      await this.confirmationController.confirm(
        "Do you want to delete the document?",
      )
    ) {
      this.documentPresenter.presentDeletedDocument(documentId);
      await this.documentRepository.delete(documentId);
    }
  }
}
