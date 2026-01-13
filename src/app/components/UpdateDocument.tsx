import { type JSX, useState } from "react";
import { MdSave } from "react-icons/md";
import type { Document } from "../../domain/document.js";
import { CircleButton } from "./CircleButton.js";
import { MarkdownTextArea } from "./MarkdownTextArea.js";
import styles from "./UpdateDocument.module.css";

interface Props {
  className?: string;
  document: Document;
  onSubmit: (document: Document) => Promise<void>;
}

export const UpdateDocument = ({
  document,
  onSubmit: onParentSubmit,
  className,
}: Props): JSX.Element => {
  const [text, setText] = useState(document.text);
  const onSubmit = () => onParentSubmit({ ...document, text });

  return (
    <div className={[styles.container, className].filter(Boolean).join(" ")}>
      <MarkdownTextArea onChange={setText} onSubmit={onSubmit} text={text} />
      <CircleButton
        aria-label="Save"
        className={styles.circleButton}
        onClick={onSubmit}
      >
        <MdSave />
      </CircleButton>
    </div>
  );
};
