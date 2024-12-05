import { styled } from "@linaria/react";
import { type AriaAttributes, type ReactNode } from "react";
import { grey } from "./style/colors.js";

const Button = styled.button`
  color: ${grey};
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
  background: transparent;
  border: none;
`;

interface Props extends AriaAttributes {
  className?: string;
  children: ReactNode;
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
