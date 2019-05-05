import React, { useState } from "react";

interface IProps {
  createDocument: (text: string) => Promise<void>;
}

export const CreateDocument = ({ createDocument }: IProps) => {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea onChange={event => setText(event.target.value)} value={text} />
      <button
        onClick={async () => {
          setText("");
          await createDocument(text);
        }}
      >
        +
      </button>
    </div>
  );
};
