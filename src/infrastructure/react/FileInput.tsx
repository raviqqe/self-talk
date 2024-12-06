import { styled } from "@linaria/react";
import { type AriaAttributes } from "react";
import { MdAttachFile } from "react-icons/md";
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
  cursor: pointer;
`;

interface Props extends AriaAttributes {
  onChange: (files: File[]) => void;
}

export const FileInput = ({ onChange, ...props }: Props): JSX.Element => (
  <Container>
    <MdAttachFile />
    <Input
      onChange={({ target: { files } }) => {
        if (files?.length) {
          onChange([...files]);
        }
      }}
      type="file"
      {...props}
    />
  </Container>
);
