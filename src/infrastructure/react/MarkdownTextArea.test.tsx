import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, beforeEach, expect, it, vi } from "vitest";
import { MarkdownTextArea } from "./MarkdownTextArea";

it("renders", () => {
  expect(
    render(
      <MarkdownTextArea
        insertFiles={async () => ""}
        onSubmit={async () => {}}
        setText={() => {}}
        text="foo"
      />
    ).container
  ).toMatchSnapshot();
});

it("pastes an image as a link", async () => {
  const setText = vi.fn();
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <MarkdownTextArea
        insertFiles={async () => "result"}
        onSubmit={async () => {}}
        setText={setText}
        text="foo"
      />
    );
  });

  fireEvent.paste(
    result?.container.firstElementChild as Element,
    {
      clipboardData: {
        items: [
          { getAsFile: () => new File([], "foo.png", { type: "image/png" }) },
        ],
      },
    } as never
  );

  await waitFor(() => expect(setText.mock.calls).toEqual([["result"]]));
});

it("does not paste anything if there is no files in clipboard data", async () => {
  const setText = vi.fn();
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <MarkdownTextArea
        insertFiles={async () => "result"}
        onSubmit={async () => {}}
        setText={setText}
        text="foo"
      />
    );
  });

  fireEvent.paste(result?.container.firstElementChild as Element, {
    clipboardData: { items: [] },
  });

  await waitFor(() => expect(setText.mock.calls).toHaveLength(0));
});

it("drops an image as a link", async () => {
  const setText = vi.fn();
  let result: RenderResult | undefined;

  act(() => {
    result = render(
      <MarkdownTextArea
        insertFiles={async () => "result"}
        onSubmit={async () => {}}
        setText={setText}
        text="foo"
      />
    );
  });

  fireEvent.drop(result?.container.firstElementChild as Element, {
    dataTransfer: {
      files: [new File([], "foo.png", { type: "image/png" })],
    },
  });

  await waitFor(() => expect(setText.mock.calls).toEqual([["result"]]));
});
