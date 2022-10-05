import { create } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { IconButton } from "./IconButton";

it("renders", () => {
  expect(
    create(<IconButton onClick={() => {}}>+</IconButton>).toJSON()
  ).toMatchSnapshot();
});
