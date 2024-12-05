import { act, render, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { DocumentList } from "./DocumentList.js";

const listDocuments = vi.fn();
const wait = () => waitFor(() => expect(listDocuments).toHaveBeenCalled());

beforeEach(() => {
  listDocuments.mockReset().mockResolvedValue(undefined);
});

it("renders", async () => {
  const result = await act(async () => {
    return render(<DocumentList documents={[{ id: "id", text: "text" }]} />);
  });

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});

it("renders with no documents", async () => {
  const result = await act(async () => {
    return render(<DocumentList documents={[]} />);
  });

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});

it("renders with documents not loaded yet", async () => {
  const result = await act(async () => {
    return render(<DocumentList documents={null} />);
  });

  expect(result.container.firstChild).toMatchSnapshot();

  await wait();
});
