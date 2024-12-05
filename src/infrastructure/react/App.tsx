import { styled } from "@linaria/react";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import { applicationInitializer } from "../../main/application-initializer.js";
import { Home, type Props as HomeProps } from "./Home.js";
import { Landing, type Props as LandingProps } from "./Landing.js";
import { white } from "./style/colors.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface Props extends HomeProps, LandingProps {
  signedIn: boolean | null;
}

export const App = ({
  documents,
  repositoryUrl,
  signedIn,
  signIn,
  signOut,
  ...props
}: Props): JSX.Element => {
  useAsync(() => applicationInitializer.initialize(), []);

  return signedIn === null ? (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  ) : signedIn ? (
    <Home {...props} documents={documents} signOut={signOut} />
  ) : (
    <Landing repositoryUrl={repositoryUrl} signIn={signIn} />
  );
};
