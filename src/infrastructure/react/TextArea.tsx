import { styled } from "@linaria/react";
import {
  type ForwardedRef,
  forwardRef,
  type InputHTMLAttributes,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize, {
  type TextareaAutosizeProps,
} from "react-textarea-autosize";
import { grey } from "./style/colors.js";
import { boxShadow } from "./style.js";

const NoStyleTextareaAutosize = forwardRef(
  (
    props: Omit<TextareaAutosizeProps, "style">,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => <TextareaAutosize ref={ref} {...props} />,
);
NoStyleTextareaAutosize.displayName = "NoStyleTextareaAutosize";

const StyledTextArea = styled(NoStyleTextareaAutosize)`
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

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  onSubmit: () => void;
}

export const TextArea = ({
  onSubmit,
  ...textAreaProps
}: Props): JSX.Element => {
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
      onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && (event.ctrlKey || event.shiftKey)) {
          onSubmit();
          event.preventDefault();
        }
      }}
      ref={ref}
      {...textAreaProps}
    />
  );
};
