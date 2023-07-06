import markdownParser from "prettier/parser-markdown.js";
import { format } from "prettier/standalone.js";

export interface IDocument {
  id: string;
  text: string; // in Markdown
}

export async function formatDocument(document: IDocument): Promise<IDocument> {
  return {
    ...document,
    text: (
      await format(document.text, {
        parser: "markdown",
        plugins: [markdownParser],
      })
    ).trim(),
  };
}

export function validateDocument(document: IDocument): void {
  if (!document.text) {
    throw new Error("document cannot be empty");
  }
}
