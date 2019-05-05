import React from "react";
import styled from "styled-components";
import { IDocument } from "../../domain/document";

const Container = styled.div`
  background: white;
  padding: 1em;
  border-radius: 0.5em;
`;

export const Document = ({ text }: IDocument) => <Container>{text}</Container>;
