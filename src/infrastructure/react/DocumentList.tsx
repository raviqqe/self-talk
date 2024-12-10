import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { useAsync, useInfiniteScroll } from "@raviqqe/react-hooks";
import { useState } from "react";
import { documentLister } from "../../main/document-lister.js";
import { documentPresenter } from "../../main/document-presenter.js";
import { Document } from "./Document.js";
import { Loader } from "./Loader.js";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
  padding: 1em 0.5em;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const StyledDocument = styled(Document)`
  margin: 0.5em;
`;

export const DocumentList = (): JSX.Element => {
  const documents = useStore(documentPresenter.documents);
  const [done, setDone] = useState(false);

  useAsync(() => documentLister.list(), []);

  const ref = useInfiniteScroll<HTMLDivElement>(async () => {
    const documents = documentPresenter.documents.get();
    await documentLister.listMore();

    setDone(
      !!documents &&
        documentPresenter.documents.get()?.length === documents.length,
    );
  });

  return (
    <Container>
      {documents?.map((document) => (
        <StyledDocument document={document} key={document.id} />
      ))}
      {!done && (
        <LoaderContainer ref={ref}>
          <Loader />
        </LoaderContainer>
      )}
    </Container>
  );
};
