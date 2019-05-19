import React, { ChangeEvent, ClipboardEvent } from "react";
import { TextArea } from "./TextArea";
import { InsertImageFunction } from "./utilities";

interface IProps {
  className?: string;
  insertImage: InsertImageFunction;
  onSubmit: () => Promise<void>;
  setText: (text: string) => void;
  text: string;
}

export const MarkdownTextArea = ({
  insertImage,
  onSubmit,
  setText,
  text,
  ...restProps
}: IProps) => {
  return (
    <TextArea
      onSubmit={onSubmit}
      placeholder="Write in Markdown ..."
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        setText(event.target.value)
      }
      onPaste={async (
        event: ClipboardEvent<HTMLTextAreaElement>
      ): Promise<void> => {
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
      }}
      value={text}
      {...restProps}
    />
  );
};
