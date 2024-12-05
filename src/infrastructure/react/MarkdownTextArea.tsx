import { styled } from "@linaria/react";
import { useState } from "react";
import { MdImage } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import { FileInput } from "./FileInput.js";
import { TextArea } from "./TextArea.js";
import { white } from "./style/colors.js";
import { boxShadow } from "./style.js";
import { type InsertFilesFunction } from "./utilities.js";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: -0.5rem;
  border-radius: 0.5em;
  background-color: ${white};
  overflow: hidden;
  padding: 1rem;
  ${boxShadow};
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

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

  const uploadFiles = async (files: (File | null)[], offset: number) => {
    const validFiles = files.filter((file): file is File => !!file);

    if (validFiles.length === 0) {
      return;
    }

    setUploadingFiles(true);

    setText(await insertFiles(text, offset, validFiles));

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
    <Container>
      <TextArea
        onChange={(event) => setText(event.target.value)}
        onDrop={(event) =>
          uploadFiles(
            Array.from(event.dataTransfer.files),
            event.currentTarget.selectionStart,
          )
        }
        onPaste={(event) =>
          uploadFiles(
            Array.from(event.clipboardData.items).map((item) =>
              item.getAsFile(),
            ),
            event.currentTarget.selectionStart,
          )
        }
        onSubmit={onSubmit}
        placeholder="Write in Markdown..."
        value={text}
        {...restProps}
      />
      <ButtonGroup>
        <FileInput onChange={(files) => uploadFiles(files, text.length)}>
          <MdImage />
        </FileInput>
      </ButtonGroup>
    </Container>
  );
};
