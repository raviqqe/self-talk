import { styled } from "@linaria/react";
import { compact } from "es-toolkit";
import { useCallback, useState } from "react";
import { textFileInserter } from "../../main/text-file-inserter.js";
import { FileInput } from "./FileInput.js";
import { Loader } from "./Loader.js";
import { TextArea } from "./TextArea.js";
import { white } from "./style.js";
import { boxShadow } from "./style.js";

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
  onChange: (text: string) => void;
  onSubmit: () => Promise<void>;
  text: string;
}

export const MarkdownTextArea = ({
  onChange,
  onSubmit,
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
      onChange(await textFileInserter.insert(text, offset, files));
      setLoading(false);
    },
    [text, onChange],
  );

  return loading ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : (
    <Container>
      <TextArea
        onChange={({ target }) => onChange(target.value)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={async (event) => {
          event.preventDefault();
          await uploadFiles(
            compact([...event.dataTransfer.files]),
            event.currentTarget.selectionStart,
          );
        }}
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
        <FileInput onChange={(files) => uploadFiles(files, text.length)} />
      </ButtonGroup>
    </Container>
  );
};
