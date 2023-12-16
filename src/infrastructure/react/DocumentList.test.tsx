import {
  act,
  render,
  type RenderResult,
  waitFor,
} from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { DocumentList } from "./DocumentList.js";

const listDocuments = vi.fn();
const wait = () => waitFor(() => expect(listDocuments).toHaveBeenCalled());

beforeEach(() => {
  listDocuments.mockReset().mockResolvedValue(undefined);
});

it("renders", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <DocumentList
        documents={[{ id: "id", text: "text" }]}
        insertFiles={async () => ""}
        listDocuments={listDocuments}
        listMoreDocuments={async () => {}}
        updateDocument={async () => {}}
      />,
    );
  });

  expect(result?.container.firstChild).toMatchSnapshot();

  await wait();
});

it("renders with no documents", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <DocumentList
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={listDocuments}
        listMoreDocuments={async () => {}}
        updateDocument={async () => {}}
      />,
    );
  });

  expect(result?.container.firstChild).toMatchSnapshot();

  await wait();
});

it("renders with documents not loaded yet", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <DocumentList
        documents={null}
        insertFiles={async () => ""}
        listDocuments={listDocuments}
        listMoreDocuments={async () => {}}
        updateDocument={async () => {}}
      />,
    );
  });

  expect(result?.container.firstChild).toMatchSnapshot();

  await wait();
});
