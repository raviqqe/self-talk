import React, { ChangeEvent, ClipboardEvent } from "react";
import { TextArea } from "./TextArea";
import { InsertImagesFunction } from "./utilities";

interface IProps {
  className?: string;
  insertImages: InsertImagesFunction;
  onSubmit: () => Promise<void>;
  setText: (text: string) => void;
  text: string;
}

export const MarkdownTextArea = ({
  insertImages,
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

        setText(
          await insertImages(text, event.currentTarget.selectionStart, images)
        );
      }}
      value={text}
      {...restProps}
    />
  );
};
