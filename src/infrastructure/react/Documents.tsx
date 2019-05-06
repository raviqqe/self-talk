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
}

export const Documents = ({ documents }: IProps) => (
  <StyledFlatList
    data={documents}
    inverted={true}
    renderItem={({ item: document }) => (
      <DocumentContainer>
        <Document key={document.id} {...document} />
      </DocumentContainer>
    )}
  />
);
