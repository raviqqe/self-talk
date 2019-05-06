import { IDocument } from "../domain/document";
import { IDocumentRepository } from "./document-repository";

const defaultLimit: number = 10;

export class DocumentLister<C> {
  private cursor: C | null = null;

  constructor(private readonly documentRepository: IDocumentRepository<C>) {}

  public async list(): Promise<IDocument[]> {
    const result = await this.documentRepository.list(defaultLimit);
    this.cursor = result.cursor;
    return result.documents;
  }

  public async listMore(): Promise<IDocument[]> {
    if (!this.cursor) {
      return [];
    }

    const result = await this.documentRepository.listFromCursor(
      this.cursor,
      defaultLimit
    );
    this.cursor = result.cursor;
    return result.documents;
  }
}
