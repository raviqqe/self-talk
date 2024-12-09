import { styled } from "@linaria/react";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import { applicationInitializer } from "../../main/application-initializer.js";
import { Home } from "./Home.js";
import { Landing } from "./Landing.js";
import { white } from "./style/colors.js";
import { useStore } from "@nanostores/react";
import { authenticationPresenter } from "../../main/authentication-presenter.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const App = (): JSX.Element => {
  useAsync(() => applicationInitializer.initialize(), []);
  const signedIn = useStore(authenticationPresenter.signedIn);

  return signedIn === null ? (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  ) : signedIn ? (
    <Home />
  ) : (
    <Landing />
  );
};
