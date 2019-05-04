import React from "react";

interface IProps {
  signIn: () => void;
}

export const SignIn = ({ signIn }: IProps) => (
  <button onClick={signIn}>Sign in</button>
);
