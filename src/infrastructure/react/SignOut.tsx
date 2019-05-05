import React from "react";
import { MdExitToApp } from "react-icons/md";
import styled from "styled-components";

const Button = styled.button`
  background: lightgrey;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  padding: 0;
  height: 2em;
  width: 2em;
  border: none;
  border-radius: 1em;
  flex-shrink: 0;
  cursor: pointer;
`;

interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut }: IProps) => (
  <Button onClick={signOut}>
    <MdExitToApp />
  </Button>
);
