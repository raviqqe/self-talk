import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { IconButton } from "./IconButton";
import { Markdown } from "./Markdown";
import { boxShadow } from "./style";
import { UpdateDocument } from "./UpdateDocument";
import { InsertImageFunction } from "./utilities";

const Container = styled.div`
  ${boxShadow};
  background: white;
  padding: 1em;
  padding-right: 2.1em;
  border-radius: 0.5em;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0.4em;
  right: 0.4em;
`;

interface IProps {
  className?: string;
  document: IDocument;
  insertImage: InsertImageFunction;
  updateDocument: (text: string) => Promise<void>;
}

export const Document = ({
  document,
  insertImage,
  updateDocument,
  ...restProps
}: IProps) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <UpdateDocument
        document={document}
        insertImage={insertImage}
        onUpdate={() => setEditing(false)}
        updateDocument={updateDocument}
        {...restProps}
      />
    );
  }

  return (
    <Container {...restProps}>
      <Markdown>{document.text}</Markdown>
      <ButtonContainer>
        <IconButton aria-label="Edit" onClick={() => setEditing(true)}>
          <MdEdit />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
};
