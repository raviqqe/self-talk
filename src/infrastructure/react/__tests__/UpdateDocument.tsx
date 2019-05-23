import React from "react";
import { create } from "react-test-renderer";
import { UpdateDocument } from "../UpdateDocument";

it("renders", () => {
  expect(
    create(
      <UpdateDocument
        document={{ id: "id", text: "text", createdAt: 42 }}
        insertImages={async () => "url"}
        onUpdate={() => undefined}
        updateDocument={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
