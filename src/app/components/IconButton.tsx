import { styled } from "@linaria/react";
import { type AriaAttributes, type JSX, type ReactNode } from "react";
import { grey } from "../style.js";

const Button = styled.button`
  color: ${grey};
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  background: transparent;
  border: none;
  padding: 0;
`;

interface Props extends AriaAttributes {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export const IconButton = ({
  children,
  onClick,
  ...restProps
}: Props): JSX.Element => (
  <Button onClick={onClick} {...restProps}>
    {children}
  </Button>
);
