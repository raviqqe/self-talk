import React from "react";
import { useAsyncFn, useEffectOnce } from "react-use";
import { IDocument } from "../../domain/document";
import { CreateDocument } from "./CreateDocument";
import { Documents } from "./Documents";
import { SignOut } from "./SignOut";

interface IProps {
  createDocument: (text: string) => Promise<void>;
  listDocuments: () => Promise<IDocument[]>;
  signOut: () => void;
}

export const Home = ({ createDocument, listDocuments, signOut }: IProps) => {
  const [state, fetchDocuments] = useAsyncFn(listDocuments);
  useEffectOnce(fetchDocuments);

  return (
    <div>
      <Documents documents={state.value || []} />
      <CreateDocument
        createDocument={async (text: string) => {
          await createDocument(text);
          fetchDocuments();
        }}
      />
      <SignOut signOut={signOut} />
    </div>
  );
};
