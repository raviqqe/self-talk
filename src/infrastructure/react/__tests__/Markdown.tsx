import { render, fireEvent } from "@testing-library/react";
import { create } from "react-test-renderer";
import { Markdown } from "../Markdown";

afterEach(() => jest.restoreAllMocks());

it("renders", () => {
  expect(create(<Markdown># Foo</Markdown>).toJSON()).toMatchSnapshot();
});

it("renders an image", () => {
  expect(
    create(<Markdown>![foo](http://bar/baz.png)</Markdown>).toJSON()
  ).toMatchSnapshot();
});

it("renders a table", () => {
  const markdown = `
|foo |bar |
|----|----|
|123 |456 |
  `;

  expect(create(<Markdown>{markdown}</Markdown>).toJSON()).toMatchSnapshot();
});

it("opens an image when it is clicked", () => {
  const spy = jest.spyOn(window, "open");
  spy.mockReturnValue(null);

  const { container } = render(<Markdown>![foo](http://bar/baz.png)</Markdown>);
  fireEvent.click(container.querySelector("img") as Element);

  expect(spy).toHaveBeenCalledTimes(1);
});

it("does not open a linked image even when it is clicked", () => {
  const spy = jest.spyOn(window, "open");
  spy.mockReturnValue(null);

  const { container } = render(
    <Markdown>[![foo](http://bar/baz.png)](http://bar/blah)</Markdown>
  );
  fireEvent.click(container.querySelector("img") as Element);

  expect(spy).toHaveBeenCalledTimes(0);
});
