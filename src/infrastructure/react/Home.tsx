import { styled } from "@linaria/react";
import { CreateDocument } from "./CreateDocument.js";
import { DocumentList, type Props } from "./DocumentList.js";
import { SignOut } from "./SignOut.js";
import { darkYellow } from "./style/colors.js";
import { signOutManager } from "../../main/sign-out-manager.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 85ex;
  max-width: 100%;
  margin: auto;

  > :first-child {
    flex: 1;
  }
`;

const CreateDocumentContainer = styled.div`
  position: relative;

  * {
    z-index: 1;
  }
`;

const CreateDocumentBackground = styled.div`
  background: ${darkYellow};
  position: absolute;
  top: 0;
  left: -100vw;
  width: 200vw;
  height: 100%;
  box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.3);
  z-index: 0;
`;

const SignOutContainer = styled.div`
  position: fixed;
  top: 0.5em;
  right: 0.5em;
`;

export { Props };

export const Home = ({ documents }: Props): JSX.Element => (
  <Container>
    <DocumentList documents={documents} />
    <CreateDocumentContainer>
      <CreateDocument />
      <CreateDocumentBackground />
    </CreateDocumentContainer>
    <SignOutContainer>
      <SignOut signOut={() => signOutManager.signOut()} />
    </SignOutContainer>
  </Container>
);
