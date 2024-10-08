import { styled } from "@linaria/react";
import { type SyntheticEvent, useState } from "react";
import { PulseLoader } from "react-spinners";
import { TextArea } from "./TextArea.js";
import { white } from "./style/colors.js";
import { type InsertFilesFunction } from "./utilities.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface Props {
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
}: Props): JSX.Element => {
  const [uploadingFiles, setUploadingFiles] = useState(false);

  const uploadFiles = async (
    event: SyntheticEvent<HTMLTextAreaElement>,
    files: (File | null)[],
  ) => {
    const validFiles = files.filter((file): file is File => !!file);

    if (validFiles.length === 0) {
      return;
    }

    setUploadingFiles(true);

    setText(
      await insertFiles(text, event.currentTarget.selectionStart, validFiles),
    );

    setUploadingFiles(false);
  };

  if (uploadingFiles) {
    return (
      <LoaderContainer>
        <PulseLoader color={white} />
      </LoaderContainer>
    );
  }

  return (
    <TextArea
      onChange={(event) => setText(event.target.value)}
      onDrop={(event) =>
        uploadFiles(event, Array.from(event.dataTransfer.files))
      }
      onPaste={(event) =>
        uploadFiles(
          event,
          Array.from(event.clipboardData.items).map((item) => item.getAsFile()),
        )
      }
      onSubmit={onSubmit}
      placeholder="Write in Markdown ..."
      value={text}
      {...restProps}
    />
  );
};
