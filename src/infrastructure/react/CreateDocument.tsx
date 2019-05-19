import React, { ChangeEvent, useState } from "react";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import { CircleButton } from "./CircleButton";
import { TextArea } from "./TextArea";
import { InsertImageFunction, useOnPaste } from "./utilities";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const OverwrappedTextArea = styled(TextArea)`
  max-height: 80vh;
  margin-right: -1em;
`;

interface IProps {
  createDocument: (text: string) => Promise<void>;
  insertImage: InsertImageFunction;
}

export const CreateDocument = ({ createDocument, insertImage }: IProps) => {
  const [text, setText] = useState("");
  const create = async () => {
    setText("");
    await createDocument(text);
  };

  return (
    <Container>
      <OverwrappedTextArea
        onSubmit={create}
        placeholder="Write in Markdown ..."
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setText(event.target.value)
        }
        onPaste={useOnPaste(text, setText, insertImage)}
        value={text}
      />
      <CircleButton onClick={create}>
        <MdAdd />
      </CircleButton>
    </Container>
  );
};
