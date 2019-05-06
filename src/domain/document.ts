import markdownParser from "prettier/parser-markdown";
import prettier from "prettier/standalone";

export interface IDocument {
  createdAt: number; // Unix timestamp in seconds
  id: string;
  text: string; // in Markdown
}

export function formatDocument(document: IDocument): IDocument {
  return {
    ...document,
    text: prettier
      .format(document.text, { parser: "markdown", plugins: [markdownParser] })
      .trim()
  };
}

export function validateDocument(document: IDocument): void {
  if (!document.text) {
    throw new Error("document cannot be empty");
  }
}
