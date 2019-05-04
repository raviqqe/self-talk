import React from "react";

interface IProps {
  signOut: () => void;
}

export const SignOut = ({ signOut }: IProps) => (
  <button onClick={signOut}>Sign out</button>
);
