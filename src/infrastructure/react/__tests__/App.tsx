import { render } from "@testing-library/react";
import React from "react";
import { App } from "../App";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { IDocument } from "../../../domain/document";

it("renders before a user signs in", async () => {
  const result = render(
    <App
      authenticationStore={new AuthenticationStore()}
      createDocument={async () => ({} as IDocument)}
      initialize={async () => {}}
      insertFiles={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signIn={() => {}}
      signOut={() => {}}
      updateDocument={async () => ({} as IDocument)}
      repositoryURL="url"
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  const store = new AuthenticationStore();
  store.setSignedIn(true);

  const result = render(
    <App
      authenticationStore={store}
      createDocument={async () => ({} as IDocument)}
      initialize={async () => {}}
      insertFiles={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signIn={() => {}}
      signOut={() => {}}
      updateDocument={async () => ({} as IDocument)}
      repositoryURL="url"
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs out", async () => {
  const store = new AuthenticationStore();
  store.setSignedIn(false);

  const result = render(
    <App
      authenticationStore={store}
      createDocument={async () => ({} as IDocument)}
      initialize={async () => {}}
      insertFiles={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signIn={() => {}}
      signOut={() => {}}
      updateDocument={async () => ({} as IDocument)}
      repositoryURL="url"
    />
  );

  expect(result.container).toMatchSnapshot();
});
