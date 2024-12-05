import { MdEdit, MdImage, MdOutlineMoreVert } from "react-icons/md";
import { IconButton } from "./IconButton.js";
import { styled } from "@linaria/react";
import { white } from "./style/colors.js";
import { boxShadow } from "./style.js";
import { useState } from "react";

const Box = styled.div`
  position: absolute;
  background: ${white};
  padding: 1em;
  border-radius: 0.5em;
  position: relative;
  ${boxShadow};
`;

interface Props {
  onEdit: () => void;
  onImage: (file: File) => void;
}

export const Menu = ({ onEdit, onImage }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <IconButton aria-label="Menu" onClick={() => setOpen(true)}>
      <MdOutlineMoreVert />
      <Box onMouseOut={() => setOpen(false)}>
        <IconButton aria-label="Edit" onClick={() => onEdit()}>
          <MdEdit />
        </IconButton>
        <IconButton aria-label="Paste image" onClick={() => on(true)}>
          <MdImage />
        </IconButton>
      </Box>
    </IconButton>
  );
};
