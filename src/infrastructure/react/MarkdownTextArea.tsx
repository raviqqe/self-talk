import { styled } from "@linaria/react";
import { compact } from "es-toolkit";
import { useCallback, useState } from "react";
import { MdImage } from "react-icons/md";
import { PulseLoader } from "react-spinners";
import { FileInput } from "./FileInput.js";
import { TextArea } from "./TextArea.js";
import { white } from "./style/colors.js";
import { boxShadow } from "./style.js";
import { textFileInserter } from "../../main/text-file-inserter.js";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
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
  onSubmit: () => Promise<void>;
  setText: (text: string) => void;
  text: string;
}

export const MarkdownTextArea = ({
  onSubmit,
  setText,
  text,
  ...restProps
}: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const uploadFiles = useCallback(
    async (files: File[], offset: number) => {
      if (!files.length) {
        return;
      }

      setLoading(true);
      setText(await textFileInserter.insert(text, offset, files));
      setLoading(false);
    },
    [text, setText],
  );

  return loading ? (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  ) : (
    <Container>
      <TextArea
        onChange={({ target }) => setText(target.value)}
        onDrop={(event) =>
          uploadFiles(
            compact([...event.dataTransfer.files]),
            event.currentTarget.selectionStart,
          )
        }
        onPaste={(event) =>
          uploadFiles(
            compact(
              [...event.clipboardData.items].map((item) => item.getAsFile()),
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
