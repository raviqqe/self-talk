import React from "react";
import { create } from "react-test-renderer";
import { Documents } from "../Documents";

it("renders", () => {
  expect(
    create(
      <Documents
        documents={[{ id: "id", text: "text", createdAt: 42 }]}
        insertImage={async () => "url"}
        loadMoreDocuments={async () => undefined}
        updateDocument={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});

it("renders with no documents", () => {
  expect(
    create(
      <Documents
        documents={[]}
        insertImage={async () => "url"}
        loadMoreDocuments={async () => undefined}
        updateDocument={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
