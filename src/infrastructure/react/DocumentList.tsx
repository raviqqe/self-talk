import { defaultImport } from "default-import";
import { useId } from "react";
import defaultInfiniteScroll, {
  type Props as ScrollProps,
} from "react-infinite-scroll-component";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import defaultStyled from "styled-components";
import type * as domain from "../../domain.js";
import { Document } from "./Document.js";
import { white } from "./style/colors.js";
import { type InsertFilesFunction } from "./utilities.js";

const InfiniteScroll = defaultImport(defaultInfiniteScroll);
const styled = defaultImport(defaultStyled);

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const StyledInfiniteScroll = styled((props: ScrollProps) => (
  <InfiniteScroll {...props} />
))`
  display: flex;
  flex-direction: column-reverse;
  padding: 1em 0.5em;
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
  const documentsContainerId = useId();
  useAsync(listDocuments, []);

  return documents ? (
    <Container id={documentsContainerId}>
      <StyledInfiniteScroll
        dataLength={documents.length}
        hasMore
        inverse
        loader={
          <LoaderContainer>
            <PulseLoader color={white} />
          </LoaderContainer>
        }
        next={listMoreDocuments}
        scrollableTarget={documentsContainerId}
      >
        {documents.map((document) => (
          <StyledDocument
            document={document}
            insertFiles={insertFiles}
            key={document.id}
            updateDocument={updateDocument}
          />
        ))}
      </StyledInfiniteScroll>
    </Container>
  ) : (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  );
};
