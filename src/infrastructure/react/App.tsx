import { defaultImport } from "default-import";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import { styled } from "@linaria/react";
import { Home, type Props as HomeProps } from "./Home.js";
import { type Props as LandingProps, Landing } from "./Landing.js";
import { white } from "./style/colors.js";

const styled = defaultImport(defaultStyled);

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface Props extends HomeProps, LandingProps {
  initialize: () => Promise<void>;
  signedIn: boolean | null;
}

export const App = ({
  documents,
  initialize,
  repositoryUrl,
  signedIn,
  signIn,
  signOut,
  ...props
}: Props): JSX.Element => {
  useAsync(initialize, []);

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
