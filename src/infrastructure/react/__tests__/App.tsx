import { act, render, waitFor } from "@testing-library/react";
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
  await act(async () => {
    expect(
      render(<App {...props} signedIn={null} />).container
    ).toMatchSnapshot();

    await waitFor(() => expect(initialize).toBeCalled());
  });
});

it("renders after a user signs in", async () => {
  await act(async () => {
    expect(
      render(<App {...props} signedIn={true} />).container
    ).toMatchSnapshot();

    await waitFor(() => expect(initialize).toBeCalled());
    await waitFor(() => expect(listDocuments).toBeCalled());
  });
});

it("renders after a user signs out", async () => {
  await act(async () => {
    expect(
      render(<App {...props} signedIn={false} />).container
    ).toMatchSnapshot();

    await waitFor(() => expect(initialize).toBeCalled());
  });
});
