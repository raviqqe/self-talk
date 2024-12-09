import markdownParser from "prettier/parser-markdown.js";
import { format } from "prettier/standalone";

export interface Document {
  id: string;
  text: string; // in Markdown
}

export async function formatDocument(document: Document): Promise<Document> {
  return {
    ...document,
    text: (
      await format(document.text, {
        parser: "markdown",
        plugins: [markdownParser],
      })
    )
      .trim()
      // https://github.com/prettier/prettier/issues/6213
      .replace(/\\*\$/g, "$"),
  };
}

export function validateDocument(document: Document): void {
  if (!document.text) {
    throw new Error("document cannot be empty");
  }
}
