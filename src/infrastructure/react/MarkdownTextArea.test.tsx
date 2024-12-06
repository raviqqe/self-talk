import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
import { textFileInserter } from "../../main/text-file-inserter.js";
import { MarkdownTextArea } from "./MarkdownTextArea.js";

beforeEach(() => {
  vi.spyOn(textFileInserter, "insert").mockResolvedValue("result");
});

it("renders", () => {
  expect(
    render(
      <MarkdownTextArea
        onSubmit={async () => {}}
        onChange={() => {}}
        text="foo"
      />,
    ).container,
  ).toMatchSnapshot();
});

it("pastes an image as a link", async () => {
  const setText = vi.fn();

  render(
    <MarkdownTextArea
      onSubmit={async () => {}}
      onChange={setText}
      text="foo"
    />,
  );

  fireEvent.paste(screen.queryByRole("textbox")!, {
    clipboardData: {
      items: [
        { getAsFile: () => new File([], "foo.png", { type: "image/png" }) },
      ],
    },
  } as never);

  await waitFor(() => expect(setText.mock.calls).toEqual([["result"]]));
});

it("does not paste anything if there is no files in clipboard data", async () => {
  const setText = vi.fn();

  render(
    <MarkdownTextArea
      onSubmit={async () => {}}
      onChange={setText}
      text="foo"
    />,
  );

  fireEvent.paste(screen.queryByRole("textbox")!, {
    clipboardData: { items: [] },
  });

  await waitFor(() => expect(setText.mock.calls).toHaveLength(0));
});

it("drops an image as a link", async () => {
  const setText = vi.fn();

  render(
    <MarkdownTextArea
      onSubmit={async () => {}}
      onChange={setText}
      text="foo"
    />,
  );

  fireEvent.drop(screen.queryByRole("textbox")!, {
    dataTransfer: {
      files: [new File([], "foo.png", { type: "image/png" })],
    },
  });

  await waitFor(() => expect(setText.mock.calls).toEqual([["result"]]));
});
