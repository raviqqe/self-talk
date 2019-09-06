import { IDocument } from "../domain/document";
import { IDocumentRepository } from "./document-repository";
import { IDocumentPresenter } from "./document-presenter";

const defaultLimit: number = 20;

export class DocumentLister {
  private iterator: AsyncIterator<IDocument[]> | null = null;

  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter
  ) {}

  public async list(): Promise<void> {
    this.iterator = this.documentRepository.list(defaultLimit);
    const result = await this.iterator.next();
    this.documentPresenter.presentDocuments(result.value);
  }

  public async listMore(): Promise<void> {
    if (!this.iterator) {
      throw new Error("iterator not initialized");
    }

    const result = await this.iterator.next();
    this.documentPresenter.presentMoreDocuments(result.value);
  }
}
