import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import styled from "styled-components";
import { IInitialState } from "../../application/application-initializer";
import { IDocument } from "../../domain/document";
import { Home } from "./Home";
import { Landing } from "./Landing";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

interface IProps {
  createDocument: (text: string) => Promise<void>;
  initialize: () => Promise<IInitialState>;
  listDocuments: () => Promise<IDocument[]>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

export const App = ({
  createDocument,
  initialize,
  listDocuments,
  signIn,
  signOut
}: IProps) => {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useAsync(async () => {
    const { signedIn } = await initialize();
    setSignedIn(signedIn);
  }, []);

  if (signedIn === null) {
    return (
      <LoaderContainer>
        <PulseLoader color="white" />
      </LoaderContainer>
    );
  } else if (!signedIn) {
    return <Landing signIn={async () => setSignedIn(await signIn())} />;
  }

  return (
    <Home
      createDocument={createDocument}
      listDocuments={listDocuments}
      signOut={async () => setSignedIn(await signOut())}
    />
  );
};
