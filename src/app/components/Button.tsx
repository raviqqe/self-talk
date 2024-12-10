import { styled } from "@linaria/react";
import { boxShadow, lightGrey, red, white } from "../style.js";

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
