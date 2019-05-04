import React from "react";

interface IProps {
  signIn: () => void;
}

export const SignIn = ({ signIn }: IProps) => (
  <div>
    <button onClick={signIn}>Sign in</button>
  </div>
);
