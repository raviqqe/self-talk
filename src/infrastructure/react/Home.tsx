import React, { useState } from "react";
import { useAsync } from "react-use";
import styled from "styled-components";
import { IDocument } from "../../domain/document";
import { CreateDocument } from "./CreateDocument";
import { Documents } from "./Documents";
import { SignOut } from "./SignOut";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 80ex;
  max-width: 100%;
  margin: auto;
  overflow: hidden;

  > :first-child {
    flex: 1;
  }
`;

const SignOutContainer = styled.div`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
`;

interface IProps {
  createDocument: (text: string) => Promise<void>;
  listDocuments: () => Promise<IDocument[]>;
  signOut: () => void;
}

export const Home = ({ createDocument, listDocuments, signOut }: IProps) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  useAsync(async () => setDocuments(await listDocuments()), []);

  return (
    <Container>
      <Documents documents={documents} />
      <CreateDocument
        createDocument={async (text: string) => {
          await createDocument(text);
          setDocuments(await listDocuments());
        }}
      />
      <SignOutContainer>
        <SignOut signOut={signOut} />
      </SignOutContainer>
    </Container>
  );
};
