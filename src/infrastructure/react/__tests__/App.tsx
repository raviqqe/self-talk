import { render } from "@testing-library/react";
import React from "react";
import { App, IProps } from "../App";
import { AuthenticationStore } from "../../mobx/authentication-store";
import { DocumentsStore } from "../../mobx/documents-store";

const commonProps: Omit<IProps, "authenticationStore" | "documentsStore"> = {
  createDocument: async () => {},
  initialize: async () => {},
  insertFiles: async () => "",
  listDocuments: async () => {},
  listMoreDocuments: async () => {},
  repositoryURL: "",
  signIn: async () => {},
  signOut: async () => {},
  updateDocument: async () => {}
};

it("renders before a user signs in", () => {
  const result = render(
    <App
      {...commonProps}
      authenticationStore={new AuthenticationStore()}
      documentsStore={new DocumentsStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs in", () => {
  const authenticationStore = new AuthenticationStore();
  authenticationStore.setSignedIn(true);

  const result = render(
    <App
      {...commonProps}
      authenticationStore={authenticationStore}
      documentsStore={new DocumentsStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});

it("renders after a user signs out", () => {
  const authenticationStore = new AuthenticationStore();
  authenticationStore.setSignedIn(false);

  const result = render(
    <App
      {...commonProps}
      authenticationStore={authenticationStore}
      documentsStore={new DocumentsStore()}
    />
  );

  expect(result.container).toMatchSnapshot();
});
