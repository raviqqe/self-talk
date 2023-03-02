import { defaultImport } from "default-import";
import defaultStyled from "styled-components";
import { lightGrey, red, white } from "./style/colors.js";
import { boxShadow } from "./style/index.js";

const styled = defaultImport(defaultStyled);

export const Button = styled.button<{ secondary?: boolean }>`
  ${boxShadow};
  background: ${({ secondary }) => (secondary ? lightGrey : red)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  color: ${white};
  border: none;
  cursor: pointer;
  flex-shrink: 0;
`;
