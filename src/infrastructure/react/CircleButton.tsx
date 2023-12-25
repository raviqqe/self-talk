import { defaultImport } from "default-import";
import { styled } from "@linaria/react";
import { Button } from "./Button.js";

const styled = defaultImport(defaultStyled);

export const CircleButton = styled(Button)`
  font-size: 1.5em;
  padding: 0;
  height: 2em;
  width: 2em;
  border-radius: 1em;
`;
