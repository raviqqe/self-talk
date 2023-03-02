import { type IDocument } from "../domain/document";

export interface IRenderer {
  renderDocuments(documents: IDocument[] | null): void;
  renderSignedIn(signedIn: boolean): void;
}
