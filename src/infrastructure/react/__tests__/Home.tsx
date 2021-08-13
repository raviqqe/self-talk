import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { Home } from "../Home";

afterEach(cleanup);

it("renders", () => {
  expect(
    render(
      <Home
        createDocument={async () => {}}
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={async () => {}}
      />
    ).container.firstChild
  ).toMatchSnapshot();
});

it("creates a document", async () => {
  const createDocument = jest.fn(async () => {});

  const { container, getByLabelText } = render(
    <Home
      createDocument={createDocument}
      documents={[]}
      insertFiles={async () => ""}
      listDocuments={async () => {}}
      listMoreDocuments={async () => {}}
      signOut={async () => {}}
      updateDocument={async () => {}}
    />
  );

  await waitFor(() => expect(container.querySelector("textarea")).toBeTruthy());

  fireEvent.change(container.querySelector("textarea") as HTMLTextAreaElement, {
    target: { value: "foo" },
  });

  fireEvent.click(getByLabelText("Create"));

  expect(createDocument.mock.calls).toHaveLength(1);
});

it("updates a document", async () => {
  const updateDocument = jest.fn(async () => {});

  const { container, getByLabelText } = render(
    <Home
      createDocument={async () => {}}
      documents={[{ id: "", text: "" }]}
      insertFiles={async () => ""}
      listDocuments={async () => {}}
      listMoreDocuments={async () => {}}
      signOut={async () => {}}
      updateDocument={updateDocument}
    />
  );

  await waitFor(() => expect(getByLabelText("Edit")).toBeTruthy());

  fireEvent.click(getByLabelText("Edit"));

  fireEvent.change(container.querySelector("textarea") as HTMLTextAreaElement, {
    target: { value: "foo" },
  });

  fireEvent.click(getByLabelText("Save"));

  expect(updateDocument.mock.calls).toHaveLength(1);
});
