import { compact } from "es-toolkit";
import { type JSX, useCallback, useState } from "react";
import { textFileInserter } from "../../main/text-file-inserter.js";
import { FileInput } from "./FileInput.js";
import { Loader } from "./Loader.js";
import { TextArea } from "./TextArea.js";
import styles from "./MarkdownTextArea.module.css";

interface Props {
  className?: string;
  onChange: (text: string) => void;
  onSubmit: () => Promise<void>;
  text: string;
}

export const MarkdownTextArea = ({
  onChange,
  onSubmit,
  text,
  className,
}: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const uploadFiles = useCallback(
    async (files: File[], offset: number) => {
      if (!files.length) {
        return;
      }

      setLoading(true);
      onChange(await textFileInserter.insert(text, offset, files));
      setLoading(false);
    },
    [text, onChange],
  );

  return loading ? (
    <div className={styles.loaderContainer}>
      <Loader />
    </div>
  ) : (
    <div
      className={[styles.container, className].filter(Boolean).join(" ")}
    >
      <TextArea
        onChange={({ target }) => onChange(target.value)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={async (event) => {
          event.preventDefault();
          await uploadFiles(
            compact([...event.dataTransfer.files]),
            event.currentTarget.selectionStart,
          );
        }}
        onPaste={(event) =>
          uploadFiles(
            compact(
              [...event.clipboardData.items].map((item) => item.getAsFile()),
            ),
            event.currentTarget.selectionStart,
          )
        }
        onSubmit={onSubmit}
        placeholder="Write in Markdown..."
        value={text}
      />
      <div className={styles.buttonGroup}>
        <FileInput onChange={(files) => uploadFiles(files, text.length)} />
      </div>
    </div>
  );
};
