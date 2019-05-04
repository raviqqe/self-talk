import React, { FC, useEffect, useState } from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { Home } from "./Home";
import { SignIn } from "./SignIn";

interface IProps {
  applicationInitializer: ApplicationInitializer;
  signInManager: SignInManager;
  signOutManager: SignOutManager;
}

export const App: FC<IProps> = ({
  signInManager,
  signOutManager,
  applicationInitializer
}: IProps) => {
  const [initialized, setInitialized] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    (async () => {
      if (!initialized) {
        const { signedIn } = await applicationInitializer.initialize();
        setSignedIn(signedIn);
        setInitialized(true);
      }
    })();
  });

  if (!initialized) {
    return <div>Wait a minute ...</div>;
  } else if (!signedIn) {
    return (
      <SignIn signIn={async () => setSignedIn(await signInManager.signIn())} />
    );
  }

  return (
    <Home signOut={async () => setSignedIn(await signOutManager.signOut())} />
  );
};
