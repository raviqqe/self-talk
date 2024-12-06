import { act, render, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { documentLister } from "../../main/document-lister.js";
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
  const result = await act(async () =>
    render(<DocumentList documents={[{ id: "id", text: "text" }]} />),
  );

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});

it("renders with no documents", async () => {
  const result = await act(async () => render(<DocumentList documents={[]} />));

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});

it("renders with documents not loaded yet", async () => {
  const result = await act(async () =>
    render(<DocumentList documents={null} />),
  );

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});
