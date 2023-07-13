import { type IDocument } from "../domain/document.js";
import { type IDocumentPresenter } from "./document-presenter.js";
import { type IDocumentRepository } from "./document-repository.js";

const defaultLimit = 20;

export class DocumentLister {
  private iterator: AsyncIterator<IDocument[], void> | null = null;

  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter,
  ) {}

  public async list(): Promise<void> {
    this.iterator = this.documentRepository
      .list(defaultLimit)
      [Symbol.asyncIterator]();
    this.documentPresenter.presentDocuments(
      (await this.iterator.next()).value || [],
    );
  }

  public async listMore(): Promise<void> {
    if (!this.iterator) {
      throw new Error("iterator not initialized");
    }

    const result = await this.iterator.next();

    if (result.done) {
      return;
    }

    this.documentPresenter.presentMoreDocuments(result.value);
  }
}
