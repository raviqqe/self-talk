import { atom } from "nanostores";
import { type DocumentPresenter } from "../application/document-presenter.js";
import { type Document } from "../domain/document.js";

export class NanostoresDocumentPresenter implements DocumentPresenter {
  public documents = atom<Document[] | null>(null);

  public presentDocuments(documents: Document[]): void {
    this.renderDocuments(documents);
  }

  public presentMoreDocuments(documents: Document[]): void {
    const oldDocuments = this.documents.get();
    this.renderDocuments(oldDocuments && [...oldDocuments, ...documents]);
  }

  public presentNewDocument(document: Document): void {
    const oldDocuments = this.documents.get();
    this.renderDocuments(oldDocuments && [document, ...oldDocuments]);
  }

  public presentUpdatedDocument(updatedDocument: Document): void {
    this.renderDocuments(
      this.documents
        .get()
        ?.map((document) =>
          document.id === updatedDocument.id ? updatedDocument : document,
        ),
    );
  }

  public presentDeletedDocument(documentId: string): void {
    this.renderDocuments(
      this.documents.get()?.filter((document) => document.id !== documentId),
    );
  }

  private renderDocuments(documents: Document[] | null | undefined): void {
    this.documents.set(documents ?? null);
  }
}
