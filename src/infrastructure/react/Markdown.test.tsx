import { render, fireEvent } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Markdown } from "./Markdown";

afterEach(() => {
  vi.restoreAllMocks();
});

it("renders", () => {
  expect(
    render(<Markdown># Foo</Markdown>).container.firstChild
  ).toMatchSnapshot();
});

it("renders an image", () => {
  expect(
    render(<Markdown>![foo](http://bar/baz.png)</Markdown>).container.firstChild
  ).toMatchSnapshot();
});

it("renders a table", () => {
  const markdown = `
|foo |bar |
|----|----|
|123 |456 |
  `;

  expect(
    render(<Markdown>{markdown}</Markdown>).container.firstChild
  ).toMatchSnapshot();
});

it("opens an image when it is clicked", () => {
  const spy = vi.spyOn(window, "open");
  spy.mockReturnValue(null);

  const { container } = render(<Markdown>![foo](http://bar/baz.png)</Markdown>);
  fireEvent.click(container.querySelector("img") as Element);

  expect(spy).toHaveBeenCalledTimes(1);
});

it("does not open a linked image even when it is clicked", () => {
  const spy = vi.spyOn(window, "open");
  spy.mockReturnValue(null);

  const { container } = render(
    <Markdown>[![foo](http://bar/baz.png)](http://bar/blah)</Markdown>
  );
  fireEvent.click(container.querySelector("img") as Element);

  expect(spy).toHaveBeenCalledTimes(0);
});

it("renders a link with an ampersand", () => {
  expect(
    render(<Markdown>[](http://foo.com?foo=bar&baz=blah)</Markdown>).container
      .firstChild
  ).toMatchSnapshot();
});
