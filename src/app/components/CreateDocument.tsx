import { styled } from "@linaria/react";
import { type JSX, useState } from "react";
import { MdAdd } from "react-icons/md";
import { documentCreator } from "../../main/document-creator.js";
import { CircleButton } from "./CircleButton.js";
import { MarkdownTextArea } from "./MarkdownTextArea.js";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const StyledMarkdownTextArea = styled(MarkdownTextArea)`
  max-height: 80vh;
`;

const StyledCircleButton = styled(CircleButton)`
  margin-left: -0.5rem;
`;

interface Props {
  className?: string;
}

export const CreateDocument = ({ className }: Props): JSX.Element => {
  const [text, setText] = useState("");
  const onSubmit = async (): Promise<void> => {
    setText("");
    await documentCreator.create(text);
  };

  return (
    <Container className={className}>
      <StyledMarkdownTextArea
        onChange={setText}
        onSubmit={onSubmit}
        text={text}
      />
      <StyledCircleButton aria-label="Create" onClick={onSubmit}>
        <MdAdd />
      </StyledCircleButton>
    </Container>
  );
};
