import React, { FC, useEffect, useState } from "react";
import { IInitialState } from "../../application/application-initializer";
import { Home } from "./Home";
import { SignIn } from "./SignIn";

interface IProps {
  initialize: () => Promise<IInitialState>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

export const App: FC<IProps> = ({ initialize, signIn, signOut }: IProps) => {
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

  return <Home signOut={async () => setSignedIn(await signOut())} />;
};
