import { create } from "react-test-renderer";
import { expect, it } from "vitest";
import { CircleButton } from "./CircleButton";

it("renders", () => {
  expect(create(<CircleButton>foo</CircleButton>).toJSON()).toMatchSnapshot();
});

it("renders as a secondary button", () => {
  expect(
    create(<CircleButton secondary={true}>foo</CircleButton>).toJSON()
  ).toMatchSnapshot();
});
