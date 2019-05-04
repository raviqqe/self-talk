export interface IDocument {
  createdAt: number; // Unix timestamp in seconds
  id: string;
  text: string; // in Markdown
}

export function formatDocument(document: IDocument): IDocument {
  return { ...document, text: document.text.trim() };
}
