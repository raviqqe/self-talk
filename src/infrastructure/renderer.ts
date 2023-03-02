import { type IDocument } from "../domain/document.js";

export interface IRenderer {
  renderDocuments(documents: IDocument[] | null): void;
  renderSignedIn(signedIn: boolean): void;
}
