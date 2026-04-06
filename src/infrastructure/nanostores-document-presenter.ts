import { atom } from "nanostores";
import type { DocumentPresenter } from "../application/document-presenter.js";
import type { Document } from "../domain/document.js";

export class NanostoresDocumentPresenter implements DocumentPresenter {
  readonly documents = atom<Document[] | null>(null);

  presentDocuments(documents: Document[]): void {
    this.#renderDocuments(documents);
  }

  presentMoreDocuments(documents: Document[]): void {
    const oldDocuments = this.documents.get();

    if (!oldDocuments) {
      return;
    }

    this.#renderDocuments([...oldDocuments, ...documents]);
  }

  presentNewDocument(document: Document): void {
    const oldDocuments = this.documents.get();

    if (!oldDocuments) {
      return;
    }

    this.#renderDocuments([document, ...oldDocuments]);
  }

  presentUpdatedDocument(updatedDocument: Document): void {
    this.#renderDocuments(
      this.documents
        .get()
        ?.map((document) =>
          document.id === updatedDocument.id ? updatedDocument : document,
        ),
    );
  }

  presentDeletedDocument(documentId: string): void {
    this.#renderDocuments(
      this.documents.get()?.filter((document) => document.id !== documentId),
    );
  }

  #renderDocuments(documents: Document[] | null | undefined): void {
    this.documents.set(documents ?? null);
  }
}
