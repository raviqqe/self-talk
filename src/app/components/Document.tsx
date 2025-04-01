import { styled } from "@linaria/react";
import { type JSX, useState } from "react";
import { MdEdit } from "react-icons/md";
import type * as domain from "../../domain.js";
import { documentUpdater } from "../../main/document-updater.js";
import { boxShadow, white } from "../style.js";
import { IconButton } from "./IconButton.js";
import { Markdown } from "./Markdown.js";
import { UpdateDocument } from "./UpdateDocument.js";

const Container = styled.div`
  ${boxShadow};
  background: ${white};
  padding: 1em;
  padding-right: 2.1em;
  border-radius: 0.5em;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0.4em;
  right: 0.4em;
`;

interface Props {
  className?: string;
  document: domain.Document;
}

export const Document = ({ document, ...rest }: Props): JSX.Element => {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <UpdateDocument
      document={document}
      onSubmit={async (document) => {
        setEditing(false);
        await documentUpdater.update(document);
      }}
      {...rest}
    />
  ) : (
    <Container {...rest}>
      <Markdown>{document.text}</Markdown>
      <ButtonContainer>
        <IconButton aria-label="Edit" onClick={() => setEditing(true)}>
          <MdEdit />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
};
