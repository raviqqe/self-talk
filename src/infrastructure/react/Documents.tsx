import React, { FC } from "react";
import { FlatList, FlatListProps } from "react-native-web";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { Document } from "./Document";

const StyledFlatList: FC<FlatListProps<IDocument>> = styled(FlatList)`
  padding: 1em 0.5em;
` as any;

const DocumentContainer = styled.div`
  margin: 0.5em;
`;

interface IProps {
  documents: IDocument[];
  listMoreDocuments: () => Promise<void>;
}

export const Documents = ({ documents, listMoreDocuments }: IProps) => (
  <StyledFlatList
    data={documents}
    inverted={true}
    onEndReached={listMoreDocuments}
    renderItem={({ item: document }) => (
      <DocumentContainer>
        <Document key={document.id} {...document} />
      </DocumentContainer>
    )}
  />
);
