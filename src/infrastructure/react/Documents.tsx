import React from "react";
import InfiniteScroller from "react-infinite-scroller";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { Document } from "./Document";
import { InsertImagesFunction } from "./utilities";

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
  insertImages: InsertImagesFunction;
  loadMoreDocuments: () => Promise<void>;
  updateDocument: (document: IDocument, text: string) => Promise<void>;
}

export const Documents = ({
  documents,
  insertImages,
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
          insertImages={insertImages}
          updateDocument={(text: string) => updateDocument(document, text)}
        />
      ))}
    </StyledInfiniteScroller>
  </Container>
);
