import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import { CircleButton } from "./CircleButton";
import { MarkdownTextArea } from "./MarkdownTextArea";
import { InsertFilesFunction } from "./utilities";

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
  insertFiles: InsertFilesFunction;
}

export const CreateDocument = ({
  createDocument,
  insertFiles,
}: IProps): JSX.Element => {
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
