import { create } from "react-test-renderer";
import React from "react";
import { Documents } from "../Documents";

it("renders", () => {
  expect(
    create(
      <Documents
        documents={[{ id: "id", text: "text" }]}
        insertFiles={async () => "url"}
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
        insertFiles={async () => "url"}
        loadMoreDocuments={async () => undefined}
        updateDocument={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
