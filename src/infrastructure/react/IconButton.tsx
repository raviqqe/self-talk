import { type AriaAttributes, type ReactNode } from "react";
import { styled } from "@linaria/react";
import { grey } from "./style/colors.js";

const Button = styled.div`
  color: ${grey};
  cursor: pointer;
  font-size: 1.5em;
  display: flex;
`;

interface Props extends AriaAttributes {
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
