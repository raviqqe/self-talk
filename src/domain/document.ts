export interface IDocumentInput {
  text: string;
}

export interface IDocument extends IDocumentInput {
  id: string;
}

export function formatDocument(document: IDocument, text: string): IDocument {
  return { ...document, text: text.trim() };
}
