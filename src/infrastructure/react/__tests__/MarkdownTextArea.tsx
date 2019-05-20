import React from "react";
import { create } from "react-test-renderer";
import { MarkdownTextArea } from "../MarkdownTextArea";

it("renders", () => {
  expect(
    create(
      <MarkdownTextArea
        insertImage={async () => "url"}
        onSubmit={async () => undefined}
        setText={() => undefined}
        text="foo"
      />
    ).toJSON()
  ).toMatchSnapshot();
});
