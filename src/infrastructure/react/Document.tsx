import React, { ChangeEvent, useState } from "react";
import { MdEdit, MdSave } from "react-icons/md";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { CircleButton } from "./CircleButton";
import { IconButton } from "./IconButton";
import { Markdown } from "./Markdown";
import { boxShadow } from "./style";
import { TextArea } from "./TextArea";

const Container = styled.div`
  ${boxShadow};
  background: white;
  padding: 1em;
  border-radius: 0.5em;
  position: relative;
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OverwrappedTextArea = styled(TextArea)`
  margin-bottom: -1.5em;
`;

const MarginedCircleButton = styled(CircleButton)`
  margin-right: 0.5em;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0.4em;
  right: 0.4em;
`;

interface IProps {
  document: IDocument;
  updateDocument: (text: string) => Promise<void>;
}

export const Document = ({ document, updateDocument }: IProps) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(document.text);

  if (editing) {
    const finishEditing = async () => {
      await updateDocument(text);
      setEditing(false);
    };

    return (
      <TextAreaContainer>
        <OverwrappedTextArea
          onSubmit={finishEditing}
          placeholder="Write in Markdown ..."
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            setText(event.target.value)
          }
          value={text}
        />
        <MarginedCircleButton onClick={finishEditing}>
          <MdSave />
        </MarginedCircleButton>
      </TextAreaContainer>
    );
  }

  return (
    <Container>
      <Markdown>{document.text}</Markdown>
      <ButtonContainer>
        <IconButton onClick={() => setEditing(true)}>
          <MdEdit />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
};
