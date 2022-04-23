import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { Home } from "../Home";

it("renders", async () => {
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <Home
        createDocument={async () => {}}
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={async () => {}}
      />
    );
  });

  await waitFor(() =>
    expect(result?.container.querySelector("textarea")).toBeTruthy()
  );

  expect(result?.container.firstChild).toMatchSnapshot();
});

it("creates a document", async () => {
  const createDocument = jest.fn(async () => {});
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <Home
        createDocument={createDocument}
        documents={[]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={async () => {}}
      />
    );
  });

  await waitFor(() =>
    expect(result?.container.querySelector("textarea")).toBeTruthy()
  );

  act(() => {
    fireEvent.change(
      result?.container.querySelector("textarea") as HTMLTextAreaElement,
      { target: { value: "foo" } }
    );

    if (result) {
      fireEvent.click(result?.getByLabelText("Create"));
    }
  });

  expect(createDocument.mock.calls).toHaveLength(1);
});

it("updates a document", async () => {
  const updateDocument = jest.fn(async () => {});
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <Home
        createDocument={async () => {}}
        documents={[{ id: "", text: "" }]}
        insertFiles={async () => ""}
        listDocuments={async () => {}}
        listMoreDocuments={async () => {}}
        signOut={async () => {}}
        updateDocument={updateDocument}
      />
    );
  });

  await waitFor(() => expect(result?.getByLabelText("Edit")).toBeTruthy());

  act(() => {
    if (result) {
      fireEvent.click(result.getByLabelText("Edit"));
    }

    fireEvent.change(
      result?.container.querySelector("textarea") as HTMLTextAreaElement,
      { target: { value: "foo" } }
    );

    if (result) {
      fireEvent.click(result?.getByLabelText("Save"));
    }
  });

  expect(updateDocument.mock.calls).toHaveLength(1);
});
