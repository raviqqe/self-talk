import { type DocumentPresenter } from "../application/document-presenter.js";
import { type Document } from "../domain/document.js";
import { type Renderer } from "./renderer.js";

export class DocumentPresenter implements DocumentPresenter {
  private renderer: Renderer | null = null;
  private documents: Document[] | null = null;

  public setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }

  public presentDocuments(documents: Document[]): void {
    this.renderDocuments(documents);
  }

  public presentMoreDocuments(documents: Document[]): void {
    this.renderDocuments(this.documents && [...this.documents, ...documents]);
  }

  public presentNewDocument(document: Document): void {
    this.renderDocuments(this.documents && [document, ...this.documents]);
  }

  public presentUpdatedDocument(updatedDocument: Document): void {
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

  private renderDocuments(documents: Document[] | null | undefined): void {
    this.documents = documents ?? null;

    this.renderer?.renderDocuments(this.documents);
  }
}
