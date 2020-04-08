import { IConfirmationController } from "./confirmation-controller";
import { IDocumentPresenter } from "./document-presenter";
import { IDocumentRepository } from "./document-repository";

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
