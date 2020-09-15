import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { Document } from "./Document";
import { white } from "./style/colors";
import { InsertFilesFunction } from "./utilities";

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

const StyledInfiniteScroll = styled(InfiniteScroll)`
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
}: IProps): JSX.Element => {
  useAsync(listDocuments, []);

  return documents ? (
    <Container>
      <StyledInfiniteScroll
        dataLength={documents.length}
        hasMore={true}
        inverse={true}
        loader={null}
        next={listMoreDocuments}
        scrollThreshold={512}
      >
        {documents.map((document: IDocument) => (
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
