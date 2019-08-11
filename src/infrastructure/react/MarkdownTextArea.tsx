import React, {
  ChangeEvent,
  ClipboardEvent,
  DragEvent,
  SyntheticEvent
} from "react";
import { InsertFilesFunction } from "./utilities";
import { TextArea } from "./TextArea";

interface IProps {
  className?: string;
  insertFiles: InsertFilesFunction;
  onSubmit: () => Promise<void>;
  setText: (text: string) => void;
  text: string;
}

export const MarkdownTextArea = ({
  insertFiles,
  onSubmit,
  setText,
  text,
  ...restProps
}: IProps) => {
  const uploadFiles = async (
    event: SyntheticEvent<HTMLTextAreaElement>,
    files: Array<File | null>
  ) => {
    const validFiles = files.filter((file): file is File => !!file);

    if (validFiles.length === 0) {
      return;
    }

    setText(
      await insertFiles(text, event.currentTarget.selectionStart, validFiles)
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
        uploadFiles(event, Array.from(event.dataTransfer.files))
      }
      onPaste={async (
        event: ClipboardEvent<HTMLTextAreaElement>
      ): Promise<void> => {
        if (!event.clipboardData || !event.clipboardData.items) {
          return;
        }

        await uploadFiles(
          event,
          Array.from(event.clipboardData.items).map(item => item.getAsFile())
        );
      }}
      value={text}
      {...restProps}
    />
  );
};
