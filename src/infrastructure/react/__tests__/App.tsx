import React from "react";
import { fireEvent, render, waitForDomChange } from "react-testing-library";
import { IDocument } from "../../../domain/document";
import { App } from "../App";

it("renders before a user signs in", async () => {
  const result = render(
    <App
      createDocument={async () => ({} as IDocument)}
      initialize={async () => ({ signedIn: false })}
      insertImages={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signIn={async () => true}
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
      insertImages={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signIn={async () => true}
      signOut={async () => false}
      updateDocument={async () => ({} as IDocument)}
      repositoryURL="url"
    />
  );

  await waitForDomChange(result);

  expect(result.container).toMatchSnapshot();
});

it("goes to a home screen when a user signs in", async () => {
  const { asFragment, container } = render(
    <App
      createDocument={async () => ({} as IDocument)}
      initialize={async () => ({ signedIn: false })}
      insertImages={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signIn={async () => true}
      signOut={async () => false}
      updateDocument={async () => ({} as IDocument)}
      repositoryURL="url"
    />
  );

  await waitForDomChange({ container });

  fireEvent.click(container.querySelector("button") as Element);

  await waitForDomChange({ container });

  expect(asFragment()).toMatchSnapshot();
});
