import { fireEvent, render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { TextArea } from "./TextArea.js";

it("renders", () => {
  expect(render(<TextArea onSubmit={() => {}} />).container).toMatchSnapshot();
});

it("triggers a submit callback on Shift + Enter", () => {
  const onSubmit = vi.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild!, {
    key: "Enter",
    shiftKey: true,
  });

  expect(onSubmit.mock.calls).toHaveLength(1);
});

it("triggers a submit callback on Ctrl + Enter", () => {
  const onSubmit = vi.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild!, {
    ctrlKey: true,
    key: "Enter",
  });

  expect(onSubmit.mock.calls).toHaveLength(1);
});

it("triggers a submit callback on Alt + Enter", () => {
  const onSubmit = vi.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild!, {
    altKey: true,
    key: "Enter",
  });

  expect(onSubmit.mock.calls).toHaveLength(1);
});

it("does not trigger a submit callback on Enter", () => {
  const onSubmit = vi.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild!, {
    keyCode: 13,
  });

  expect(onSubmit.mock.calls).toHaveLength(0);
});
