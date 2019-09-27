import { action, observable } from "mobx";
import { IDocument } from "../../domain/document";

export class DocumentsStore {
  @observable public documents: IDocument[] | null = null;

  @action
  public setDocuments(documents: IDocument[]): void {
    this.documents = documents;
  }
}
