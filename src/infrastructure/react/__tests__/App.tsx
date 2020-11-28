import { render } from "@testing-library/react";
import { App, IProps } from "../App";

const props: IProps = {
  createDocument: async () => {},
  documents: null,
  initialize: async () => {},
  insertFiles: async () => "",
  listDocuments: async () => {},
  listMoreDocuments: async () => {},
  repositoryURL: "",
  signIn: async () => {},
  signOut: async () => {},
  signedIn: null,
  updateDocument: async () => {},
};

it("renders before a user signs in", () => {
  expect(
    render(<App {...props} signedIn={null} />).container
  ).toMatchSnapshot();
});

it("renders after a user signs in", () => {
  expect(
    render(<App {...props} signedIn={true} />).container
  ).toMatchSnapshot();
});

it("renders after a user signs out", () => {
  expect(
    render(<App {...props} signedIn={false} />).container
  ).toMatchSnapshot();
});
