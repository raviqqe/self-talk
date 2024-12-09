import { act, render, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { applicationInitializer } from "../../main/application-initializer.js";
import { documentLister } from "../../main/document-lister.js";
import { App } from "./App.js";
import { authenticationPresenter } from "../../main/authentication-presenter.js";
import { atom } from "nanostores";

const initialize = vi.spyOn(applicationInitializer, "initialize");
const listDocuments = vi.spyOn(documentLister, "list");

beforeEach(() => {
  initialize.mockImplementation(async () => {});
  listDocuments.mockReset().mockResolvedValue(undefined);
});

it("renders before a user signs in", async () => {
  vi.spyOn(authenticationPresenter, "signedIn", "get").mockReturnValue(
    atom(null),
  );

  const result = await act(() => render(<App />));

  expect(result.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
});

it("renders after a user signs in", async () => {
  vi.spyOn(authenticationPresenter, "signedIn", "get").mockReturnValue(
    atom(true),
  );

  const result = await act(() => render(<App />));

  expect(result.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
  await waitFor(() => expect(listDocuments).toHaveBeenCalled());
});

it("renders after a user signs out", async () => {
  vi.spyOn(authenticationPresenter, "signedIn", "get").mockReturnValue(
    atom(false),
  );

  const result = await act(() => render(<App />));

  expect(result.container).toMatchSnapshot();

  await waitFor(() => expect(initialize).toHaveBeenCalled());
});
