import React, { FC } from "react";
import { FlatList, FlatListProps } from "react-native-web";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { Document } from "./Document";
import { InsertImageFunction } from "./utilities";

const StyledFlatList: FC<FlatListProps<IDocument>> = styled(FlatList)`
  padding: 1em 0.5em;
` as any;

const DocumentContainer = styled.div`
  margin: 0.5em;
`;

interface IProps {
  documents: IDocument[];
  insertImage: InsertImageFunction;
  loadMoreDocuments: () => Promise<void>;
  updateDocument: (document: IDocument, text: string) => Promise<void>;
}

export const Documents = ({
  documents,
  insertImage,
  loadMoreDocuments,
  updateDocument
}: IProps) => (
  <StyledFlatList
    data={documents}
    disableVirtualization={true}
    inverted={true}
    keyExtractor={document => document.id}
    onEndReached={loadMoreDocuments}
    renderItem={({ item: document }) => (
      <DocumentContainer>
        <Document
          key={document.id}
          document={document}
          insertImage={insertImage}
          updateDocument={(text: string) => updateDocument(document, text)}
        />
      </DocumentContainer>
    )}
  />
);
