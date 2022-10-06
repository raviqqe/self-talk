import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { TextButton } from "./TextButton";

it("renders", () => {
  expect(
    render(<TextButton>foo</TextButton>).container.firstChild
  ).toMatchSnapshot();
});

it("renders as a secondary button", () => {
  expect(
    render(<TextButton secondary={true}>foo</TextButton>).container.firstChild
  ).toMatchSnapshot();
});
