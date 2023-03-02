import { defaultImport } from "default-import";
import { useState } from "react";
import { MdSave } from "react-icons/md/index.js";
import defaultStyled from "styled-components";
import { type IDocument } from "../../domain/document.js";
import { CircleButton } from "./CircleButton.js";
import { MarkdownTextArea } from "./MarkdownTextArea.js";
import { type InsertFilesFunction } from "./utilities.js";

const styled = defaultImport(defaultStyled);

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMarkdownTextArea = styled(MarkdownTextArea)`
  margin-right: -1em;
`;

export interface IProps {
  className?: string;
  document: IDocument;
  insertFiles: InsertFilesFunction;
  updateDocument: (document: IDocument) => Promise<void>;
}

export const UpdateDocument = ({
  document,
  insertFiles,
  updateDocument,
  ...restProps
}: IProps): JSX.Element => {
  const [text, setText] = useState(document.text);
  const onSubmit = () => updateDocument({ ...document, text });

  return (
    <Container {...restProps}>
      <StyledMarkdownTextArea
        insertFiles={insertFiles}
        onSubmit={onSubmit}
        setText={setText}
        text={text}
      />
      <CircleButton aria-label="Save" onClick={onSubmit}>
        <MdSave />
      </CircleButton>
    </Container>
  );
};
