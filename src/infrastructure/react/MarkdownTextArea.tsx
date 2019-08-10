import React, {
  ChangeEvent,
  ClipboardEvent,
  DragEvent,
  SyntheticEvent
} from "react";
import { InsertImagesFunction } from "./utilities";
import { TextArea } from "./TextArea";

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
  const uploadImages = async (
    event: SyntheticEvent<HTMLTextAreaElement>,
    files: Array<File | null>
  ) => {
    const images = files
      .filter((file): file is File => !!file)
      .filter(file => file.type.startsWith("image/"));

    if (images.length === 0) {
      return;
    }

    setText(
      await insertImages(text, event.currentTarget.selectionStart, images)
    );
  };

  return (
    <TextArea
      onSubmit={onSubmit}
      placeholder="Write in Markdown ..."
      onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
        setText(event.target.value)
      }
      onDrop={(event: DragEvent<HTMLTextAreaElement>): Promise<void> =>
        uploadImages(event, Array.from(event.dataTransfer.files))
      }
      onPaste={async (
        event: ClipboardEvent<HTMLTextAreaElement>
      ): Promise<void> => {
        if (!event.clipboardData || !event.clipboardData.items) {
          return;
        }

        await uploadImages(
          event,
          Array.from(event.clipboardData.items).map(item => item.getAsFile())
        );
      }}
      value={text}
      {...restProps}
    />
  );
};
