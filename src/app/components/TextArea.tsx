import {
  type ForwardedRef,
  forwardRef,
  type JSX,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize, {
  type TextareaAutosizeProps,
} from "react-textarea-autosize";
import styles from "./TextArea.module.css";

const NoStyleTextareaAutosize = forwardRef(
  (
    props: Omit<TextareaAutosizeProps, "style">,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => <TextareaAutosize ref={ref} {...props} />,
);
NoStyleTextareaAutosize.displayName = "NoStyleTextareaAutosize";

interface Props extends TextareaAutosizeProps {
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
    <NoStyleTextareaAutosize
      className={styles.root}
      onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (
          event.key === "Enter" &&
          (event.altKey || event.ctrlKey || event.shiftKey)
        ) {
          onSubmit();
          event.preventDefault();
        }
      }}
      ref={ref}
      {...textAreaProps}
    />
  );
};
