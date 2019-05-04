export interface IDocument {
  id: string;
  text: string;
}

export function formatDocument(document: IDocument, text: string): IDocument {
  return { ...document, text: text.trim() };
}
