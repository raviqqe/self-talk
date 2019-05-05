import React from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
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
  const [state, fetchDocuments] = useAsyncFn(listDocuments);
  useEffectOnce(fetchDocuments);

  return (
    <Container>
      <Documents documents={state.value || []} />
      <CreateDocument
        createDocument={async (text: string) => {
          await createDocument(text);
          fetchDocuments();
        }}
      />
      <SignOutContainer>
        <SignOut signOut={signOut} />
      </SignOutContainer>
    </Container>
  );
};
