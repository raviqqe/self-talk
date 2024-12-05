import { styled } from "@linaria/react";
import { useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import { IconButton } from "./IconButton.js";
import { Markdown } from "./Markdown.js";
import {
  UpdateDocument,
  type Props as UpdateDocumentProps,
} from "./UpdateDocument.js";
import { white } from "./style/colors.js";
import { boxShadow } from "./style.js";

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

type Props = UpdateDocumentProps;

export const Document = ({
  document,
  insertFiles,
  updateDocument,
  ...restProps
}: Props): JSX.Element => {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <UpdateDocument
      document={document}
      insertFiles={insertFiles}
      updateDocument={async (document) => {
        setEditing(false);
        await updateDocument(document);
      }}
      {...restProps}
    />
  ) : (
    <Container {...restProps}>
      <Markdown>{document.text}</Markdown>
      <ButtonContainer>
        <IconButton aria-label="Menu" onClick={() => setEditing(true)}>
          <MdOutlineMoreVert />
        </IconButton>
      </ButtonContainer>
    </Container>
  );
};
