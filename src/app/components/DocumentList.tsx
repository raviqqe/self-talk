import { useStore } from "@nanostores/react";
import { useAsync, useInfiniteScroll } from "@raviqqe/react-hooks";
import { type JSX, useCallback, useRef, useState } from "react";
import { documentLister } from "../../main/document-lister.js";
import { documentPresenter } from "../../main/document-presenter.js";
import { Document } from "./Document.js";
import { Loader } from "./Loader.js";
import styles from "./DocumentList.module.css";

export const DocumentList = (): JSX.Element => {
  const documents = useStore(documentPresenter.documents);
  const [done, setDone] = useState(false);

  useAsync(() => documentLister.list(), []);

  const listMore = useCallback(async () => {
    if (!documents) {
      return;
    }

    await documentLister.listMore();
    setDone(documentPresenter.documents.get()?.length === documents.length);
  }, [documents]);
  const ref = useRef(null);
  useInfiniteScroll(ref, listMore);

  return (
    <div className={styles.container}>
      {documents?.map((document) => (
        <Document
          className={styles.document}
          document={document}
          key={document.id}
        />
      ))}
      {!done && (
        <div className={styles.loaderContainer} ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
};
