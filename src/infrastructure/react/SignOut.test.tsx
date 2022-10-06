import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { SignOut } from "./SignOut";

it("renders", () => {
  expect(
    render(<SignOut signOut={() => {}} />).container.firstChild
  ).toMatchSnapshot();
});
