import { styled } from "@linaria/react";
import { useState } from "react";
import { MdSave } from "react-icons/md";
import { type Document } from "../../domain/document.js";
import { CircleButton } from "./CircleButton.js";
import { MarkdownTextArea } from "./MarkdownTextArea.js";
import { type InsertFilesFunction } from "./utilities.js";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCircleButton = styled(CircleButton)`
  margin-left: -0.5rem;
`;

export interface Props {
  className?: string;
  document: Document;
  insertFiles: InsertFilesFunction;
  updateDocument: (document: Document) => Promise<void>;
}

export const UpdateDocument = ({
  document,
  insertFiles,
  updateDocument,
  ...restProps
}: Props): JSX.Element => {
  const [text, setText] = useState(document.text);
  const onSubmit = () => updateDocument({ ...document, text });

  return (
    <Container {...restProps}>
      <MarkdownTextArea
        insertFiles={insertFiles}
        onSubmit={onSubmit}
        setText={setText}
        text={text}
      />
      <StyledCircleButton aria-label="Save" onClick={onSubmit}>
        <MdSave />
      </StyledCircleButton>
    </Container>
  );
};
