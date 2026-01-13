import classNames from "classnames";
import { type JSX, useState } from "react";
import { MdEdit } from "react-icons/md";
import type * as domain from "../../domain.js";
import { documentUpdater } from "../../main/document-updater.js";
import styles from "./Document.module.css";
import { IconButton } from "./IconButton.js";
import { Markdown } from "./Markdown.js";
import { UpdateDocument } from "./UpdateDocument.js";

interface Props {
  className?: string;
  document: domain.Document;
}

export const Document = ({ document, className }: Props): JSX.Element => {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <UpdateDocument
      className={className}
      document={document}
      onSubmit={async (document) => {
        setEditing(false);
        await documentUpdater.update(document);
      }}
    />
  ) : (
    <div className={classNames(styles.container, className)}>
      <Markdown>{document.text}</Markdown>
      <div className={styles.buttonContainer}>
        <IconButton aria-label="Edit" onClick={() => setEditing(true)}>
          <MdEdit />
        </IconButton>
      </div>
    </div>
  );
};
