import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import { CircleButton } from "./CircleButton";
import { MarkdownTextArea } from "./MarkdownTextArea";
import { InsertImageFunction } from "./utilities";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const StyledMarkdownTextArea = styled(MarkdownTextArea)`
  margin-right: -1em;
  max-height: 80vh;
`;

interface IProps {
  createDocument: (text: string) => Promise<void>;
  insertImage: InsertImageFunction;
}

export const CreateDocument = ({ createDocument, insertImage }: IProps) => {
  const [text, setText] = useState("");
  const onSubmit = async (): Promise<void> => {
    setText("");
    await createDocument(text);
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
        <MdAdd />
      </CircleButton>
    </Container>
  );
};
