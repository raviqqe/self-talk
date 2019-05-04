export interface IDocument {
  createdAt: number; // Unix timestamp in seconds
  id: string;
  text: string; // in Markdown
}

export function formatDocument(document: IDocument, text: string): IDocument {
  return { ...document, text: text.trim() };
}
