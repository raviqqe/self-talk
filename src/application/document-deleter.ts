import { IConfirmationController } from "./confirmation-controller";
import { IDocumentRepository } from "./document-repository";
import { IDocumentPresenter } from "./document-presenter";

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
