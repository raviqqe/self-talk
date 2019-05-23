import React, { useState } from "react";
import { MdSave } from "react-icons/md";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { CircleButton } from "./CircleButton";
import { MarkdownTextArea } from "./MarkdownTextArea";
import { InsertImagesFunction } from "./utilities";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMarkdownTextArea = styled(MarkdownTextArea)`
  margin-right: -1em;
`;

interface IProps {
  className?: string;
  document: IDocument;
  insertImages: InsertImagesFunction;
  onUpdate: () => void;
  updateDocument: (text: string) => Promise<void>;
}

export const UpdateDocument = ({
  document,
  onUpdate,
  insertImages,
  updateDocument,
  ...restProps
}: IProps) => {
  const [text, setText] = useState(document.text);
  const onSubmit = async (): Promise<void> => {
    await updateDocument(text);
    onUpdate();
  };

  return (
    <Container {...restProps}>
      <StyledMarkdownTextArea
        insertImages={insertImages}
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
