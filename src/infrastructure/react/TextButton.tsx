import React, { FC, HTMLAttributes, HTMLProps, ReactNode } from "react";
import styled from "styled-components";

const Button: FC<any> = styled.button<{ secondary?: boolean }>`
  background: ${({ secondary }) => (secondary ? "lightgrey" : "salmon")}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  font-size: 1.2em;
  font-family: inherit;
  color: white;
  border: none;
  border-radius: 0.5em;
  cursor: pointer;
`;

interface IProps
  extends HTMLProps<HTMLButtonElement>,
    HTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  children?: ReactNode;
}

export const TextButton = ({ children, ...rest }: IProps) => (
  <Button {...rest}>{children}</Button>
);
