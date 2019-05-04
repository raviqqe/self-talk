import React from "react";
import { CreateDocument } from "./CreateDocument";
import { SignOut } from "./SignOut";

interface IProps {
  createDocument: (text: string) => void;
  signOut: () => void;
}

export const Home = ({ createDocument, signOut }: IProps) => (
  <div>
    <CreateDocument createDocument={createDocument} />
    <SignOut signOut={signOut} />
  </div>
);
