import { create } from "react-test-renderer";
import React from "react";
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
