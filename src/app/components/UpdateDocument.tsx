import { styled } from "@linaria/react";
import { type JSX, useState } from "react";
import { MdSave } from "react-icons/md";
import { type Document } from "../../domain/document.js";
import { CircleButton } from "./CircleButton.js";
import { MarkdownTextArea } from "./MarkdownTextArea.js";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCircleButton = styled(CircleButton)`
  margin-left: -0.5rem;
`;

interface Props {
  className?: string;
  document: Document;
  onSubmit: (document: Document) => Promise<void>;
}

export const UpdateDocument = ({
  document,
  onSubmit: onParentSubmit,
  ...props
}: Props): JSX.Element => {
  const [text, setText] = useState(document.text);
  const onSubmit = () => onParentSubmit({ ...document, text });

  return (
    <Container {...props}>
      <MarkdownTextArea onChange={setText} onSubmit={onSubmit} text={text} />
      <StyledCircleButton aria-label="Save" onClick={onSubmit}>
        <MdSave />
      </StyledCircleButton>
    </Container>
  );
};
