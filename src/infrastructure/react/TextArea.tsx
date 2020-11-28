import {
  InputHTMLAttributes,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import AutosizeTextArea from "react-autosize-textarea";
import styled from "styled-components";
import { boxShadow } from "./style";
import { grey } from "./style/colors";

const StyledTextArea = styled(AutosizeTextArea)`
  ${boxShadow};
  box-sizing: border-box;
  border: none;
  outline: none;
  width: 100%;
  color: inherit;
  font-family: monospace;
  font-size: 0.95em;
  resize: none;
  padding: 1em;
  border-radius: 0.5em;

  &::placeholder {
    color: ${grey};
  }
`;

interface IProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  onSubmit: () => void;
}

export const TextArea = ({
  onSubmit,
  ...textAreaProps
}: IProps): JSX.Element => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused && ref.current) {
      ref.current.focus();
      setFocused(true);
    }
  }, [focused, ref]);

  return (
    <StyledTextArea
      async={true}
      onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.keyCode === 13 && event.shiftKey) {
          onSubmit();
          event.preventDefault();
        }
      }}
      ref={ref}
      {...textAreaProps}
    />
  );
};
