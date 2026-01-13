import classNames from "classnames";
import { type JSX, useState } from "react";
import { MdAdd } from "react-icons/md";
import { documentCreator } from "../../main/document-creator.js";
import { CircleButton } from "./CircleButton.js";
import styles from "./CreateDocument.module.css";
import { MarkdownTextArea } from "./MarkdownTextArea.js";

interface Props {
  className?: string;
}

export const CreateDocument = ({ className }: Props): JSX.Element => {
  const [text, setText] = useState("");
  const onSubmit = async (): Promise<void> => {
    setText("");
    await documentCreator.create(text);
  };

  return (
    <div className={classNames(styles.root, className)}>
      <MarkdownTextArea
        className={styles.extArea}
        onChange={setText}
        onSubmit={onSubmit}
        text={text}
      />
      <CircleButton
        aria-label="Create"
        className={styles.button}
        onClick={onSubmit}
      >
        <MdAdd />
      </CircleButton>
    </div>
  );
};
