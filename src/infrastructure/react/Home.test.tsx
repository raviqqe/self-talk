import {
  act,
  fireEvent,
  render,
  type RenderResult,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Home } from "./Home.js";
import { documentCreator } from "../../main/document-creator.js";

afterEach(() => {
  for (const element of document.getElementsByTagName("html")) {
    element.innerHTML = "";
  }
});

it("renders", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(
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

  await waitFor(() =>
    expect(result?.container.querySelector("textarea")).toBeTruthy(),
  );

  expect(result?.container.firstChild).toMatchSnapshot();
});

it("creates a document", async () => {
  const createDocument = vi
    .spyOn(documentCreator, "create")
    .mockImplementation(async () => {});

  let result: RenderResult | undefined;

  act(() => {
    result = render(
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
    fireEvent.change(screen.getByRole("textbox")!, {
      target: { value: "foo" },
    });

    fireEvent.click(result?.getByLabelText("Create") as Element);
  });

  expect(createDocument.mock.calls).toHaveLength(1);
});

it("updates a document", async () => {
  const updateDocument = vi.fn(async () => {});
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <Home
        documents={[{ id: "", text: "" }]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={updateDocument}
      />,
    );
  });

  await waitFor(() => expect(result?.getByLabelText("Edit")).toBeTruthy());

  act(() => {
    fireEvent.click(result?.getByLabelText("Edit") as Element);

    fireEvent.change(result?.container.querySelector("textarea")!, {
      target: { value: "foo" },
    });

    fireEvent.click(result?.getByLabelText("Save") as Element);
  });

  expect(updateDocument.mock.calls).toHaveLength(1);
});
