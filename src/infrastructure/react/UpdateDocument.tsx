import React, { useState } from "react";
import { MdSave } from "react-icons/md";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { CircleButton } from "./CircleButton";
import { MarkdownTextArea } from "./MarkdownTextArea";
import { InsertFilesFunction } from "./utilities";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMarkdownTextArea = styled(MarkdownTextArea)`
  margin-right: -1em;
`;

export interface IProps {
  className?: string;
  document: IDocument;
  insertFiles: InsertFilesFunction;
  updateDocument: (document: IDocument) => Promise<void>;
}

export const UpdateDocument = ({
  document,
  insertFiles,
  updateDocument,
  ...restProps
}: IProps): JSX.Element => {
  const [text, setText] = useState(document.text);
  const onSubmit = () => updateDocument({ ...document, text });

  return (
    <Container {...restProps}>
      <StyledMarkdownTextArea
        insertFiles={insertFiles}
        onSubmit={onSubmit}
        setText={setText}
        text={text}
      />
      <CircleButton aria-label="Save" onClick={onSubmit}>
        <MdSave />
      </CircleButton>
    </Container>
  );
};
