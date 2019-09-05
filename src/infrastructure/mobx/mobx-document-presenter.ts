import { IDocumentPresenter } from "../../application/document-presenter";
import { IDocument } from "../../domain/document";
import { DocumentsStore } from "./documents-store";

export class MobxDocumentPresenter implements IDocumentPresenter {
  constructor(private readonly store: DocumentsStore) {}

  public presentDocuments(documents: IDocument[]): void {
    this.store.setDocuments(documents);
  }

  public presentNewDocument(document: IDocument): void {
    this.store.appendDocument(document);
  }

  public presentUpdatedDocument(document: IDocument): void {
    this.store.updateDocument(document);
  }

  public presentDeletedDocument(documentID: string): void {
    this.store.deleteDocument(documentID);
  }
}
