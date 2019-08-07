import React from "react";
import { create } from "react-test-renderer";
import { UpdateDocument } from "../UpdateDocument";

it("renders", () => {
  expect(
    create(
      <UpdateDocument
        document={{ id: "id", text: "text" }}
        insertImages={async () => "url"}
        onUpdate={() => undefined}
        updateDocument={async () => undefined}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
