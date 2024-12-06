import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { documentCreator } from "../../main/document-creator.js";
import { documentUpdater } from "../../main/document-updater.js";
import { Home } from "./Home.js";

it("renders", async () => {
  const result = await act(async () =>
    render(<Home documents={[]} signOut={async () => {}} />),
  );

  await waitFor(() => expect(screen.getByRole("textbox")).toBeTruthy());

  expect(result.container.firstChild).toMatchSnapshot();
});

it("creates a document", async () => {
  const createDocument = vi
    .spyOn(documentCreator, "create")
    .mockImplementation(async () => {});

  act(() => {
    render(<Home documents={[]} signOut={async () => {}} />);
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
    render(
      <Home documents={[{ id: "", text: "" }]} signOut={async () => {}} />,
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
