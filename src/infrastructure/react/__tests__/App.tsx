import { render, waitForDomChange } from "@testing-library/react";
import React from "react";
import { App } from "../App";
import { IDocument } from "../../../domain/document";

it("renders before a user signs in", async () => {
  const result = render(
    <App
      createDocument={async () => ({} as IDocument)}
      initialize={async () => ({ signedIn: false })}
      insertFiles={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signIn={() => undefined}
      signOut={async () => false}
      updateDocument={async () => ({} as IDocument)}
      repositoryURL="url"
    />
  );

  await waitForDomChange(result);

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  const result = render(
    <App
      createDocument={async () => ({} as IDocument)}
      initialize={async () => ({ signedIn: true })}
      insertFiles={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signIn={() => undefined}
      signOut={async () => false}
      updateDocument={async () => ({} as IDocument)}
      repositoryURL="url"
    />
  );

  await waitForDomChange(result);

  expect(result.container).toMatchSnapshot();
});
