import React, { useEffect, useState } from "react";
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
  const [initialized, setInitialized] = useState(false);
  const [documents, setDocuments] = useState<IDocument[]>([]);

  useEffect(() => {
    (async () => {
      if (!initialized) {
        setDocuments(await listDocuments());
        setInitialized(true);
      }
    })();
  });

  return (
    <div>
      <Documents documents={documents} />
      <CreateDocument
        createDocument={async (text: string) => {
          await createDocument(text);
          setDocuments(await listDocuments());
        }}
      />
      <SignOut signOut={signOut} />
    </div>
  );
};
