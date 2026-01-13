import type { JSX } from "react";
import { CreateDocument } from "../components/CreateDocument.js";
import { DocumentList } from "../components/DocumentList.js";
import { SignOut } from "../components/SignOut.js";
import styles from "./documents.module.css";

export default (): JSX.Element | null => (
  <div className={styles.container}>
    <DocumentList />
    <div className={styles.createDocumentContainer}>
      <div className={styles.createDocumentBackground} />
      <CreateDocument className={styles.createDocument} />
    </div>
    <div className={styles.signOutContainer}>
      <SignOut />
    </div>
  </div>
);
