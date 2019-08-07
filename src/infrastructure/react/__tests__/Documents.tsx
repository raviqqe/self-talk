import React from "react";
import { create } from "react-test-renderer";
import { Documents } from "../Documents";

it("renders", () => {
  expect(
    create(
      <Documents
        documents={[{ id: "id", text: "text" }]}
        insertImages={async () => "url"}
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
        insertImages={async () => "url"}
        loadMoreDocuments={async () => undefined}
        updateDocument={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
