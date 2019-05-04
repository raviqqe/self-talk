import React, { useEffect, useState } from "react";
import { IInitialState } from "../../application/application-initializer";
import { Home } from "./Home";
import { SignIn } from "./SignIn";

interface IProps {
  createDocument: (text: string) => void;
  initialize: () => Promise<IInitialState>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

export const App = ({
  createDocument,
  initialize,
  signIn,
  signOut
}: IProps) => {
  const [initialized, setInitialized] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      if (!initialized) {
        const { signedIn } = await initialize();
        setSignedIn(signedIn);
        setInitialized(true);
      }
    })();
  });

  if (!initialized) {
    return <div>Wait a minute ...</div>;
  } else if (!signedIn) {
    return <SignIn signIn={async () => setSignedIn(await signIn())} />;
  }

  return (
    <Home
      createDocument={createDocument}
      signOut={async () => setSignedIn(await signOut())}
    />
  );
};
