import { styled } from "@linaria/react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";
import { MarkdownTextArea } from "./MarkdownTextArea.js";
import { type InsertFilesFunction } from "./utilities.js";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const StyledMarkdownTextArea = styled(MarkdownTextArea)`
  max-height: 80vh;
`;

const StyledCircleButton = styled(CircleButton)`
  margin-left: -0.5rem;
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
      <StyledCircleButton aria-label="Create" onClick={onSubmit}>
        <MdAdd />
      </StyledCircleButton>
    </Container>
  );
};
