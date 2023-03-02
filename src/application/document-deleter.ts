import { type IConfirmationController } from "./confirmation-controller.js";
import { type IDocumentPresenter } from "./document-presenter.js";
import { type IDocumentRepository } from "./document-repository.js";

export class DocumentDeleter {
  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter,
    private readonly confirmationController: IConfirmationController
  ) {}

  public async delete(documentId: string): Promise<void> {
    if (
      await this.confirmationController.confirm(
        "Do you want to delete the document?"
      )
    ) {
      this.documentPresenter.presentDeletedDocument(documentId);
      await this.documentRepository.delete(documentId);
    }
  }
}
