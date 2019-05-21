import React from "react";
import { create } from "react-test-renderer";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitForDomChange
} from "react-testing-library";
import { Home } from "../Home";

afterEach(cleanup);

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

it("creates a document", async () => {
  const createDocument = jest.fn(async () => ({
    createdAt: 42,
    id: "id",
    text: "text"
  }));

  const { container, getByLabelText } = render(
    <Home
      createDocument={createDocument}
      insertImage={async () => "url"}
      listDocuments={async function*() {
        yield [];
      }}
      signOut={async () => undefined}
      updateDocument={async () => null}
    />
  );

  await waitForDomChange({ container });

  fireEvent.change(container.querySelector("textarea") as HTMLTextAreaElement, {
    target: { value: "foo" }
  });

  fireEvent.click(getByLabelText("Create"));

  expect(createDocument.mock.calls).toHaveLength(1);
});

it("updates a document", async () => {
  const updateDocument = jest.fn(async () => ({
    createdAt: 42,
    id: "id",
    text: "text"
  }));

  const { container, getByLabelText } = render(
    <Home
      createDocument={async () => null}
      insertImage={async () => "url"}
      listDocuments={async function*() {
        yield [{ id: "id", text: "text", createdAt: 42 }];
      }}
      signOut={async () => undefined}
      updateDocument={updateDocument}
    />
  );

  await waitForDomChange({ container });

  fireEvent.click(getByLabelText("Edit"));

  fireEvent.change(container.querySelector("textarea") as HTMLTextAreaElement, {
    target: { value: "foo" }
  });

  fireEvent.click(getByLabelText("Save"));

  expect(updateDocument.mock.calls).toHaveLength(1);
});
