import { type IDocumentPresenter } from "../application/document-presenter.js";
import { type IDocument } from "../domain/document.js";
import { type IRenderer } from "./renderer.js";

export class DocumentPresenter implements IDocumentPresenter {
  private renderer: IRenderer | null = null;
  private documents: IDocument[] | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentDocuments(documents: IDocument[]): void {
    this.renderDocuments(documents);
  }

  public presentMoreDocuments(documents: IDocument[]): void {
    this.renderDocuments(this.documents && [...this.documents, ...documents]);
  }

  public presentNewDocument(document: IDocument): void {
    this.renderDocuments(this.documents && [document, ...this.documents]);
  }

  public presentUpdatedDocument(updatedDocument: IDocument): void {
    this.renderDocuments(
      this.documents?.map((document) =>
        document.id === updatedDocument.id ? updatedDocument : document,
      ),
    );
  }

  public presentDeletedDocument(documentId: string): void {
    this.renderDocuments(
      this.documents?.filter((document) => document.id !== documentId),
    );
  }

  private renderDocuments(documents: IDocument[] | null | undefined): void {
    this.documents = documents ?? null;

    this.renderer?.renderDocuments(this.documents);
  }
}
