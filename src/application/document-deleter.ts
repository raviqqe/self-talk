import { IConfirmationController } from "./confirmation-controller";
import { IDocumentRepository } from "./document-repository";

export class DocumentDeleter {
  constructor(
    private readonly documentRepository: IDocumentRepository<unknown>,
    private readonly confirmationController: IConfirmationController
  ) {}

  public async delete(documentID: string): Promise<void> {
    if (
      await this.confirmationController.confirm(
        "Do you want to delete the document?"
      )
    ) {
      await this.documentRepository.delete(documentID);
    }
  }
}
