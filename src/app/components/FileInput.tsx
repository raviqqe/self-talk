import type { AriaAttributes, JSX } from "react";
import { MdAttachFile } from "react-icons/md";
import styles from "./FileInput.module.css";

interface Props extends AriaAttributes {
  onChange: (files: File[]) => void;
}

export const FileInput = ({ onChange, ...props }: Props): JSX.Element => (
  <div className={styles.container}>
    <MdAttachFile />
    <input
      className={styles.input}
      onChange={({ target: { files } }) => {
        if (files?.length) {
          onChange([...files]);
        }
      }}
      type="file"
      {...props}
    />
  </div>
);
