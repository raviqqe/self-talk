import React, { useState } from "react";
import { useAsync } from "react-use";
import { IInitialState } from "../../application/application-initializer";
import { IDocument } from "../../domain/document";
import { Home } from "./Home";
import { SignIn } from "./SignIn";

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
    return <div>Wait a minute ...</div>;
  } else if (!signedIn) {
    return <SignIn signIn={async () => setSignedIn(await signIn())} />;
  }

  return (
    <Home
      createDocument={createDocument}
      listDocuments={listDocuments}
      signOut={async () => setSignedIn(await signOut())}
    />
  );
};
