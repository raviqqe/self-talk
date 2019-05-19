import { ClipboardEvent } from "react";

export type InsertImageFunction = (
  text: string,
  position: number,
  image: Blob
) => Promise<string>;

export function useOnPaste(
  text: string,
  setText: (text: string) => void,
  insertImage: InsertImageFunction
): (event: ClipboardEvent<HTMLTextAreaElement>) => Promise<void> {
  return async (event: ClipboardEvent<HTMLTextAreaElement>): Promise<void> => {
    if (!event.clipboardData || !event.clipboardData.items) {
      return;
    }

    const images: File[] = Array.from(event.clipboardData.items)
      .filter(item => item.type.startsWith("image/"))
      .map(item => item.getAsFile())
      .filter((image): image is File => !!image);

    if (images.length === 0) {
      return;
    }

    // TODO: Support multiple image upload.
    setText(
      await insertImage(text, event.currentTarget.selectionStart, images[0])
    );
  };
}
