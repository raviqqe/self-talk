import React from "react";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { Document } from "./Document";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  padding: 0.5em;

  > * {
    margin: 0.5em;
  }
`;

interface IProps {
  documents: IDocument[];
}

export const Documents = ({ documents }: IProps) => (
  <Container>
    {documents.map(document => (
      <Document key={document.id} {...document} />
    ))}
  </Container>
);
