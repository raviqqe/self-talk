import { Omit } from "lodash";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import styled from "styled-components";
import { IInitialState } from "../../application/application-initializer";
import { Home, IProps as IHomeProps } from "./Home";
import { Landing } from "./Landing";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

interface IProps extends Omit<IHomeProps, "signOut"> {
  initialize: () => Promise<IInitialState>;
  signIn: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

export const App = ({ initialize, signIn, signOut, ...props }: IProps) => {
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

  return <Home {...props} signOut={async () => setSignedIn(await signOut())} />;
};
