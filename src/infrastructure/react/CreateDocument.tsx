import { times } from "lodash";
import React, { ChangeEvent, ClipboardEvent, useState } from "react";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import { CircleButton } from "./CircleButton";
import { TextArea } from "./TextArea";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const OverwrappedTextArea = styled(TextArea)`
  max-height: 80vh;
  margin-right: -1em;
`;

interface IProps {
  createDocument: (text: string) => Promise<void>;
  insertImage: (text: string, position: number, image: Blob) => Promise<string>;
}

export const CreateDocument = ({ createDocument, insertImage }: IProps) => {
  const [text, setText] = useState("");
  const create = async () => {
    setText("");
    await createDocument(text);
  };

  return (
    <Container>
      <OverwrappedTextArea
        onSubmit={create}
        placeholder="Write in Markdown ..."
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setText(event.target.value)
        }
        onPaste={async (
          event: ClipboardEvent<HTMLTextAreaElement>
        ): Promise<void> => {
          if (!event.clipboardData || !event.clipboardData.items) {
            return;
          }

          const items = event.clipboardData.items;

          for (const index of times(items.length)) {
            const item = items[index];

            if (!item.type.startsWith("image/")) {
              continue;
            }

            const image = item.getAsFile();

            if (!image) {
              continue;
            }

            setText(
              await insertImage(text, event.currentTarget.selectionStart, image)
            );

            break;
          }
        }}
        value={text}
      />
      <CircleButton onClick={create}>
        <MdAdd />
      </CircleButton>
    </Container>
  );
};
