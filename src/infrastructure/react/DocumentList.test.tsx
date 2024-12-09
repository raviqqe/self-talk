import { act, render, waitFor } from "@testing-library/react";
import { atom } from "nanostores";
import { beforeEach, expect, it, vi } from "vitest";
import { documentLister } from "../../main/document-lister.js";
import { documentPresenter } from "../../main/document-presenter.js";
import { DocumentList } from "./DocumentList.js";

let wait = async () => {};

beforeEach(() => {
  const list = vi
    .spyOn(documentLister, "list")
    .mockImplementation(async () => {});
  vi.spyOn(documentLister, "listMore").mockImplementation(async () => {});
  wait = () => waitFor(() => expect(list).toHaveBeenCalled());
});

it("renders", async () => {
  vi.spyOn(documentPresenter, "documents", "get").mockReturnValue(
    atom([{ id: "id", text: "text" }]),
  );

  const result = await act(async () => render(<DocumentList />));

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});

it("renders with no documents", async () => {
  vi.spyOn(documentPresenter, "documents", "get").mockReturnValue(atom([]));

  const result = await act(async () => render(<DocumentList />));

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});

it("renders with documents not loaded yet", async () => {
  vi.spyOn(documentPresenter, "documents", "get").mockReturnValue(atom(null));

  const result = await act(async () => render(<DocumentList />));

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});
