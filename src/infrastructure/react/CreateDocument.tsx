import React, { useState } from "react";

interface IProps {
  createDocument: (text: string) => void;
}

export const CreateDocument = ({ createDocument }: IProps) => {
  const [creating, setCreating] = useState(false);
  const [text, setText] = useState("");

  if (!creating) {
    return <button onClick={() => setCreating(true)}>New</button>;
  }

  return (
    <div>
      <textarea
        autoFocus={true}
        onChange={event => setText(event.target.value)}
        value={text}
      />
      <button
        onClick={() => {
          setCreating(false);
          setText("");
          createDocument(text);
        }}
      >
        Create
      </button>
      <button onClick={() => setCreating(false)}>Cancel</button>
    </div>
  );
};
