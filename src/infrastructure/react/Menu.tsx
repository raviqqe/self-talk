import { MdEdit, MdImage, MdOutlineMoreVert } from "react-icons/md";
import { IconButton } from "./IconButton.js";
import { styled } from "@linaria/react";
import { white } from "./style/colors.js";
import { boxShadow } from "./style.js";

const Box = styled.div`
  position: absolute;
  background: ${white};
  padding: 1em;
  border-radius: 0.5em;
  position: relative;
  ${boxShadow};
`;

export const Menu = (): JSX.Element => {
  return (
    <IconButton aria-label="Menu" onClick={() => setEditing(true)}>
      <MdOutlineMoreVert />
      <Box>
        <IconButton aria-label="Menu" onClick={() => setEditing(true)}>
          <MdEdit />
        </IconButton>
        <IconButton aria-label="Menu" onClick={() => setEditing(true)}>
          <MdImage />
        </IconButton>
      </Box>
    </IconButton>
  );
};
