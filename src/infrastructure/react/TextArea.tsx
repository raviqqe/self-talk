import React, {
  FC,
  HTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState
} from "react";
import AutosizeTextArea from "react-autosize-textarea";
import styled from "styled-components";
import { boxShadow } from "./style";

const StyledTextArea: FC<any> = styled(AutosizeTextArea)`
  ${boxShadow};
  box-sizing: border-box;
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
) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused && ref.current) {
      ref.current.focus();
      setFocused(true);
    }
  });

  return <StyledTextArea async={true} ref={ref} {...props} />;
};
