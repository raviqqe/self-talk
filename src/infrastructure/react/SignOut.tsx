import React from "react";
import { MdExitToApp } from "react-icons/md";
import { CircleButton } from "./CircleButton";

interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut }: IProps) => (
  <CircleButton secondary={true} onClick={signOut}>
    <MdExitToApp />
  </CircleButton>
);
