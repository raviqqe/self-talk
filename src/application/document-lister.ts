import type { Document } from "../domain/document.js";
import type { DocumentPresenter } from "./document-presenter.js";
import type { DocumentRepository } from "./document-repository.js";

const defaultLimit = 20;

export class DocumentLister {
  readonly #documentRepository: DocumentRepository;
  readonly #documentPresenter: DocumentPresenter;
  #iterator: AsyncIterator<Document[], void> | null = null;

  constructor(
    documentRepository: DocumentRepository,
    documentPresenter: DocumentPresenter,
  ) {
    this.#documentRepository = documentRepository;
    this.#documentPresenter = documentPresenter;
  }

  async list(): Promise<void> {
    this.#iterator = this.#documentRepository
      .list(defaultLimit)
      [Symbol.asyncIterator]();
    this.#documentPresenter.presentDocuments(
      (await this.#iterator.next()).value ?? [],
    );
  }

  async listMore(): Promise<void> {
    if (!this.#iterator) {
      throw new Error("iterator not initialized");
    }

    const result = await this.#iterator.next();

    if (result.done) {
      return;
    }

    this.#documentPresenter.presentMoreDocuments(result.value);
  }
}
