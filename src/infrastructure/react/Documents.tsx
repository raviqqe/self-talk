import React from "react";
import { IDocument } from "../../domain/document";
import { Document } from "./Document";

interface IProps {
  documents: IDocument[];
}

export const Documents = ({ documents }: IProps) => (
  <div>
    {documents.map(document => (
      <Document key={document.id} {...document} />
    ))}
  </div>
);
