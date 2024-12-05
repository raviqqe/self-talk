import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { documentCreator } from "../../main/document-creator.js";
import { Home } from "./Home.js";

it("renders", async () => {
  const result = await act(() =>
    render(
      <Home
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={async () => {}}
      />,
    ),
  );

  await waitFor(() =>
    expect(result.container.querySelector("textarea")).toBeTruthy(),
  );

  expect(result.container.firstChild).toMatchSnapshot();
});

it("creates a document", async () => {
  const createDocument = vi
    .spyOn(documentCreator, "create")
    .mockImplementation(async () => {});

  act(() => {
    render(
      <Home
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={async () => {}}
      />,
    );
  });

  await waitFor(() => expect(screen.getByRole("textbox")).toBeTruthy());

  act(() => {
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "foo" },
    });

    fireEvent.click(screen.getByLabelText("Create"));
  });

  expect(createDocument.mock.calls).toHaveLength(1);
});

it("updates a document", async () => {
  const updateDocument = vi.fn(async () => {});

  const result = await act(() =>
    render(
      <Home
        documents={[{ id: "", text: "" }]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={updateDocument}
      />,
    ),
  );

  await waitFor(() => expect(result.getByLabelText("Edit")).toBeTruthy());

  act(() => {
    fireEvent.click(result.getByLabelText("Edit") as Element);

    fireEvent.change(result.container.querySelector("textarea")!, {
      target: { value: "foo" },
    });

    fireEvent.click(result.getByLabelText("Save") as Element);
  });

  expect(updateDocument.mock.calls).toHaveLength(1);
});
