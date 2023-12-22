import { defaultImport } from "default-import";
import { PulseLoader } from "react-spinners";
import { useAsync, usePrevious } from "react-use";
import defaultStyled from "styled-components";
import type * as domain from "../../domain.js";
import { Document } from "./Document.js";
import { white } from "./style/colors.js";
import { type InsertFilesFunction } from "./utilities.js";
import defaultUseInfiniteScroll from "react-infinite-scroll-hook";
import { useEffect, useState } from "react";

const useInfiniteScroll = defaultImport(defaultUseInfiniteScroll);
const styled = defaultImport(defaultStyled);

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

export interface Props {
  documents: domain.Document[] | null;
  insertFiles: InsertFilesFunction;
  listDocuments: () => Promise<void>;
  listMoreDocuments: () => Promise<void>;
  updateDocument: (document: domain.Document) => Promise<void>;
}

export const DocumentList = ({
  documents,
  insertFiles,
  listDocuments,
  listMoreDocuments,
  updateDocument,
}: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useAsync(async () => {
    setLoading(true);
    await listDocuments();
    setLoading(false);
  }, []);

  const [ref] = useInfiniteScroll({
    loading,
    hasNextPage: !done,
    onLoadMore: async () => {
      setLoading(true);
      await listMoreDocuments();
      setLoading(false);
    },
  });

  const oldLoading = usePrevious(loading);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!oldLoading && loading) {
      setLength(documents?.length ?? 0);
    } else if (oldLoading && !loading && documents?.length === length) {
      setDone(true);
    }
  }, [documents, loading, oldLoading]);

  return (
    <Container>
      {documents?.map((document) => (
        <StyledDocument
          document={document}
          insertFiles={insertFiles}
          key={document.id}
          updateDocument={updateDocument}
        />
      ))}
      {!done && (
        <LoaderContainer ref={ref}>
          <PulseLoader color={white} />
        </LoaderContainer>
      )}
    </Container>
  );
};
