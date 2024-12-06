import { act, render, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { applicationInitializer } from "../../main/application-initializer.js";
import { documentLister } from "../../main/document-lister.js";
import { App, type Props } from "./App.js";

const initialize = vi.spyOn(applicationInitializer, "initialize");
const listDocuments = vi.spyOn(documentLister, "list");

beforeEach(() => {
  initialize.mockImplementation(async () => {});
  listDocuments.mockReset().mockResolvedValue(undefined);
});

const props: Props = {
  documents: null,
  repositoryUrl: "",
  signedIn: null,
};

it("renders before a user signs in", async () => {
  const result = await act(() => render(<App {...props} signedIn={null} />));

  expect(result.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
});

it("renders after a user signs in", async () => {
  const result = await act(() => render(<App {...props} signedIn />));

  expect(result.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
  await waitFor(() => expect(listDocuments).toHaveBeenCalled());
});

it("renders after a user signs out", async () => {
  const result = await act(() => render(<App {...props} signedIn={false} />));

  expect(result.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
});
