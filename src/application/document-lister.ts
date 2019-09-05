import { IDocument } from "../domain/document";
import { IDocumentRepository } from "./document-repository";
import { IDocumentPresenter } from "./document-presenter";

const defaultLimit: number = 20;

export class DocumentLister {
  private documents: IDocument[] = [];
  private iterator: AsyncIterator<IDocument[]> | null = null;

  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly documentPresenter: IDocumentPresenter
  ) {}

  public async list(): Promise<void> {
    this.documents = [];
    this.iterator = this.documentRepository.list(defaultLimit);
    await this.listMore();
  }

  public async listMore(): Promise<void> {
    if (!this.iterator) {
      throw new Error("iterator not initialized");
    }

    const result = await this.iterator.next();
    this.documents = [...this.documents, ...result.value];
    this.documentPresenter.presentDocuments(this.documents);
  }
}
