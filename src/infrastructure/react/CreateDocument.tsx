import React, { useState } from "react";
import styled from "styled-components";
import { TextArea } from "./TextArea";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em;

  > * {
    margin: 0.5em;
  }
`;

const Button = styled.button`
  background: salmon;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  padding: 0;
  height: 2em;
  width: 2em;
  border: none;
  border-radius: 1em;
  flex-shrink: 0;
  cursor: pointer;
`;

interface IProps {
  createDocument: (text: string) => Promise<void>;
}

export const CreateDocument = ({ createDocument }: IProps) => {
  const [text, setText] = useState("");

  return (
    <Container>
      <TextArea onChange={event => setText(event.target.value)} value={text} />
      <Button
        onClick={async () => {
          setText("");
          await createDocument(text);
        }}
      >
        +
      </Button>
    </Container>
  );
};
