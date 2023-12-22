import { defaultImport } from "default-import";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import defaultStyled from "styled-components";
import type * as domain from "../../domain.js";
import { Document } from "./Document.js";
import { white } from "./style/colors.js";
import { type InsertFilesFunction } from "./utilities.js";
import defaultUseInfiniteScroll from "react-infinite-scroll-hook";

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
  useAsync(listDocuments, []);

  const [ref] = useInfiniteScroll({
    loading: false,
    hasNextPage: true,
    onLoadMore: listMoreDocuments,
  });

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
      <LoaderContainer ref={ref}>
        <PulseLoader color={white} />
      </LoaderContainer>
    </Container>
  );
};
