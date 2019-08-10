import {
  cleanup,
  fireEvent,
  render,
  waitForDomChange
} from "@testing-library/react";
import { create } from "react-test-renderer";
import React from "react";
import { Home } from "../Home";

afterEach(cleanup);

it("renders", () => {
  expect(
    create(
      <Home
        createDocument={async () => null}
        insertImages={async () => "url"}
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
  const createDocument = jest.fn(async () => ({ id: "id", text: "text" }));

  const { container, getByLabelText } = render(
    <Home
      createDocument={createDocument}
      insertImages={async () => "url"}
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
  const updateDocument = jest.fn(async () => ({ id: "id", text: "text" }));

  const { container, getByLabelText } = render(
    <Home
      createDocument={async () => null}
      insertImages={async () => "url"}
      listDocuments={async function*() {
        yield [{ id: "id", text: "text" }];
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
