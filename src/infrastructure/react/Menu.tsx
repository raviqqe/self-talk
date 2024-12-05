import { MdEdit, MdImage, MdOutlineMoreVert } from "react-icons/md";
import { IconButton } from "./IconButton.js";
import { styled } from "@linaria/react";
import { white } from "./style/colors.js";
import { boxShadow } from "./style.js";
import { useState } from "react";
import { FileInput } from "./FileInput.js";

const Container = styled.div`
  position: relative;
`;

const Box = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background: ${white};
  padding: 1em;
  border-radius: 0.5em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${boxShadow};
`;

interface Props {
  onEdit: () => void;
  onPasteImages: (files: File[]) => void;
}

export const Menu = ({ onEdit, onPasteImages }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <IconButton aria-label="Menu" onClick={() => setOpen(true)}>
        <MdOutlineMoreVert />
      </IconButton>
      {open && (
        <Box onMouseLeave={() => setOpen(false)}>
          <FileInput aria-label="Paste image" onChange={onPasteImages}>
            <MdImage />
          </FileInput>
          <IconButton aria-label="Edit" onClick={() => onEdit()}>
            <MdEdit />
          </IconButton>
        </Box>
      )}
    </Container>
  );
};
