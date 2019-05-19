import React, { ChangeEvent, useState } from "react";
import { MdSave } from "react-icons/md";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { CircleButton } from "./CircleButton";
import { TextArea } from "./TextArea";
import { InsertImageFunction } from "./utilities";
import { useOnPaste } from "./utilities";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const OverwrappedTextArea = styled(TextArea)`
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
  const onSubmit = async () => {
    await updateDocument(text);
    onUpdate();
  };

  return (
    <Container>
      <OverwrappedTextArea
        onSubmit={onSubmit}
        placeholder="Write in Markdown ..."
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setText(event.target.value)
        }
        onPaste={useOnPaste(text, setText, insertImage)}
        value={text}
      />
      <CircleButton onClick={onSubmit}>
        <MdSave />
      </CircleButton>
    </Container>
  );
};
