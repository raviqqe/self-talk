import { fireEvent, render } from "@testing-library/react";
import { TextArea } from "../TextArea";

it("renders", () => {
  expect(render(<TextArea onSubmit={() => {}} />).container).toMatchSnapshot();
});

it("triggers a submit callback on Shift + Enter", () => {
  const onSubmit = jest.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild as Element, {
    key: "Enter",
    shiftKey: true,
  });

  expect(onSubmit.mock.calls).toHaveLength(1);
});

it("triggers a submit callback on Ctrl + Enter", () => {
  const onSubmit = jest.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild as Element, {
    ctrlKey: true,
    key: "Enter",
  });

  expect(onSubmit.mock.calls).toHaveLength(1);
});

it("does not trigger a submit callback on Enter", () => {
  const onSubmit = jest.fn();
  const { container } = render(<TextArea onSubmit={onSubmit} />);

  fireEvent.keyDown(container.firstElementChild as Element, { keyCode: 13 });

  expect(onSubmit.mock.calls).toHaveLength(0);
});
