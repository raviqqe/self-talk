import React from "react";
import { create } from "react-test-renderer";
import { Document } from "../Document";

it("renders", () => {
  expect(
    create(
      <Document
        document={{ id: "id", text: "text", createdAt: 42 }}
        insertImages={async () => "url"}
        updateDocument={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
