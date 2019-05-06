import React from "react";
import styled from "styled-components";
import { SignIn } from "./SignIn";

interface IProps {
  signIn: () => void;
}

const Container = styled.div`
  background: khaki;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin: 2rem;
  }
`;

const Title = styled.div`
  font-size: 3em;
  font-weight: bold;
  text-shadow: 0.4em 0.4em 0.4em rgba(0, 0, 0, 0.1);
`;

const White = styled.span`
  color: white;
`;

const Red = styled.span`
  color: salmon;
`;

export const Landing = (props: IProps) => (
  <Container>
    <Title>
      <White>Self</White>
      <Red>Talk</Red>
    </Title>
    <SignIn {...props} />
  </Container>
);
