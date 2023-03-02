import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import styled from "styled-components";
import { Home, type IProps as IHomeProps } from "./Home";
import { type IProps as ILandingProps, Landing } from "./Landing";
import { white } from "./style/colors";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface IProps extends IHomeProps, ILandingProps {
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
}: IProps): JSX.Element => {
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
