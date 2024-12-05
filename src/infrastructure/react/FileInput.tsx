import { styled } from "@linaria/react";
import { type AriaAttributes, type ReactNode } from "react";
import { grey } from "./style/colors.js";

const Container = styled.div`
  position: relative;
  color: ${grey};
  font-size: 1.5rem;
  line-height: 0;
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

interface Props extends AriaAttributes {
  children: ReactNode;
  onChange: (files: File[]) => void;
}

export const FileInput = ({
  children,
  onChange,
  ...restProps
}: Props): JSX.Element => (
  <Container>
    {children}
    <Input
      type="file"
      onChange={({ target: { files } }) => {
        if (files?.length) {
          onChange([...files]);
        }
      }}
      {...restProps}
    />
  </Container>
);
