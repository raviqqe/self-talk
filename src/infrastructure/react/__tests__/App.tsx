import { render } from "@testing-library/react";
import React from "react";
import { App } from "../App";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { DocumentsStore } from "../../mobx/documents-store";

it("renders before a user signs in", async () => {
  const result = render(
    <App
      authenticationStore={new AuthenticationStore()}
      createDocument={async () => {}}
      documentsStore={new DocumentsStore()}
      initialize={async () => {}}
      insertFiles={async () => ""}
      listDocuments={async () => {}}
      listMoreDocuments={async () => {}}
      repositoryURL=""
      signIn={() => {}}
      signOut={() => {}}
      updateDocument={async () => {}}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", async () => {
  const authenticationStore = new AuthenticationStore();
  authenticationStore.setSignedIn(true);

  const result = render(
    <App
      authenticationStore={authenticationStore}
      createDocument={async () => {}}
      documentsStore={new DocumentsStore()}
      initialize={async () => {}}
      insertFiles={async () => ""}
      listDocuments={async () => {}}
      listMoreDocuments={async () => {}}
      repositoryURL=""
      signIn={() => {}}
      signOut={() => {}}
      updateDocument={async () => {}}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs out", async () => {
  const authenticationStore = new AuthenticationStore();
  authenticationStore.setSignedIn(false);

  const result = render(
    <App
      authenticationStore={authenticationStore}
      createDocument={async () => {}}
      documentsStore={new DocumentsStore()}
      initialize={async () => {}}
      insertFiles={async () => ""}
      listDocuments={async () => {}}
      listMoreDocuments={async () => {}}
      repositoryURL=""
      signIn={() => {}}
      signOut={() => {}}
      updateDocument={async () => {}}
    />
  );

  expect(result.container).toMatchSnapshot();
});
