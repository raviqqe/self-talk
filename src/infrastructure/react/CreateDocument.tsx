import { useState } from "react";
import { MdAdd } from "react-icons/md/index.js";
import { styled } from "@linaria/react";
import { CircleButton } from "./CircleButton.js";
import { MarkdownTextArea } from "./MarkdownTextArea.js";
import { type InsertFilesFunction } from "./utilities.js";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const StyledMarkdownTextArea = styled(MarkdownTextArea)`
  margin-right: -1em;
  max-height: 80vh;
`;

interface Props {
  createDocument: (text: string) => Promise<void>;
  insertFiles: InsertFilesFunction;
}

export const CreateDocument = ({
  createDocument,
  insertFiles,
}: Props): JSX.Element => {
  const [text, setText] = useState("");
  const onSubmit = async (): Promise<void> => {
    setText("");
    await createDocument(text);
  };

  return (
    <Container>
      <StyledMarkdownTextArea
        insertFiles={insertFiles}
        onSubmit={onSubmit}
        setText={setText}
        text={text}
      />
      <CircleButton aria-label="Create" onClick={onSubmit}>
        <MdAdd />
      </CircleButton>
    </Container>
  );
};
