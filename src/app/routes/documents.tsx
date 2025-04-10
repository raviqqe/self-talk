import { styled } from "@linaria/react";
import { type JSX } from "react";
import { CreateDocument } from "../components/CreateDocument.js";
import { DocumentList } from "../components/DocumentList.js";
import { SignOut } from "../components/SignOut.js";
import { darkYellow } from "../style.js";

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

const StyledCreateDocument = styled(CreateDocument)`
  position: relative;
  z-index: 1;
`;

const CreateDocumentContainer = styled.div`
  position: relative;
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

export default (): JSX.Element | null => (
  <Container>
    <DocumentList />
    <CreateDocumentContainer>
      <CreateDocumentBackground />
      <StyledCreateDocument />
    </CreateDocumentContainer>
    <SignOutContainer>
      <SignOut />
    </SignOutContainer>
  </Container>
);
