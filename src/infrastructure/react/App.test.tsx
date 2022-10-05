import { act, render, RenderResult, waitFor } from "@testing-library/react";
import { App, IProps } from "../App";

const initialize = jest.fn();
const listDocuments = jest.fn();

beforeEach(() => {
  initialize.mockReset().mockResolvedValue(undefined);
  listDocuments.mockReset().mockResolvedValue(undefined);
});

const props: IProps = {
  createDocument: async () => {},
  documents: null,
  initialize,
  insertFiles: async () => "",
  listDocuments,
  listMoreDocuments: async () => {},
  repositoryURL: "",
  signIn: async () => {},
  signOut: async () => {},
  signedIn: null,
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
    result = render(<App {...props} signedIn={true} />);
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
