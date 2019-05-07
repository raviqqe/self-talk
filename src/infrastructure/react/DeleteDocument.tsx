import React from "react";
import { MdDelete } from "react-icons/md";
import { IconButton } from "./IconButton";

interface IProps {
  deleteDocument: () => Promise<void>;
}

export const DeleteDocument = ({ deleteDocument }: IProps) => {
  return (
    <IconButton onClick={deleteDocument}>
      <MdDelete />
    </IconButton>
  );
};
