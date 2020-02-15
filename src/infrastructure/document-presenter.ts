import { IDocumentPresenter } from "../application/document-presenter";
import { IDocument } from "../domain/document";
import { IRenderer } from "./renderer";

export class DocumentPresenter implements IDocumentPresenter {
  private renderer: IRenderer | null = null;
  private documents: IDocument[] | null = null;

  public setRenderer(renderer: IRenderer) {
    this.renderer = renderer;
  }

  public presentDocuments(documents: IDocument[]): void {
    this.documents = documents;

    this.renderer?.renderDocuments(documents);
  }

  public presentMoreDocuments(documents: IDocument[]): void {
    this.renderer?.renderDocuments(
      this.documents && [...this.documents, ...documents]
    );
  }

  public presentNewDocument(document: IDocument): void {
    this.renderer?.renderDocuments(
      this.documents && [document, ...this.documents]
    );
  }

  public presentUpdatedDocument(updatedDocument: IDocument): void {
    this.renderer?.renderDocuments(
      this.documents &&
        this.documents.map(document =>
          document.id === updatedDocument.id ? updatedDocument : document
        )
    );
  }

  public presentDeletedDocument(documentID: string): void {
    this.renderer?.renderDocuments(
      this.documents &&
        this.documents.filter(document => document.id !== documentID)
    );
  }
}
