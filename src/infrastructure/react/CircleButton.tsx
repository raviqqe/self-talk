import styled from "styled-components";
import { boxShadow } from "./style";

export const CircleButton = styled.button<{ secondary?: boolean }>`
  ${boxShadow};
  background: ${({ secondary }) => (secondary ? "lightgrey" : "salmon")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  padding: 0;
  height: 2em;
  width: 2em;
  border: none;
  border-radius: 1em;
  flex-shrink: 0;
  cursor: pointer;
`;
