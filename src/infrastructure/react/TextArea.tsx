import React, { FC, HTMLProps, InputHTMLAttributes } from "react";
import AutosizeTextArea from "react-autosize-textarea";
import styled from "styled-components";

const StyledTextArea: FC<any> = styled(AutosizeTextArea)`
  border: none;
  outline: none;
  width: 100%;
  color: inherit;
  font: inherit;
  resize: none;
  padding: 1em;
  border-radius: 0.5em;

  &::placeholder {
    color: grey;
  }
`;

export const TextArea = (
  props: InputHTMLAttributes<HTMLTextAreaElement> &
    HTMLProps<HTMLTextAreaElement>
) => <StyledTextArea async={true} {...props} />;
