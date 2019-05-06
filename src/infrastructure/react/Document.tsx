import React from "react";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { Markdown } from "./Markdown";
import { boxShadow } from "./style";

const Container = styled.div`
  ${boxShadow};
  background: white;
  padding: 1em;
  border-radius: 0.5em;
`;

export const Document = ({ text }: IDocument) => (
  <Container>
    <Markdown>{text}</Markdown>
  </Container>
);
