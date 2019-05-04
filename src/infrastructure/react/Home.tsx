import React from "react";
import { SignOut } from "./SignOut";

interface IProps {
  signOut: () => void;
}

export const Home = ({ signOut }: IProps) => (
  <div>
    <SignOut signOut={signOut} />
  </div>
);
