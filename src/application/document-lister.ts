import { IDocument } from "../domain/document";
import { IDocumentRepository, IListResult } from "./document-repository";

const defaultLimit: number = 20;

export class DocumentLister {
  private loadMore: ((limit: number) => Promise<IListResult>) | null = null;

  constructor(private readonly documentRepository: IDocumentRepository) {}

  public async list(): Promise<IDocument[]> {
    const result = await this.documentRepository.list(defaultLimit);
    this.loadMore = result.loadMore;
    return result.documents;
  }

  public async listMore(): Promise<IDocument[]> {
    if (!this.loadMore) {
      return [];
    }

    const result = await this.loadMore(defaultLimit);
    this.loadMore = result.loadMore;
    return result.documents;
  }
}
