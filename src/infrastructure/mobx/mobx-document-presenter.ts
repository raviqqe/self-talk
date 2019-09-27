import { IDocumentPresenter } from "../../application/document-presenter";
import { IDocument } from "../../domain/document";
import { DocumentsStore } from "./documents-store";

export class MobxDocumentPresenter implements IDocumentPresenter {
  constructor(private readonly store: DocumentsStore) {}

  public presentDocuments(documents: IDocument[]): void {
    this.store.setDocuments(documents);
  }

  public presentMoreDocuments(documents: IDocument[]): void {
    if (!this.store.documents) {
      throw new Error("documents not loaded");
    }

    this.store.setDocuments([...this.store.documents, ...documents]);
  }

  public presentNewDocument(document: IDocument): void {
    if (!this.store.documents) {
      throw new Error("documents not loaded");
    }

    this.store.setDocuments([document, ...this.store.documents]);
  }

  public presentUpdatedDocument(updatedDocument: IDocument): void {
    if (!this.store.documents) {
      throw new Error("documents not loaded");
    }

    this.store.setDocuments(
      this.store.documents.map(document =>
        document.id === updatedDocument.id ? updatedDocument : document
      )
    );
  }

  public presentDeletedDocument(documentID: string): void {
    if (!this.store.documents) {
      throw new Error("documents not loaded");
    }

    this.store.setDocuments(
      this.store.documents.filter(document => document.id !== documentID)
    );
  }
}
