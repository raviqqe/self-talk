import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { documentCreator } from "../../main/document-creator.js";
import { documentLister } from "../../main/document-lister.js";
import { documentUpdater } from "../../main/document-updater.js";
import { Home } from "./Home.js";

beforeEach(() => {
  vi.spyOn(documentLister, "list").mockImplementation(async () => {});
  vi.spyOn(documentLister, "listMore").mockImplementation(async () => {});
});

it("renders", async () => {
  const result = await act(async () => render(<Home documents={[]} />));

  await waitFor(() => expect(screen.getByRole("textbox")).toBeTruthy());

  expect(result.container.firstChild).toMatchSnapshot();
});

it("creates a document", async () => {
  const createDocument = vi
    .spyOn(documentCreator, "create")
    .mockImplementation(async () => {});

  act(() => {
    render(<Home documents={[]} />);
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
  const updateDocument = vi
    .spyOn(documentUpdater, "update")
    .mockImplementation(async () => {});

  const result = await act(async () =>
    render(<Home documents={[{ id: "", text: "" }]} />),
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
