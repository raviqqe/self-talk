import {
  act,
  render,
  type RenderResult,
  waitFor,
} from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { App, type Props } from "./App.js";

const initialize = vi.fn();
const listDocuments = vi.fn();

beforeEach(() => {
  initialize.mockReset().mockResolvedValue(undefined);
  listDocuments.mockReset().mockResolvedValue(undefined);
});

const props: Props = {
  createDocument: async () => {},
  documents: null,
  initialize,
  insertFiles: async () => "",
  listDocuments,
  listMoreDocuments: async () => {},
  repositoryUrl: "",
  signedIn: null,
  signIn: async () => {},
  signOut: async () => {},
  updateDocument: async () => {},
};

it("renders before a user signs in", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<App {...props} signedIn={null} />);
  });

  expect(result?.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
});

it("renders after a user signs in", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<App {...props} signedIn />);
  });

  expect(result?.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
  await waitFor(() => expect(listDocuments).toHaveBeenCalled());
});

it("renders after a user signs out", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(<App {...props} signedIn={false} />);
  });

  expect(result?.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
});
