import React from "react";
import { GoMarkGithub } from "react-icons/go";
import styled from "styled-components";
import configuration from "../../configuration.json";
import { SignIn } from "./SignIn";

interface IProps {
  signIn: () => void;
}

const Container = styled.div`
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
  font-size: 3.5em;
  font-weight: bold;
  text-shadow: 0.4em 0.4em 0.4em rgba(0, 0, 0, 0.1);
`;

const White = styled.span`
  color: white;
`;

const Red = styled.span`
  color: salmon;
`;

const GitHubLink = styled.a`
  font-size: 2.5rem;
  margin: 1.5rem;
  color: #222;
  display: block;
  position: fixed;
  bottom: 0em;
  right: 0em;
  line-height: 0ex;
`;

export const Landing = (props: IProps) => (
  <Container>
    <Title>
      <White>Self</White>
      <Red>Talk</Red>
    </Title>
    <SignIn {...props} />
    <GitHubLink href={configuration.repositoryURL} target="_blank">
      <GoMarkGithub />
    </GitHubLink>
  </Container>
);
