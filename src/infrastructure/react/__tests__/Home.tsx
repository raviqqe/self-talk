import React from "react";
import { create } from "react-test-renderer";
import { Home } from "../Home";

it("renders", () => {
  expect(
    create(
      <Home
        createDocument={async () => null}
        insertImage={async () => "url"}
        listDocuments={async function*() {
          yield [];
        }}
        signOut={async () => undefined}
        updateDocument={async () => null}
      />
    ).toJSON()
  ).toMatchSnapshot();
});
