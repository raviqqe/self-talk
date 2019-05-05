export interface IDocument {
  createdAt: number; // Unix timestamp in seconds
  id: string;
  text: string; // in Markdown
}

export function formatDocument(document: IDocument): IDocument {
  return { ...document, text: document.text.trim() };
}

export function validateDocument(document: IDocument): void {
  if (!document.text) {
    throw new Error("document cannot be empty");
  }
}
