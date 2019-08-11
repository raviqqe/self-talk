import InfiniteScroller from "react-infinite-scroller";
import React from "react";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { InsertFilesFunction } from "./utilities";
import { Document } from "./Document";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;

const StyledInfiniteScroller = styled(InfiniteScroller)`
  display: flex;
  flex-direction: column-reverse;
  padding: 1em 0.5em;
`;

const StyledDocument = styled(Document)`
  margin: 0.5em;
`;

interface IProps {
  documents: IDocument[];
  insertFiles: InsertFilesFunction;
  loadMoreDocuments: () => Promise<void>;
  updateDocument: (document: IDocument, text: string) => Promise<void>;
}

export const Documents = ({
  documents,
  insertFiles,
  loadMoreDocuments,
  updateDocument
}: IProps) => (
  <Container>
    <StyledInfiniteScroller
      hasMore={true}
      isReverse={true}
      loadMore={loadMoreDocuments}
      threshold={512}
      useWindow={false}
    >
      {documents.map((document: IDocument) => (
        <StyledDocument
          key={document.id}
          document={document}
          insertFiles={insertFiles}
          updateDocument={(text: string) => updateDocument(document, text)}
        />
      ))}
    </StyledInfiniteScroller>
  </Container>
);
