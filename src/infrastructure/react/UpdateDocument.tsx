import React, { useState } from "react";
import { MdSave } from "react-icons/md";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { CircleButton } from "./CircleButton";
import { MarkdownTextArea } from "./MarkdownTextArea";
import { InsertImageFunction } from "./utilities";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMarkdownTextArea = styled(MarkdownTextArea)`
  margin-right: -1em;
`;

interface IProps {
  document: IDocument;
  insertImage: InsertImageFunction;
  onUpdate: () => void;
  updateDocument: (text: string) => Promise<void>;
}

export const UpdateDocument = ({
  document,
  onUpdate,
  insertImage,
  updateDocument
}: IProps) => {
  const [text, setText] = useState(document.text);
  const onSubmit = async (): Promise<void> => {
    await updateDocument(text);
    onUpdate();
  };

  return (
    <Container>
      <StyledMarkdownTextArea
        insertImage={insertImage}
        onSubmit={onSubmit}
        setText={setText}
        text={text}
      />
      <CircleButton onClick={onSubmit}>
        <MdSave />
      </CircleButton>
    </Container>
  );
};
