import { PulseLoader } from "react-spinners";
import InfiniteScroller from "react-infinite-scroller";
import { useAsync } from "react-use";
import React from "react";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { InsertFilesFunction } from "./utilities";
import { Document } from "./Document";
import { white } from "./style/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInfiniteScroller = styled(InfiniteScroller)`
  display: flex;
  flex-direction: column-reverse;
  padding: 1em 0.5em;
`;

const StyledDocument = styled(Document)`
  margin: 0.5em;
`;

export interface IProps {
  documents: IDocument[] | null;
  insertFiles: InsertFilesFunction;
  listDocuments: () => Promise<void>;
  listMoreDocuments: () => Promise<void>;
  updateDocument: (document: IDocument) => Promise<void>;
}

export const Documents = ({
  documents,
  insertFiles,
  listDocuments,
  listMoreDocuments,
  updateDocument,
}: IProps) => {
  useAsync(listDocuments, []);

  return documents ? (
    <Container>
      <StyledInfiniteScroller
        hasMore={true}
        isReverse={true}
        loadMore={listMoreDocuments}
        threshold={512}
        useWindow={false}
      >
        {documents.map((document: IDocument) => (
          <StyledDocument
            document={document}
            insertFiles={insertFiles}
            key={document.id}
            updateDocument={updateDocument}
          />
        ))}
      </StyledInfiniteScroller>
    </Container>
  ) : (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  );
};
