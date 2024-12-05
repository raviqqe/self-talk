import { styled } from "@linaria/react";
import { type AriaAttributes, type ReactNode } from "react";
import { grey } from "./style/colors.js";

const Input = styled.input`
  color: ${grey};
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  background: transparent;
  border: none;
`;

interface Props extends AriaAttributes {
  className?: string;
  children: ReactNode;
  onChange: (files: File[]) => void;
}

export const FileInput = ({
  children,
  onChange,
  ...restProps
}: Props): JSX.Element => (
  <Input
    type="file"
    onChange={({ target: { files } }) => {
      if (files?.length) {
        onChange([...files]);
      }
    }}
    {...restProps}
  >
    {children}
  </Input>
);
