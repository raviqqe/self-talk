import { Omit } from "lodash";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import React, { useState } from "react";
import styled from "styled-components";
import { IInitialState } from "../../application/application-initializer";
import { IProps as ILandingProps, Landing } from "./Landing";
import { Home, IProps as IHomeProps } from "./Home";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

interface IProps extends Omit<IHomeProps, "signOut">, ILandingProps {
  initialize: () => Promise<IInitialState>;
  signIn: () => void;
  signOut: () => Promise<boolean>;
}

export const App = ({
  initialize,
  repositoryURL,
  signIn,
  signOut,
  ...props
}: IProps) => {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useAsync(async () => {
    const { signedIn } = await initialize();
    setSignedIn(signedIn);
  }, []);

  return signedIn === null ? (
    <LoaderContainer>
      <PulseLoader color="white" />
    </LoaderContainer>
  ) : signedIn ? (
    <Home {...props} signOut={async () => setSignedIn(await signOut())} />
  ) : (
    <Landing repositoryURL={repositoryURL} signIn={signIn} />
  );
};
