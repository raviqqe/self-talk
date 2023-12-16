import { type Document } from "../domain/document.js";

export interface Renderer {
  renderDocuments(documents: Document[] | null): void;
  renderSignedIn(signedIn: boolean): void;
}
