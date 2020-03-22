import { MdEdit } from "react-icons/md";
import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "./IconButton";
import { Markdown } from "./Markdown";
import {
  UpdateDocument,
  IProps as IUpdateDocumentProps,
} from "./UpdateDocument";
import { boxShadow } from "./style";
import { white } from "./style/colors";

const Container = styled.div`
  ${boxShadow};
  background: ${white};
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

interface IProps extends IUpdateDocumentProps {}

export const Document = ({
  document,
  insertFiles,
  updateDocument,
  ...restProps
}: IProps) => {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <UpdateDocument
      document={document}
      insertFiles={insertFiles}
      updateDocument={async (document) => {
        setEditing(false);
        await updateDocument(document);
      }}
      {...restProps}
    />
  ) : (
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
