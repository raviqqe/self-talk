import { render, fireEvent } from "@testing-library/react";
import { create } from "react-test-renderer";
import { describe, beforeEach, afterEach, expect, it, vi } from "vitest";
import { Markdown } from "./Markdown";

afterEach(() => {
  vi.restoreAllMocks();
});

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
    create(<Markdown>[](http://foo.com?foo=bar&baz=blah)</Markdown>).toJSON()
  ).toMatchSnapshot();
});
