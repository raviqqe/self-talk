import { act, render, waitFor } from "@testing-library/react";
import { Documents } from "../Documents";

let listDocuments = jest.fn();
const wait = () => waitFor(() => expect(listDocuments).toBeCalled());

beforeEach(() => {
  listDocuments.mockReset().mockResolvedValue(undefined);
});

it("renders", async () => {
  await act(async () => {
    expect(
      render(
        <Documents
          documents={[{ id: "id", text: "text" }]}
          insertFiles={async () => ""}
          listDocuments={listDocuments}
          listMoreDocuments={async () => {}}
          updateDocument={async () => {}}
        />
      ).container.firstChild
    ).toMatchSnapshot();

    await wait();
  });
});

it("renders with no documents", async () => {
  await act(async () => {
    expect(
      render(
        <Documents
          documents={[]}
          insertFiles={async () => ""}
          listDocuments={listDocuments}
          listMoreDocuments={async () => {}}
          updateDocument={async () => {}}
        />
      ).container.firstChild
    ).toMatchSnapshot();

    await wait();
  });
});

it("renders with documents not loaded yet", async () => {
  await act(async () => {
    expect(
      render(
        <Documents
          documents={null}
          insertFiles={async () => ""}
          listDocuments={listDocuments}
          listMoreDocuments={async () => {}}
          updateDocument={async () => {}}
        />
      ).container.firstChild
    ).toMatchSnapshot();

    await wait();
  });
});
