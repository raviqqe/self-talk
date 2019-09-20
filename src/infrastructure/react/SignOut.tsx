import { MdExitToApp } from "react-icons/md";
import React from "react";
import { CircleButton } from "./CircleButton";

interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut }: IProps) => (
  <CircleButton onClick={signOut} secondary={true}>
    <MdExitToApp />
  </CircleButton>
);
