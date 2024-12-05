import { MdEdit, MdImage, MdOutlineMoreVert } from "react-icons/md";
import { IconButton } from "./IconButton.js";
import { styled } from "@linaria/react";
import { white } from "./style/colors.js";
import { boxShadow } from "./style.js";
import { useState } from "react";

const OuterButton = styled(IconButton)`
  position: relative;
`;

const Box = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background: ${white};
  padding: 1em;
  border-radius: 0.5em;
  position: relative;
  ${boxShadow};
`;

interface Props {
  onEdit: () => void;
  onPasteImages: (files: File[]) => void;
}

export const Menu = ({ onEdit, onPasteImages }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <OuterButton aria-label="Menu" onClick={() => setOpen(true)}>
      <MdOutlineMoreVert />
      {open && (
        <Box onMouseOut={() => setOpen(false)}>
          <IconButton aria-label="Edit" onClick={() => onEdit()}>
            <MdEdit />
          </IconButton>
          <IconButton
            aria-label="Paste image"
            onClick={() => {
              onPasteImages(true);
            }}
          >
            <MdImage />
          </IconButton>
        </Box>
      )}
    </OuterButton>
  );
};
