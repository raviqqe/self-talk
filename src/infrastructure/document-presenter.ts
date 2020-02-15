import { IDocumentPresenter } from "../application/document-presenter";
import { IDocument } from "../domain/document";
import { IRenderer } from "./renderer";

export class DocumentPresenter implements IDocumentPresenter {
  private renderer: IRenderer | null = null;
  private documents: IDocument[] | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentDocuments(documents: IDocument[]): void {
    this.documents = documents;

    this.render();
  }

  public presentMoreDocuments(documents: IDocument[]): void {
    this.documents = this.documents && [...this.documents, ...documents];

    this.render();
  }

  public presentNewDocument(document: IDocument): void {
    this.documents = this.documents && [document, ...this.documents];

    this.render();
  }

  public presentUpdatedDocument(updatedDocument: IDocument): void {
    this.documents =
      this.documents &&
      this.documents.map(document =>
        document.id === updatedDocument.id ? updatedDocument : document
      );

    this.render();
  }

  public presentDeletedDocument(documentID: string): void {
    this.documents =
      this.documents &&
      this.documents.filter(document => document.id !== documentID);

    this.render();
  }

  private render(): void {
    this.renderer?.renderDocuments(this.documents);
  }
}
