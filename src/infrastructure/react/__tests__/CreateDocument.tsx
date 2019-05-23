import React from "react";
import { create } from "react-test-renderer";
import { CreateDocument } from "../CreateDocument";

it("renders", () => {
  expect(
    create(
      <CreateDocument
        createDocument={async () => undefined}
        insertImages={async () => "url"}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
