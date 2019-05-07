import React from "react";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { DeleteDocument } from "./DeleteDocument";
import { Markdown } from "./Markdown";
import { boxShadow } from "./style";

const Container = styled.div`
  ${boxShadow};
  background: white;
  padding: 1em;
  border-radius: 0.5em;
  position: relative;
`;

const ButtonsContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0.3em;
  right: 0.3em;
`;

interface IProps {
  deleteDocument: (documentID: string) => Promise<void>;
  document: IDocument;
}

export const Document = ({ document, deleteDocument }: IProps) => (
  <Container>
    <Markdown>{document.text}</Markdown>
    <ButtonsContainer>
      <DeleteDocument deleteDocument={() => deleteDocument(document.id)} />
    </ButtonsContainer>
  </Container>
);
